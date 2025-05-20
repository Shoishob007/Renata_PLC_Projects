"use client";

import * as React from "react";
import {
  AudioWaveform,
  ChartArea,
  Command,
  GalleryVerticalEnd,
  Table2,
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

// sample data.
const data = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Data Table",
      url: "#",
      icon: Table2,
      isActive: true,
    },
    {
      title: "Charts",
      url: "#",
      icon: ChartArea,
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Admins",
          url: "#",
        },
        {
          title: "Sales Representatives",
          url: "#",
        },
        {
          title: "Customers",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({user}) {
  console.log("User object in app-sidebar :: ", user)
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
