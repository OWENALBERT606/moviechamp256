import { getSession } from "@/actions/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "./components/dashboard-sidebar";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login?redirect=/account");
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <DashboardSidebar user={session.user} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}