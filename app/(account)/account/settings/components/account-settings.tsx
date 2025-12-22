"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Trash2, Mail, Bell, Shield } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteAccount } from "@/actions/userx";

interface AccountSettingsProps {
  userId: string;
}

export function AccountSettings({ userId }: AccountSettingsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [notifications, setNotifications] = useState({
    email: true,
    newReleases: true,
    recommendations: false,
    promotions: false,
  });

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error("Please enter your password");
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteAccount(userId, deletePassword);

      if (result.success) {
        toast.success("Account deleted successfully");
        router.push("/");
      } else {
        toast.error(result.error || "Failed to delete account");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Notification Preferences</h2>
            <p className="text-sm text-muted-foreground">
              Manage how you receive notifications
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <Label htmlFor="email-notifications" className="font-semibold">
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about your account
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={notifications.email}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, email: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <Label htmlFor="new-releases" className="font-semibold">
                New Releases
              </Label>
              <p className="text-sm text-muted-foreground">
                Get notified about new movies and series
              </p>
            </div>
            <Switch
              id="new-releases"
              checked={notifications.newReleases}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, newReleases: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <Label htmlFor="recommendations" className="font-semibold">
                Recommendations
              </Label>
              <p className="text-sm text-muted-foreground">
                Personalized content suggestions
              </p>
            </div>
            <Switch
              id="recommendations"
              checked={notifications.recommendations}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, recommendations: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <Label htmlFor="promotions" className="font-semibold">
                Promotions & Offers
              </Label>
              <p className="text-sm text-muted-foreground">
                Special deals and discounts
              </p>
            </div>
            <Switch
              id="promotions"
              checked={notifications.promotions}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, promotions: checked })
              }
            />
          </div>
        </div>

        <Button className="mt-4 bg-orange-500 hover:bg-orange-600">
          Save Preferences
        </Button>
      </Card>

      {/* Privacy Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Privacy & Security</h2>
            <p className="text-sm text-muted-foreground">
              Control your privacy settings
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <Label className="font-semibold">Watch History</Label>
              <p className="text-sm text-muted-foreground">
                Allow us to track what you watch
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <Label className="font-semibold">Download History</Label>
              <p className="text-sm text-muted-foreground">
                Track your downloads
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <Label className="font-semibold">Activity Status</Label>
              <p className="text-sm text-muted-foreground">
                Show when you're online
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Delete Account */}
      <Card className="p-6 border-destructive">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-destructive">Danger Zone</h2>
            <p className="text-sm text-muted-foreground">
              Irreversible actions
            </p>
          </div>
        </div>

        <div className="dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-2 text-sm">Delete Account</h3>
          <p className="text-sm text-muted-foreground">
            Once you delete your account, there is no going back. This will:
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside mt-2 space-y-1">
            <li>Permanently delete your profile and account data</li>
            <li>Cancel all active subscriptions</li>
            <li>Remove your watch history and preferences</li>
            <li>Delete your saved content and downloads</li>
          </ul>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete My Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove all your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="my-4">
              <Label htmlFor="delete-password">
                Enter your password to confirm
              </Label>
              <Input
                id="delete-password"
                type="password"
                placeholder="Your password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="mt-2"
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Account"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </div>
  );
}