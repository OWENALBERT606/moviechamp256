"use client";

import { Card } from "@/components/ui/card";
import { 
  Users, 
  DollarSign, 
  Film, 
  Tv, 
  TrendingUp, 
  Download,
  Eye,
  CreditCard
} from "lucide-react";

interface StatsCardsProps {
  stats: any;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Revenue",
      value: `${stats?.totalRevenue?.toLocaleString() || 0} UGX`,
      change: stats?.revenueGrowth || 0,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Active Users",
      value: stats?.activeUsers?.toLocaleString() || 0,
      change: stats?.userGrowth || 0,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Active Subscriptions",
      value: stats?.activeSubscriptions?.toLocaleString() || 0,
      change: stats?.subscriptionGrowth || 0,
      icon: CreditCard,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Total Movies",
      value: stats?.totalMovies?.toLocaleString() || 0,
      change: stats?.moviesAdded || 0,
      icon: Film,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Total Series",
      value: stats?.totalSeries?.toLocaleString() || 0,
      change: stats?.seriesAdded || 0,
      icon: Tv,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      title: "Total Views",
      value: stats?.totalViews?.toLocaleString() || 0,
      change: stats?.viewsGrowth || 0,
      icon: Eye,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      title: "Total Downloads",
      value: stats?.totalDownloads?.toLocaleString() || 0,
      change: stats?.downloadsGrowth || 0,
      icon: Download,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Monthly Revenue",
      value: `${stats?.monthlyRevenue?.toLocaleString() || 0} UGX`,
      change: stats?.monthlyRevenueGrowth || 0,
      icon: TrendingUp,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isPositive = card.change >= 0;

        return (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                <h3 className="text-2xl font-bold mb-2">{card.value}</h3>
                {card.change !== undefined && (
                  <div className="flex items-center gap-1">
                    <TrendingUp
                      className={`w-4 h-4 ${
                        isPositive ? "text-green-500" : "text-red-500 rotate-180"
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {card.change}%
                    </span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                )}
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