"use client";

import * as React from "react";
import {
  ChartArea,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({user}) {
  const navMain = [
    {
      title: "Charts",
      url: "/charts",
      icon: ChartArea,
    },
    ...(user.role === "admin" || user.role === "sales"
      ? [
          {
            title: "Users",
            url: "#",
            icon: Users,
            items: [
              {
                title: "All",
                url: "/Users",
              },
              {
                title: "Admins",
                url: "/Users/Admins",
              },
              {
                title: "Sales Representatives",
                url: "/Users/Sales",
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
