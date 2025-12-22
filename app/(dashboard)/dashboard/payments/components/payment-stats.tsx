"use client";

import { Card } from "@/components/ui/card";
import { DollarSign, CheckCircle, Clock, XCircle } from "lucide-react";

interface PaymentsStatsProps {
  stats: any;
}

export function PaymentsStats({ stats }: PaymentsStatsProps) {
  const cards = [
    {
      title: "Total Revenue",
      value: `${stats?.totalRevenue?.toLocaleString() || 0} UGX`,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Completed",
      value: stats?.completed || 0,
      icon: CheckCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Pending",
      value: stats?.pending || 0,
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Failed",
      value: stats?.failed || 0,
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                <h3 className="text-2xl font-bold">{typeof card.value === 'number' ? card.value.toLocaleString() : card.value}</h3>
              </div>
              <div className={`${card.bgColor} ${card.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}