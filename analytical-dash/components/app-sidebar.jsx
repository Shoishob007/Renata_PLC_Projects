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

// This is sample data.
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

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
