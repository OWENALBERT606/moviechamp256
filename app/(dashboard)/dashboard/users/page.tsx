import { getSession } from "@/actions/auth";
import { redirect } from "next/navigation";
import { getAllUsers } from "@/actions/admin";

import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { UsersStats } from "./components/user-stats";
import { UsersTable } from "./components/users-table";

interface UsersPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    role?: string;
  }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const session = await getSession();
  
  if (!session?.user) {
    redirect("/login?redirect=/dashboard/users");
  }

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const search = params.search || "";
  const status = params.status || "";
  const role = params.role || "";

  const result = await getAllUsers({ page, search, status, role, limit: 20 });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-muted-foreground">
            Manage all users and their subscriptions
          </p>
        </div>
        <Button asChild className="bg-orange-500 hover:bg-orange-600">
          <Link href="/dashboard/users/create">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <UsersStats stats={result.stats} />

      {/* Users Table */}
      <UsersTable 
        users={result.data || []} 
        totalPages={result.totalPages || 1}
        currentPage={page}
      />
    </div>
  );
}