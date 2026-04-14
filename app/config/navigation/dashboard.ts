"use client";

import { DashboardSidebarItem } from "@/interfaces/navigation-bars.interfaces";
import { LayoutDashboard, Coins, Settings } from "lucide-react";

export const dashboardSidebarItems: DashboardSidebarItem[] = [
  {
    label: "Studio",
    name: "studio",
    href: "/dashboard",
    icon: LayoutDashboard,
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