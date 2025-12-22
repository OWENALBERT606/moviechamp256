"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { processCardPayment } from "@/actions/payments";

interface CardPaymentFormProps {
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

export function CardPaymentForm({ plan, user, onBack }: CardPaymentFormProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const cardNumber = cardDetails.cardNumber.replace(/\s/g, "");
    if (cardNumber.length !== 16) {
      toast.error("Please enter a valid 16-digit card number");
      return;
    }

    if (cardDetails.cvv.length !== 3) {
      toast.error("Please enter a valid 3-digit CVV");
      return;
    }

    setIsProcessing(true);

    try {
      const result = await processCardPayment({
        userId: user.id,
        planId: plan.id,
        amount: plan.price,
        cardNumber: cardNumber,
        cardName: cardDetails.cardName,
        expiryDate: cardDetails.expiryDate,
        cvv: cardDetails.cvv,
      });

      if (result.success) {
        toast.success("Payment successful!");
        router.push(`/payment/success?paymentId=${result.paymentId}`);
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
        <Label htmlFor="cardNumber">Card Number</Label>
        <div className="relative mt-2">
          <Input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardDetails.cardNumber}
            onChange={(e) => {
              const formatted = formatCardNumber(e.target.value.slice(0, 19));
              setCardDetails({ ...cardDetails, cardNumber: formatted });
            }}
            required
            maxLength={19}
          />
          <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div>
        <Label htmlFor="cardName">Cardholder Name</Label>
        <Input
          id="cardName"
          type="text"
          placeholder="JOHN DOE"
          value={cardDetails.cardName}
          onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value.toUpperCase() })}
          required
          className="mt-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            type="text"
            placeholder="MM/YY"
            value={cardDetails.expiryDate}
            onChange={(e) => {
              const formatted = formatExpiryDate(e.target.value);
              setCardDetails({ ...cardDetails, expiryDate: formatted });
            }}
            required
            maxLength={5}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            type="password"
            placeholder="123"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })}
            required
            maxLength={3}
            className="mt-2"
          />
        </div>
      </div>

      <div className="dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-muted-foreground">
            Your payment information is encrypted and secure. We never store your full card details.
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