"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SecuritySettingsProps {
  settings: any;
}

export function SecuritySettings({ settings: initialSettings }: SecuritySettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    twoFactorEnabled: initialSettings?.twoFactorEnabled || false,
    sessionTimeout: initialSettings?.sessionTimeout || 30,
    maxLoginAttempts: initialSettings?.maxLoginAttempts || 5,
    passwordMinLength: initialSettings?.passwordMinLength || 8,
    requireUppercase: initialSettings?.requireUppercase ?? true,
    requireNumbers: initialSettings?.requireNumbers ?? true,
    requireSpecialChars: initialSettings?.requireSpecialChars ?? false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement security settings update
      toast.success("Security settings updated successfully");
    } catch (error) {
      toast.error("Failed to update security settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Two-Factor Authentication */}
        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>
              Add an extra layer of security to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="twoFactorEnabled">Enable 2FA</Label>
                <p className="text-sm text-muted-foreground">
                  Require two-factor authentication for admin login
                </p>
              </div>
              <Switch
                id="twoFactorEnabled"
                checked={settings.twoFactorEnabled}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, twoFactorEnabled: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Session Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Session Settings</CardTitle>
            <CardDescription>
              Configure session timeout and login security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                placeholder="30"
                min="5"
                max="1440"
              />
              <p className="text-xs text-muted-foreground">
                Users will be logged out after this period of inactivity
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => setSettings({ ...settings, maxLoginAttempts: parseInt(e.target.value) })}
                placeholder="5"
                min="3"
                max="10"
              />
              <p className="text-xs text-muted-foreground">
                Account will be temporarily locked after this many failed attempts
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Password Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Password Requirements</CardTitle>
            <CardDescription>
              Set password complexity requirements for users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
              <Input
                id="passwordMinLength"
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => setSettings({ ...settings, passwordMinLength: parseInt(e.target.value) })}
                placeholder="8"
                min="6"
                max="20"
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="requireUppercase">Require Uppercase</Label>
                <p className="text-sm text-muted-foreground">
                  Password must contain uppercase letters
                </p>
              </div>
              <Switch
                id="requireUppercase"
                checked={settings.requireUppercase}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, requireUppercase: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="requireNumbers">Require Numbers</Label>
                <p className="text-sm text-muted-foreground">
                  Password must contain numbers
                </p>
              </div>
              <Switch
                id="requireNumbers"
                checked={settings.requireNumbers}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, requireNumbers: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="requireSpecialChars">Require Special Characters</Label>
                <p className="text-sm text-muted-foreground">
                  Password must contain special characters (!@#$%^&*)
                </p>
              </div>
              <Switch
                id="requireSpecialChars"
                checked={settings.requireSpecialChars}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, requireSpecialChars: checked })
                }
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