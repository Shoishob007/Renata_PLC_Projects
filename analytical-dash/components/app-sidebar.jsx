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
import { useAuth } from "@/context/AuthContext";

// sample data.
const data = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    image_url: "/avatars/shadcn.jpg",
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
  ],
};

export function AppSidebar({user}) {

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
