"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updatePaymentSettings } from "@/actions/admin";

interface PaymentSettingsProps {
  settings: any;
}

export function PaymentSettings({ settings: initialSettings }: PaymentSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    mobileMoneyEnabled: initialSettings?.mobileMoneyEnabled ?? true,
    cardPaymentsEnabled: initialSettings?.cardPaymentsEnabled ?? true,
    paypalEnabled: initialSettings?.paypalEnabled ?? true,
    flutterwavePublicKey: initialSettings?.flutterwavePublicKey || "",
    flutterwaveSecretKey: initialSettings?.flutterwaveSecretKey || "",
    paypalClientId: initialSettings?.paypalClientId || "",
    paypalSecret: initialSettings?.paypalSecret || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updatePaymentSettings(settings);
      
      if (result.success) {
        toast.success("Payment settings updated successfully");
      } else {
        toast.error(result.error || "Failed to update settings");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>
              Enable or disable payment methods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="mobileMoneyEnabled">Mobile Money</Label>
                <p className="text-sm text-muted-foreground">
                  MTN & Airtel Money payments
                </p>
              </div>
              <Switch
                id="mobileMoneyEnabled"
                checked={settings.mobileMoneyEnabled}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, mobileMoneyEnabled: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="cardPaymentsEnabled">Card Payments</Label>
                <p className="text-sm text-muted-foreground">
                  Visa & Mastercard payments
                </p>
              </div>
              <Switch
                id="cardPaymentsEnabled"
                checked={settings.cardPaymentsEnabled}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, cardPaymentsEnabled: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="paypalEnabled">PayPal</Label>
                <p className="text-sm text-muted-foreground">
                  PayPal payments
                </p>
              </div>
              <Switch
                id="paypalEnabled"
                checked={settings.paypalEnabled}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, paypalEnabled: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Flutterwave Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Flutterwave Configuration</CardTitle>
            <CardDescription>
              Configure your Flutterwave payment gateway
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="flutterwavePublicKey">Public Key</Label>
              <Input
                id="flutterwavePublicKey"
                type="password"
                value={settings.flutterwavePublicKey}
                onChange={(e) => setSettings({ ...settings, flutterwavePublicKey: e.target.value })}
                placeholder="FLWPUBK-xxxxxxxxxxxxx"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="flutterwaveSecretKey">Secret Key</Label>
              <Input
                id="flutterwaveSecretKey"
                type="password"
                value={settings.flutterwaveSecretKey}
                onChange={(e) => setSettings({ ...settings, flutterwaveSecretKey: e.target.value })}
                placeholder="FLWSECK-xxxxxxxxxxxxx"
              />
            </div>
          </CardContent>
        </Card>

        {/* PayPal Settings */}
        <Card>
          <CardHeader>
            <CardTitle>PayPal Configuration</CardTitle>
            <CardDescription>
              Configure your PayPal payment gateway
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paypalClientId">Client ID</Label>
              <Input
                id="paypalClientId"
                type="password"
                value={settings.paypalClientId}
                onChange={(e) => setSettings({ ...settings, paypalClientId: e.target.value })}
                placeholder="AXxxxxxxxxxxxxxxxxxxxx"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paypalSecret">Secret</Label>
              <Input
                id="paypalSecret"
                type="password"
                value={settings.paypalSecret}
                onChange={(e) => setSettings({ ...settings, paypalSecret: e.target.value })}
                placeholder="EXxxxxxxxxxxxxxxxxxxxx"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-orange-500 hover:bg-orange-600"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}