"use client";

import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const FEATURES_COMPARISON = [
  {
    feature: "Access Duration",
    daily: "24 hours",
    weekly: "7 days",
    monthly: "30 days",
    quarterly: "90 days",
    semiannual: "180 days",
    annual: "365 days",
  },
  {
    feature: "Video Quality",
    daily: "HD",
    weekly: "HD & Full HD",
    monthly: "Full HD & 4K",
    quarterly: "Full HD & 4K",
    semiannual: "Full HD & 4K",
    annual: "Full HD & 4K",
  },
  {
    feature: "Unlimited Downloads",
    daily: true,
    weekly: true,
    monthly: true,
    quarterly: true,
    semiannual: true,
    annual: true,
  },
  {
    feature: "All Movies & Series",
    daily: true,
    weekly: true,
    monthly: true,
    quarterly: true,
    semiannual: true,
    annual: true,
  },
  {
    feature: "Ad-Free Experience",
    daily: true,
    weekly: true,
    monthly: true,
    quarterly: true,
    semiannual: true,
    annual: true,
  },
  {
    feature: "Simultaneous Devices",
    daily: "1 device",
    weekly: "2 devices",
    monthly: "3 devices",
    quarterly: "4 devices",
    semiannual: "5 devices",
    annual: "Unlimited",
  },
  {
    feature: "Early Access to New Releases",
    daily: false,
    weekly: true,
    monthly: true,
    quarterly: true,
    semiannual: true,
    annual: true,
  },
  {
    feature: "Offline Viewing",
    daily: false,
    weekly: false,
    monthly: true,
    quarterly: true,
    semiannual: true,
    annual: true,
  },
  {
    feature: "Customer Support",
    daily: "Standard",
    weekly: "Standard",
    monthly: "Priority",
    quarterly: "Priority",
    semiannual: "Priority",
    annual: "VIP",
  },
  {
    feature: "Exclusive Content",
    daily: false,
    weekly: false,
    monthly: false,
    quarterly: true,
    semiannual: true,
    annual: true,
  },
  {
    feature: "Behind-the-Scenes Access",
    daily: false,
    weekly: false,
    monthly: false,
    quarterly: true,
    semiannual: true,
    annual: true,
  },
  {
    feature: "Renewal Bonus",
    daily: false,
    weekly: false,
    monthly: false,
    quarterly: false,
    semiannual: "1 free month",
    annual: "2 free months",
  },
  {
    feature: "Special Event Access",
    daily: false,
    weekly: false,
    monthly: false,
    quarterly: false,
    semiannual: false,
    annual: true,
  },
  {
    feature: "Gift Subscription",
    daily: false,
    weekly: false,
    monthly: false,
    quarterly: false,
    semiannual: false,
    annual: true,
  },
];

export function PricingFeatures() {
  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-red-500 mx-auto" />
      );
    }
    return <span className="text-sm text-center block">{value}</span>;
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Compare Plans</h2>
        <p className="text-muted-foreground">
          Find the perfect plan for your entertainment needs
        </p>
      </div>

      {/* Desktop Table */}
      <Card className="hidden lg:block overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary">
                <TableHead className="w-[200px] font-bold">Features</TableHead>
                <TableHead className="text-center font-bold">24 Hours</TableHead>
                <TableHead className="text-center font-bold">Weekly</TableHead>
                <TableHead className="text-center font-bold bg-orange-500/10">
                  Monthly
                  <div className="text-xs text-orange-500 font-normal">Popular</div>
                </TableHead>
                <TableHead className="text-center font-bold">3 Months</TableHead>
                <TableHead className="text-center font-bold">6 Months</TableHead>
                <TableHead className="text-center font-bold bg-orange-500/10">
                  Annual
                  <div className="text-xs text-orange-500 font-normal">Best Value</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FEATURES_COMPARISON.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.feature}</TableCell>
                  <TableCell className="text-center">{renderCell(row.daily)}</TableCell>
                  <TableCell className="text-center">{renderCell(row.weekly)}</TableCell>
                  <TableCell className="text-center bg-orange-500/5">
                    {renderCell(row.monthly)}
                  </TableCell>
                  <TableCell className="text-center">{renderCell(row.quarterly)}</TableCell>
                  <TableCell className="text-center">{renderCell(row.semiannual)}</TableCell>
                  <TableCell className="text-center bg-orange-500/5">
                    {renderCell(row.annual)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {["daily", "weekly", "monthly", "quarterly", "semiannual", "annual"].map((plan) => (
          <Card key={plan} className="p-4">
            <h3 className="font-bold text-lg mb-4 capitalize">
              {plan === "daily" ? "24 Hours" : 
               plan === "weekly" ? "Weekly" :
               plan === "monthly" ? "Monthly" :
               plan === "quarterly" ? "3 Months" :
               plan === "semiannual" ? "6 Months" : "Annual"}
            </h3>
            <div className="space-y-2">
              {FEATURES_COMPARISON.map((row, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{row.feature}</span>
                  <div>{renderCell(row[plan as keyof typeof row])}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}