// app/actions/watchHistory.ts
"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 12000,
  headers: { "Content-Type": "application/json" },
});

function msg(e: any, fallback = "Request failed") {
  return e?.response?.data?.error || e?.message || fallback;
}

export interface WatchHistory {
  id: string;
  userId: string;
  movieId: string;
  currentTime: number;
  duration: number;
  progressPercent: number;
  completed: boolean;
  lastWatchedAt: string;
  createdAt: string;
  updatedAt: string;
  movie: {
    id: string;
    title: string;
    slug: string;
    thumbnailUrl: string | null;
    duration: number | null;
    vj?: {
      id: string;
      name: string;
    };
    genres?: Array<{
      id: string;
      name: string;
    }>;
  };
}

/** Update watch progress */
export async function updateWatchProgress(
  userId: string,
  movieId: string,
  currentTime: number,
  duration: number
) {
  try {
    const res = await api.put(`/watch-history/${movieId}`, {
      userId,
      currentTime,
      duration,
    });
    
    revalidatePath("/");
    revalidatePath("/continue-watching");
    
    return { success: true, data: res.data?.data as WatchHistory };
  } catch (e: any) {
    console.error("updateWatchProgress error:", e?.response?.data || e?.message);
    return { success: false, error: msg(e, "Failed to update watch progress") };
  }
}

/** Get continue watching list */
export async function getContinueWatching(userId: string) {
  try {
    const res = await api.get("/watch-history/continue-watching", {
      params: { userId },
    });
    
    return { success: true, data: (res.data?.data ?? []) as WatchHistory[] };
  } catch (e: any) {
    console.error("getContinueWatching error:", e?.response?.data || e?.message);
    return { success: false, error: msg(e, "Failed to fetch continue watching") };
  }
}

/** Get full watch history */
export async function getWatchHistory(userId: string) {
  try {
    const res = await api.get("/watch-history", {
      params: { userId },
    });
    
    return { success: true, data: (res.data?.data ?? []) as WatchHistory[] };
  } catch (e: any) {
    console.error("getWatchHistory error:", e?.response?.data || e?.message);
    return { success: false, error: msg(e, "Failed to fetch watch history") };
  }
}

/** Delete watch history entry */
export async function deleteWatchHistoryEntry(id: string) {
  try {
    await api.delete(`/watch-history/${id}`);
    
    revalidatePath("/");
    revalidatePath("/continue-watching");
    
    return { success: true, message: "Removed from continue watching" };
  } catch (e: any) {
    console.error("deleteWatchHistory error:", e?.response?.data || e?.message);
    return { success: false, error: msg(e, "Failed to remove from continue watching") };
  }
}