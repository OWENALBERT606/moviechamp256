"use client";

import { Card } from "@/components/ui/card";
import { Users, UserCheck, UserX, Crown } from "lucide-react";

interface UsersStatsProps {
  stats: any;
}

export function UsersStats({ stats }: UsersStatsProps) {
  const cards = [
    {
      title: "Total Users",
      value: stats?.total || 0,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Active Users",
      value: stats?.active || 0,
      icon: UserCheck,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Inactive Users",
      value: stats?.inactive || 0,
      icon: UserX,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Subscribers",
      value: stats?.subscribers || 0,
      icon: Crown,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
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
                <h3 className="text-2xl font-bold">{card.value.toLocaleString()}</h3>
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