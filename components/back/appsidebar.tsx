
"use client"
import React, { useTransition } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Film,
  Tv,
  BookOpen,
  Video,
  TrendingUp,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  ChevronsUpDown,
  Sparkles,
  Bell,
  BadgeCheck,
  PieChart,
  Database,
  Folder,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/actions/auth";

export default function AppSidebar({user}:{user:any}) {
  const sidebarLinks = [
    {
      title: "🎬 Dashboard",
      url: "/dashboard",
      icon: PieChart,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
      ],
    },
    {
      title: "🎥 Movies",
      url: "#",
      icon: Film,
      items: [
        { title: "All Movies", url: "/dashboard/movies" },
        { title: "Add Movie", url: "/dashboard/movies/add" },
        { title: "Trending", url: "/dashboard/movies/trending" },
      ],
    },
    {
      title: "📺 Series",
      url: "#",
      icon: Tv,
      items: [
        { title: "All Series", url: "/dashboard/series" },
        { title: "Add Series", url: "/dashboard/series/add" },
        { title: "Episodes", url: "/dashboard/episodes" },
      ],
    },
    {
      title: "🎞️ Documentaries",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "All Documentaries", url: "/dashboard/documentaries" },
        { title: "Add Documentary", url: "/dashboard/documentaries/add" },
      ],
    },
    {
      title: "📊 Analytics",
      url: "#",
      icon: TrendingUp,
      items: [
        { title: "Watch Stats", url: "/dashboard/analytics/watch" },
        { title: "Downloads", url: "/dashboard/analytics/downloads" },
        { title: "User Activity", url: "/dashboard/analytics/users" },
      ],
    },
    {
      title: "👥 Users",
      url: "#",
      icon: Users,
      items: [
        { title: "All Users", url: "/dashboard/users" },
        { title: "Admins", url: "/dashboard/users/admins" },
        { title: "Subscribers", url: "/dashboard/users/subscribers" },
      ],
    },
    {
      title: "💾 Library & Storage",
      url: "#",
      icon: Folder,
      items: [
        { title: "Media Storage", url: "/dashboard/storage" },
        { title: "R2 Files", url: "/dashboard/storage/r2" },
        { title: "Backups", url: "/dashboard/storage/backups" },
      ],
    },
    {
      title: "⚙️ Settings",
      url: "#",
      icon: Settings,
      items: [
        { title: "App Settings", url: "/dashboard/settings" },
        { title: "User Roles", url: "/dashboard/settings/roles" },
        { title: "System Logs", url: "/dashboard/settings/logs" },
      ],
    },
  ];

     const [isLoggingOut, startTransition] = useTransition();
    const router = useRouter();
  
        const handleLogout = () => {
      startTransition(async () => {
        await logoutUser();         
        router.replace("/");    
      });
    };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="MovieStream">
              <span className="font-bold text-lg">🎬 MovieStream</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarLinks.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatar} alt={user?.name}/>
                    <AvatarFallback className="rounded-lg">AD</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-lg">AD</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Sparkles />
                    Upgrade Plan
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                 <DropdownMenuItem
                  onSelect={(e) => {
                  e.preventDefault(); // prevent menu default behavior
                  if (!isLoggingOut) handleLogout();
                  }}
                    disabled={isLoggingOut}
                               >
                                 <LogOut />
                                 {isLoggingOut ? "Logging out..." : "Log out"}
                               </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
