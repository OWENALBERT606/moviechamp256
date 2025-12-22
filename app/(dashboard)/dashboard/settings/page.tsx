import { getSession } from "@/actions/auth";
import { redirect } from "next/navigation";
import { getAdminSettings } from "@/actions/admin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "./components/general-settings";
import { PaymentSettings } from "./components/payment-settings";
import { SecuritySettings } from "./components/security-settings";
import { EmailSettings } from "./components/email-settings";
import { AppearanceSettings } from "./components/apperance-settings";

export default async function SettingsPage() {
  const session = await getSession();
  
  if (!session?.user) {
    redirect("/login?redirect=/dashboard/settings");
  }

  const settings = await getAdminSettings();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings settings={settings.data?.general} />
        </TabsContent>

        <TabsContent value="email">
          <EmailSettings settings={settings.data?.email} />
        </TabsContent>

        <TabsContent value="payment">
          <PaymentSettings settings={settings.data?.payment} />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings settings={settings.data?.security} />
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceSettings settings={settings.data?.appearance} />
        </TabsContent>
      </Tabs>
    </div>
  );
}