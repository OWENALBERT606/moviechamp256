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

export async function getDashboardStats() {
  try {
    console.log("📊 Fetching dashboard stats");

    const res = await api.get("/dashboard/stats");

    return {
      success: true,
      data: res.data?.data,
    };
  } catch (e: any) {
    console.error("❌ Error fetching dashboard stats:", e?.response?.data || e?.message);
    return {
      success: false,
      error: msg(e, "Failed to fetch dashboard stats"),
      data: null,
    };
  }
}