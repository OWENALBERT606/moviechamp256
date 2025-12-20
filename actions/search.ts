"use server";

import axios from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 12000,
  headers: { "Content-Type": "application/json" },
});

function msg(e: any, fallback = "Request failed") {
  return e?.response?.data?.error || e?.message || fallback;
}

/* ---------------------------------- types ---------------------------------- */

export interface SearchResults {
  movies: any[];
  series: any[];
  vjs: any[];
  genres: any[];
  totalResults: number;
}

/* ------------------------------- server actions ---------------------------- */

/** GET /search - Global search */
export async function globalSearch(query: string, limit?: number) {
  try {
    if (!query || query.trim().length === 0) {
      return { 
        success: true, 
        data: { movies: [], series: [], vjs: [], genres: [], totalResults: 0 } 
      };
    }

    console.log("🔍 Searching for:", query);

    const params: any = { q: query };
    if (limit) params.limit = limit;

    const res = await api.get("/search", { params });

    console.log("✅ Search results:", res.data?.data?.totalResults || 0, "items");

    return { success: true, data: res.data?.data as SearchResults };
  } catch (e: any) {
    console.error("❌ globalSearch error:", e?.response?.data || e?.message);
    return { 
      success: false, 
      error: msg(e, "Failed to perform search"),
      data: { movies: [], series: [], vjs: [], genres: [], totalResults: 0 }
    };
  }
}