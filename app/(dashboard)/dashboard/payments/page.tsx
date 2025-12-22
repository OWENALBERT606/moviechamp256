import { getSession } from "@/actions/auth";
import { redirect } from "next/navigation";
import { PaymentsStats } from "./components/payment-stats";
import { PaymentsTable } from "./components/payments-table";
import { getAllPayments } from "@/actions/admin";

interface PaymentsPageProps {
  searchParams: Promise<{
    page?: string;
    status?: string;
    method?: string;
  }>;
}

export default async function PaymentsPage({ searchParams }: PaymentsPageProps) {
  const session = await getSession();
  
  if (!session?.user) {
    redirect("/login?redirect=/dashboard/payments");
  }

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const status = params.status || "";
  const method = params.method || "";

  const result = await getAllPayments({ page, status, method, limit: 20 });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Payments & Transactions</h1>
        <p className="text-muted-foreground">
          Monitor all payments and subscription transactions
        </p>
      </div>

      {/* Stats */}
      <PaymentsStats stats={result.stats} />

      {/* Payments Table */}
      <PaymentsTable 
        payments={result.data || []} 
        totalPages={result.totalPages || 1}
        currentPage={page}
      />
    </div>
  );
}