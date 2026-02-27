"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ChevronsUpDown, CreditCard, LogOut, User, PanelLeftClose, PanelLeft } from "lucide-react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { siteConfig } from "@/config/navigation/site";
import type { DashboardSidebarItem } from "@/types";
import { signOut } from "next-auth/react";

const SIDEBAR_MEDIA_QUERY = "(max-width: 768px)";

function useSidebarCollapsed() {
  const [userCollapsed, setUserCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(SIDEBAR_MEDIA_QUERY);
    const handler = () => setIsMobile(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const collapsed = isMobile || userCollapsed;
  const setCollapsed = (value: boolean) => setUserCollapsed(value);
  const toggle = () => setUserCollapsed((c) => !c);

  return { collapsed, setCollapsed, toggle };
}

interface DashboardSidebarProps {
  items: DashboardSidebarItem[];
}

export function DashboardSidebar({ items }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebarCollapsed();

  return (
    <aside
      className={clsx(
        "flex h-screen shrink-0 items-stretch py-3 transition-[width] duration-200",
        collapsed ? "w-[4.5rem] pl-2 pr-2" : "w-60 pl-2 pr-2"
      )}
    >
      <nav className="flex w-full flex-col rounded-2xl border border-default-200 bg-default-100 py-4 shadow-lg shadow-default-200/20 dark:border-default-100/10 dark:bg-default-100/10 dark:shadow-black/10">
        <div className={clsx("flex items-center border-b border-default-200/60 dark:border-default-100/20 pb-3 mb-2", collapsed ? "justify-center px-0" : "justify-between px-4")}>
          {!collapsed && (
            <p className="text-lg font-semibold tracking-tight text-foreground/90 dark:text-foreground truncate">
              {siteConfig.name}
            </p>
          )}
          <Tooltip content={collapsed ? "Expand sidebar" : "Collapse sidebar"} placement="right">
            <Button isIconOnly variant="light" size="sm" onPress={toggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="shrink-0">
              {collapsed ? <PanelLeft className="size-5" /> : <PanelLeftClose className="size-5" />}
            </Button>
          </Tooltip>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const link = (
              <NextLink
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-200",
                  collapsed ? "justify-center mx-2 px-0" : "mx-2 gap-3 px-3",
                  isActive ? "bg-primary text-primary-foreground shadow-md" : "text-default-600 hover:bg-default-100 hover:text-default-900 dark:text-default-400 dark:hover:bg-default-100/20 dark:hover:text-default-100"
                )}
              >
                <Icon className="size-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NextLink>
            );
            return collapsed ? (
              <Tooltip key={item.name} content={item.label} placement="right">
                {link}
              </Tooltip>
            ) : (
              link
            );
          })}
        </div>
        <div className="mt-auto border-t border-default-200/60 dark:border-default-100/20 pt-3 px-2">
          <Dropdown placement="top-start">
            <DropdownTrigger>
              <Button
                variant="flat"
                className={clsx(
                  "h-auto w-full rounded-xl bg-default-100 py-2.5 dark:bg-default-100/10",
                  collapsed ? "justify-center min-w-0 px-0" : "justify-start gap-3 px-3"
                )}
              >
                <Avatar name="John Doe" className="h-9 w-9 shrink-0" />
                {!collapsed && (
                  <>
                    <div className="min-w-0 flex-1 text-left">
                      <p className="truncate text-sm font-semibold text-foreground">John Doe</p>
                      <p className="truncate text-xs font-normal text-default-500">john.doe@example.com</p>
                    </div>
                    <ChevronsUpDown className="size-4 shrink-0 text-default-400" />
                  </>
                )}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Account actions" className="min-w-[200px] rounded-xl">
              <DropdownItem key="account" startContent={<User className="size-4" />} href="/dashboard/settings">
                Account
              </DropdownItem>
              <DropdownItem key="billing" startContent={<CreditCard className="size-4" />} href="/dashboard/billing">
                Billing
              </DropdownItem>
              <DropdownSection>
                <DropdownItem 
                  key="logout" 
                  color="danger" 
                  startContent={<LogOut className="size-4" />}
                  onPress={() => signOut({ callbackUrl: "/auth/sign-in" })}
                >
                  Log out
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </nav>
    </aside>
  );
}
