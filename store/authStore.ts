// // stores/sessionStore.ts
// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

// interface User {
//   id: string
//   email: string
//   username: string
//   firstName: string
//   lastName: string
//   role: string
// }

// interface SessionState {
//   user: User | null
//   accessToken: string | null
//   refreshToken: string | null
//   isAuthenticated: boolean
//   isLoading: boolean
//   setSession: (data: { 
//     user: User, 
//     accessToken: string, 
//     refreshToken: string 
//   }) => void
//   clearSession: () => void
//   setLoading: (isLoading: boolean) => void
// }

// export const useSessionStore = create<SessionState>()(
//   persist(
//     (set:any) => ({
//       user: null,
//       accessToken: null,
//       refreshToken: null,
//       isAuthenticated: false,
//       isLoading: false,

//       setSession: (data:any) => {
//         set({
//           user: data.user,
//           accessToken: data.accessToken,
//           refreshToken: data.refreshToken,
//           isAuthenticated: true,
//         })
//       },

//       clearSession: () => {
//         set({
//           user: null,
//           accessToken: null,
//           refreshToken: null,
//           isAuthenticated: false,
//         })
//       },

//       setLoading: (isLoading:any) => set({ isLoading }),
//     }),
//     {
//       name: 'session-storage',
//       partialize: (state:any) => ({
//         accessToken: state.accessToken,
//         refreshToken: state.refreshToken,
//       }),
//     }
//   )
// )



// stores/sessionStore.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface SessionState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setLoading: (v: boolean) => void;
  clear: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (v) => set({ isLoading: v }),
      clear: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => localStorage),
      // we only persist user (no tokens)
      partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }),
    }
  )
);
