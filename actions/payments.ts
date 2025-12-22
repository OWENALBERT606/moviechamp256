"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

function msg(e: any, fallback = "Request failed") {
  return e?.response?.data?.error || e?.message || fallback;
}

/* ---------------------------------- Mobile Money Payment ---------------------------------- */

interface MobileMoneyPaymentData {
  userId: string;
  planId: string;
  amount: number;
  phoneNumber: string;
  provider: "mtn" | "airtel";
}

export async function processMobileMoneyPayment(data: MobileMoneyPaymentData) {
  try {
    console.log("📱 Processing mobile money payment:", data);

    const res = await api.post("/payments/mobile-money", {
      userId: data.userId,
      planId: data.planId,
      amount: data.amount,
      phoneNumber: data.phoneNumber,
      provider: data.provider,
    });

    revalidatePath("/");
    revalidatePath("/pricing");

    console.log("✅ Mobile money payment initiated");

    return {
      success: true,
      paymentId: res.data?.data?.paymentId,
      transactionId: res.data?.data?.transactionId,
      message: res.data?.message,
    };
  } catch (e: any) {
    console.error("❌ Mobile money payment error:", e?.response?.data || e?.message);
    return {
      success: false,
      error: msg(e, "Failed to process mobile money payment"),
    };
  }
}

/* ---------------------------------- Card Payment ---------------------------------- */

interface CardPaymentData {
  userId: string;
  planId: string;
  amount: number;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export async function processCardPayment(data: CardPaymentData) {
  try {
    console.log("💳 Processing card payment");

    const res = await api.post("/payments/card", {
      userId: data.userId,
      planId: data.planId,
      amount: data.amount,
      cardNumber: data.cardNumber,
      cardName: data.cardName,
      expiryDate: data.expiryDate,
      cvv: data.cvv,
    });

    revalidatePath("/");
    revalidatePath("/pricing");

    console.log("✅ Card payment successful");

    return {
      success: true,
      paymentId: res.data?.data?.paymentId,
      transactionId: res.data?.data?.transactionId,
      message: res.data?.message,
    };
  } catch (e: any) {
    console.error("❌ Card payment error:", e?.response?.data || e?.message);
    return {
      success: false,
      error: msg(e, "Failed to process card payment"),
    };
  }
}

/* ---------------------------------- PayPal Payment ---------------------------------- */

interface PayPalPaymentData {
  userId: string;
  planId: string;
  amount: number;
  email: string;
}

export async function processPayPalPayment(data: PayPalPaymentData) {
  try {
    console.log("💰 Processing PayPal payment");

    const res = await api.post("/payments/paypal", {
      userId: data.userId,
      planId: data.planId,
      amount: data.amount,
      email: data.email,
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancelled`,
    });

    console.log("✅ PayPal payment initialized");

    return {
      success: true,
      approvalUrl: res.data?.data?.approvalUrl,
      paymentId: res.data?.data?.paymentId,
    };
  } catch (e: any) {
    console.error("❌ PayPal payment error:", e?.response?.data || e?.message);
    return {
      success: false,
      error: msg(e, "Failed to initialize PayPal payment"),
    };
  }
}

/* ---------------------------------- Get Payment Status ---------------------------------- */

export async function getPaymentStatus(paymentId: string) {
  try {
    console.log("🔍 Fetching payment status:", paymentId);

    const res = await api.get(`/payments/${paymentId}/status`);

    return {
      success: true,
      data: res.data?.data,
    };
  } catch (e: any) {
    console.error("❌ Error fetching payment status:", e?.response?.data || e?.message);
    return {
      success: false,
      error: msg(e, "Failed to fetch payment status"),
    };
  }
}

/* ---------------------------------- Verify Payment ---------------------------------- */

export async function verifyPayment(paymentId: string) {
  try {
    console.log("✅ Verifying payment:", paymentId);

    const res = await api.post(`/payments/${paymentId}/verify`);

    revalidatePath("/");
    revalidatePath("/pricing");

    return {
      success: true,
      data: res.data?.data,
    };
  } catch (e: any) {
    console.error("❌ Payment verification error:", e?.response?.data || e?.message);
    return {
      success: false,
      error: msg(e, "Failed to verify payment"),
    };
  }
}

/* ---------------------------------- Get User Subscriptions ---------------------------------- */

export async function getUserSubscriptions(userId: string) {
  try {
    const res = await api.get(`/subscriptions/user/${userId}`);

    return {
      success: true,
      data: res.data?.data,
    };
  } catch (e: any) {
    console.error("❌ Error fetching subscriptions:", e?.response?.data || e?.message);
    return {
      success: false,
      error: msg(e, "Failed to fetch subscriptions"),
      data: [],
    };
  }
}

/* ---------------------------------- Cancel Subscription ---------------------------------- */

export async function cancelSubscription(subscriptionId: string) {
  try {
    const res = await api.post(`/subscriptions/${subscriptionId}/cancel`);

    revalidatePath("/");
    revalidatePath("/account/subscriptions");

    return {
      success: true,
      message: res.data?.message,
    };
  } catch (e: any) {
    console.error("❌ Error cancelling subscription:", e?.response?.data || e?.message);
    return {
      success: false,
      error: msg(e, "Failed to cancel subscription"),
    };
  }
}