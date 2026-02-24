"use client";

import type { DashboardSidebarItem } from "@/types";
import { BarChart3, Clock, LayoutDashboard, Users, Upload, Coins, Settings } from "lucide-react";

export const dashboardSidebarItems: DashboardSidebarItem[] = [
  {
    label: "Studio",
    name: "studio",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    name: "projects",
    href: "/dashboard/projects",
    icon: Users,
  },
  {
    label: "Media Library",
    name: "media",
    href: "/dashboard/media",
    icon: BarChart3,
  },
  {
    label: "Timeline",
    name: "timeline",
    href: "/dashboard/timeline",
    icon: Clock,
  },
  {
    label: "Publish",
    name: "publish",
    href: "/dashboard/publish",
    icon: Upload,
  },
  {
    label: "Analytics",
    name: "analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    label: "Credits",
    name: "credits",
    href: "/dashboard/credits",
    icon: Coins,
  },
  {
    label: "Settings",
    name: "settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];