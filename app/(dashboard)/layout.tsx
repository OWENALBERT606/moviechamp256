
import * as React from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/back/appsidebar";
import DashboardNav from "@/components/back/dashboard-nav";
import { fetchMe, getSession } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({children}:{children:React.ReactNode}) {


 const session = await getSession();
  if (!session) redirect("/login");

  const user = session?.user;

  // const me = await fetchMe();
  // const user = me?.data ?? session.user;


  return (
    <SidebarProvider>
          <AppSidebar user={user}/>
          <SidebarInset>
          <div className="ml-[240px]">
              <DashboardNav user={user}/>
            <div className="p-4">{children}</div>
          </div>
          </SidebarInset>
        </SidebarProvider>
  )
}


