"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AuthCheckProps {
  hasSession: boolean;
  children: React.ReactNode;
}

export function AuthCheck({ hasSession, children }: AuthCheckProps) {
  const router = useRouter();

  useEffect(() => {
    if (!hasSession) {
      toast.error("Please login to view your list", {
        description: "You need to be signed in to access your personalized list",
      });
      
      // Redirect after showing toast
      setTimeout(() => {
        router.push("/login?redirect=/my-list");
      }, 1000);
    }
  }, [hasSession, router]);

  if (!hasSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}