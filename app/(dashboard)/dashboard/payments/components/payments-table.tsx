"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Eye, 
  Download,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  XCircle,
  Smartphone,
  CreditCard,
  Wallet
} from "lucide-react";
import { toast } from "sonner";

interface PaymentsTableProps {
  payments: any[];
  totalPages: number;
  currentPage: number;
}

export function PaymentsTable({ payments, totalPages, currentPage }: PaymentsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "all");
  const [methodFilter, setMethodFilter] = useState(searchParams.get("method") || "all");

  const handleFilterChange = (type: "status" | "method", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === "all") {
      params.delete(type);
    } else {
      params.set(type, value);
    }
    params.set("page", "1");
    router.push(`/dashboard/payments?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/dashboard/payments?${params.toString()}`);
  };

  const handleExport = () => {
    toast.success("Exporting payments...", {
      description: "Your export will be ready shortly"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "PENDING":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "PROCESSING":
        return (
          <Badge className="bg-blue-500">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </Badge>
        );
      case "FAILED":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "MOBILE_MONEY":
        return <Smartphone className="w-4 h-4 text-yellow-500" />;
      case "BANK_CARD":
        return <CreditCard className="w-4 h-4 text-blue-500" />;
      case "PAYPAL":
        return <Wallet className="w-4 h-4 text-purple-500" />;
      default:
        return null;
    }
  };

  const getMethodLabel = (method: string) => {
    switch (method) {
      case "MOBILE_MONEY":
        return "Mobile Money";
      case "BANK_CARD":
        return "Bank Card";
      case "PAYPAL":
        return "PayPal";
      default:
        return method;
    }
  };

  return (
    <Card>
      {/* Filters */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <Select 
              value={statusFilter} 
              onValueChange={(v) => {
                setStatusFilter(v);
                handleFilterChange("status", v);
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="PROCESSING">Processing</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={methodFilter} 
              onValueChange={(v) => {
                setMethodFilter(v);
                handleFilterChange("method", v);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="MOBILE_MONEY">Mobile Money</SelectItem>
                <SelectItem value="BANK_CARD">Bank Card</SelectItem>
                <SelectItem value="PAYPAL">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <div>
                    <p className="font-mono text-sm">{payment.transactionId || payment.id.slice(0, 8)}</p>
                    {payment.phoneNumber && (
                      <p className="text-xs text-muted-foreground">{payment.phoneNumber}</p>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div>
                    <p className="font-medium">{payment.user?.name || "N/A"}</p>
                    <p className="text-xs text-muted-foreground">{payment.user?.email || "N/A"}</p>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="outline">
                    {payment.subscription?.plan || "N/A"}
                  </Badge>
                </TableCell>

                <TableCell>
                  <p className="font-semibold">
                    {payment.amount?.toLocaleString() || 0} {payment.currency || "UGX"}
                  </p>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    {getMethodIcon(payment.paymentMethod)}
                    <span className="text-sm">{getMethodLabel(payment.paymentMethod)}</span>
                  </div>
                </TableCell>

                <TableCell>{getStatusBadge(payment.status)}</TableCell>

                <TableCell>
                  <div>
                    <p className="text-sm">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(payment.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download Receipt
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <p className="text-muted-foreground">No payments found</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}