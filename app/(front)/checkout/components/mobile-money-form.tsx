"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { processMobileMoneyPayment } from "@/actions/payments";

interface MobileMoneyFormProps {
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
    phone?: string;
  };
  onBack: () => void;
}

export function MobileMoneyForm({ plan, user, onBack }: MobileMoneyFormProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [provider, setProvider] = useState<"mtn" | "airtel">("mtn");
  const [phoneNumber, setPhoneNumber] = useState(user.phone || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number
    const cleanPhone = phoneNumber.replace(/\s/g, "");
    if (!/^(256|0)?[37]\d{8}$/.test(cleanPhone)) {
      toast.error("Please enter a valid Ugandan phone number");
      return;
    }

    setIsProcessing(true);

    try {
      const result = await processMobileMoneyPayment({
        userId: user.id,
        planId: plan.id,
        amount: plan.price,
        phoneNumber: cleanPhone,
        provider: provider,
      });

      if (result.success) {
        toast.success("Payment initiated!", {
          description: "Please check your phone to complete the payment",
        });
        
        // Redirect to payment status page
        router.push(`/payment/status?paymentId=${result.paymentId}`);
      } else {
        toast.error(result.error || "Payment failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to payment methods
      </Button>

      <div>
        <Label className="mb-3 block">Select Provider</Label>
        <RadioGroup value={provider} onValueChange={(value: any) => setProvider(value)}>
          <div className="flex items-center space-x-2 border-2 border-border rounded-lg p-4 hover:border-orange-500 transition-colors">
            <RadioGroupItem value="mtn" id="mtn" />
            <Label htmlFor="mtn" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                  MTN
                </div>
                <div>
                  <p className="font-semibold">MTN Mobile Money</p>
                  <p className="text-sm text-muted-foreground">Pay with MTN MoMo</p>
                </div>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-2 border-2 border-border rounded-lg p-4 hover:border-orange-500 transition-colors">
            <RadioGroupItem value="airtel" id="airtel" />
            <Label htmlFor="airtel" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                  AM
                </div>
                <div>
                  <p className="font-semibold">Airtel Money</p>
                  <p className="text-sm text-muted-foreground">Pay with Airtel Money</p>
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="0700000000 or 256700000000"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="mt-2"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Enter the number registered with {provider === "mtn" ? "MTN" : "Airtel"} Mobile Money
        </p>
      </div>

      <div className="bg-slate-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold mb-2 text-sm">How it works:</h4>
        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
          <li>Click "Pay {plan.price.toLocaleString()} UGX" button below</li>
          <li>You'll receive a prompt on your phone</li>
          <li>Enter your Mobile Money PIN to complete payment</li>
          <li>You'll receive confirmation via SMS</li>
        </ol>
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
          type="submit"
          disabled={isProcessing}
          className="flex-1 bg-orange-500 hover:bg-orange-600"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay ${plan.price.toLocaleString()} UGX`
          )}
        </Button>
      </div>
    </form>
  );
}