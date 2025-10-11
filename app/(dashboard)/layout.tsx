"use client";
import * as React from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/back/appsidebar";
import DashboardNav from "@/components/back/dashboard-nav";

export default function DashboardLayout({children}:{children:React.ReactNode}) {
  return (
    <SidebarProvider>
          <AppSidebar/>
          <SidebarInset>
          <div className="ml-[240px]">
              <DashboardNav/>
            <div className="p-4">{children}</div>
          </div>
          </SidebarInset>
        </SidebarProvider>
  )
}


