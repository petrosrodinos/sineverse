"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { DashboardSidebarItem } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
};

interface DashboardSidebarProps {
  items: DashboardSidebarItem[];
}

export function DashboardSidebar({ items }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-default-200 bg-default-50/50 dark:bg-default-100/5 min-h-[calc(100vh-4rem)] py-4">
      <nav className="flex flex-col gap-1 px-2">
        {items.map((item) => {
          const Icon = iconMap[item.icon] ?? LayoutDashboard;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <NextLink
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-default-700 hover:bg-default-100 hover:text-default-900 dark:text-default-400 dark:hover:bg-default-100/10 dark:hover:text-default-100"
              )}
            >
              <Icon className="size-5 shrink-0" />
              {item.label}
            </NextLink>
          );
        })}
      </nav>
    </aside>
  );
}
