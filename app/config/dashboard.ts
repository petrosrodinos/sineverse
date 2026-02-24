import type { DashboardSidebarItem } from "@/types";

export const dashboardSidebarItems: DashboardSidebarItem[] = [
  {
    label: "Overview",
    name: "overview",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    label: "Analytics",
    name: "analytics",
    href: "/dashboard/analytics",
    icon: "BarChart3",
  },
  {
    label: "Team",
    name: "team",
    href: "/dashboard/team",
    icon: "Users",
  },
  {
    label: "Settings",
    name: "settings",
    href: "/dashboard/settings",
    icon: "Settings",
  },
];
