import { getSession } from "@/actions/auth";
import { Card } from "@/components/ui/card";
import { ProfileForm } from "./components/profile-form";
import { getUserById } from "@/actions/userx";

export default async function ProfilePage() {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const result = await getUserById(userId);
  const user = result.data;

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <ProfileForm user={user} />
    </div>
  );
}