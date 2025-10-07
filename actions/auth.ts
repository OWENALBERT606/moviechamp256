// app/actions/auth.ts
"use server"

import axios from "axios"
import { revalidatePath } from "next/cache"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const BASE_API_URL = process.env.API_URL || ""
const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Types
interface LoginResponse {
    success: boolean;
    data?: {
        user: {
            id: string;
            email: string;
            role: string;
            firstName?: string;
            lastName?: string;
        };
        accessToken: string;
        refreshToken: string;
    };
    error?: string;
}

// Helper function to set cookies
const setCookies = async (
    accessToken: string, 
    refreshToken: string,
    userData: any
) => {
    const cookieStore =await cookies();
    
    // Set access token
    cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    // Set refresh token
    cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 // 30 days
    });

    // Store user data in a session cookie
    cookieStore.set('userData', JSON.stringify(userData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });
};

// Helper function to clear cookies
const clearCookies = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('userData');
};

export async function loginUser(data: { 
    email: string, 
    password: string 
}): Promise<LoginResponse> {
    try {
        const response = await api.post("/login", data);
        const { user, accessToken, refreshToken } = response.data.data;

        // Set cookies
        await setCookies(accessToken, refreshToken, user);
        
        return {
            success: true,
            data: {
                user,
                accessToken,
                refreshToken
            }
        };
    } catch (error: any) {
        console.error('Login error:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Login failed. Please try again.'
        };
    }
}

export async function logoutUser() {
    try {
        // Get the access token from cookies
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken');

        if (accessToken) {
            // Make API call to backend logout endpoint
            await api.post("/logout", {}, {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            });
        }

        // Clear all cookies
        await clearCookies();

        return {
            success: true
        };
    } catch (error) {
        console.error('Logout error:', error);
        
        // Still clear cookies even if API call fails
        await clearCookies();

        return {
            success: false,
            error: 'Logout failed, but session was cleared'
        };
    }
}

export async function getSession() {
    const cookieStore =await cookies();
    const accessToken = cookieStore.get('accessToken');
    const userData = cookieStore.get('userData');

    if (!accessToken || !userData) {
        return null;
    }

    try {
        return {
            user: JSON.parse(userData.value),
            accessToken: accessToken.value
        };
    } catch (error) {
        console.error('Session parsing error:', error);
        return null;
    }
}

export async function refreshAccessToken() {
    try {
        const cookieStore =await cookies();
        const refreshToken = cookieStore.get('refreshToken');

        if (!refreshToken) {
            throw new Error('No refresh token found');
        }

        const response = await api.post("/refresh-token", {
            refreshToken: refreshToken.value
        });

        const { accessToken: newAccessToken } = response.data;

        // Update only the access token cookie
        cookieStore.set('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        return {
            success: true,
            accessToken: newAccessToken
        };
    } catch (error) {
        console.error('Token refresh error:', error);
        // If refresh fails, clear all cookies and redirect to login
        await clearCookies();
        redirect('/login');
    }
}

export async function getAllUsers(){
  try {
    const response = await api.get("/users");
    const users=response.data;
        return users;
    
  } catch (error) {
    console.log(error)
    
  }
}

export async function createUser(data:any) {
    try {
        const response = await api.post("/register", data);
      revalidatePath("/dashboard/users")
        
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Type-safe error handling
          const message = 
            error.response?.data?.message || "Failed to create user";
          throw new Error(message);
          
        }
        throw error;
      }
}
export async function deleteUser(userId: string) {
    try {
        // Get the access token from cookies
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken');

        if (!accessToken) {
            throw new Error("Unauthorized: No access token found");
        }

        // Make API call to delete user
        await api.delete(`/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        });

        // Revalidate users list
        revalidatePath("/dashboard/users");

        return { success: true, message: "User deleted successfully" };
    } catch (error) {
        console.error("Delete user error:", error);
        // return {
        //     success: false,
        //     error: error.response?.data?.message || "Failed to delete user"
        // };
    }
}

  export async function deleteContact(id:string){
    console.log("deleted");
    return{
      ok:true
    }
  }
