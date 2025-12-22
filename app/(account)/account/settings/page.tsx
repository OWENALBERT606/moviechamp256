import { getSession } from "@/actions/auth";
import { Card } from "@/components/ui/card";
import { PasswordChangeForm } from "./components/password-change-form";
import { AccountSettings } from "./components/account-settings";

export default async function SettingsPage() {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Password Change */}
      <PasswordChangeForm userId={session.user.id} />

      {/* Account Settings */}
      <AccountSettings userId={session.user.id} />
    </div>
  );
}