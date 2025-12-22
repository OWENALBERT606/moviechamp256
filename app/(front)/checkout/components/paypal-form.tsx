"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { processPayPalPayment } from "@/actions/payments";

interface PayPalFormProps {
  plan: {
    id: string;
    name: string;
    price: number;
    duration: number;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  onBack: () => void;
}

export function PayPalForm({ plan, user, onBack }: PayPalFormProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayPalPayment = async () => {
    setIsProcessing(true);

    try {
      const result = await processPayPalPayment({
        userId: user.id,
        planId: plan.id,
        amount: plan.price,
        email: user.email,
      });

      if (result.success && result.approvalUrl) {
        toast.success("Redirecting to PayPal...");
        // Redirect to PayPal approval URL
        window.location.href = result.approvalUrl;
      } else {
        toast.error(result.error || "Failed to initialize PayPal payment");
        setIsProcessing(false);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to payment methods
      </Button>

      <div className="text-center py-8">
        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l1.12-7.106c.082-.518.526-.9 1.05-.9h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.149.054-.294.077-.437.023-.143.047-.284.068-.424.089-.09.16-.182.215-.274.013-.026.026-.049.036-.075z"/>
          </svg>
        </div>

        <h3 className="text-2xl font-bold mb-2">Pay with PayPal</h3>
        <p className="text-muted-foreground mb-6">
          You'll be redirected to PayPal to complete your payment securely
        </p>

        <div className="dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 text-left">
          <h4 className="font-semibold mb-2 text-sm">Payment Details:</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Plan:</span>
              <span className="font-semibold text-foreground">{plan.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="font-semibold text-foreground">
                {plan.price.toLocaleString()} UGX
              </span>
            </div>
            <div className="flex justify-between">
              <span>Email:</span>
              <span className="font-semibold text-foreground">{user.email}</span>
            </div>
          </div>
        </div>

        <div className="dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> You'll need a PayPal account or can pay with a card through PayPal's secure checkout.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isProcessing}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          onClick={handlePayPalPayment}
          disabled={isProcessing}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Redirecting...
            </>
          ) : (
            <>
              Continue to PayPal
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}