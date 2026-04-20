"use client";

import { LayoutDashboard, Coins, Settings, Shield } from "lucide-react";

import { DashboardSidebarItem } from "@/interfaces/navigation-bars.interfaces";
import { RoleTypes } from "@/features/user/interfaces/user.interfaces";

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
  {
    label: "Admin",
    name: "admin",
    href: "/dashboard/admin",
    icon: Shield,
    roles: [RoleTypes.ADMIN, RoleTypes.SUPER_ADMIN],
  },
];
