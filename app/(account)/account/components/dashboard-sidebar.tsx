"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { 
  User, 
  CreditCard, 
  Settings, 
  History, 
  Heart,
  LogOut,
  Crown,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface DashboardSidebarProps {
  user: {
    id: string;
    name: string;
    email: string;
    imageUrl?: string;
    currentPlan?: string;
  };
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Profile",
      href: "/account",
      icon: User,
    },
    {
      title: "Subscriptions",
      href: "/account/subscriptions",
      icon: CreditCard,
    },
    {
      title: "Watch History",
      href: "/account/watch-history",
      icon: History,
    },
    {
      title: "My List",
      href: "/list",
      icon: Heart,
    },
    {
      title: "Settings",
      href: "/account/settings",
      icon: Settings,
    },
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
  ];

  return (
    <Card className="p-6 sticky top-24">
      {/* User Info */}
      <div className="text-center mb-6 pb-6 border-b border-border">
        {user.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt={user.name}
            width={80}
            height={80}
            className="rounded-full mx-auto mb-3"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
            {user.email?.[0]?.toUpperCase()}
          </div>
        )}
        <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{user.email}</p>
        
        {user.currentPlan && (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-xs font-semibold">
            <Crown className="w-3 h-3" />
            {user.currentPlan}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-orange-500 text-white"
                  : "hover:bg-secondary text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-6 pt-6 border-t border-border">
        <Link
          href="/logout"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </Card>
  );
}