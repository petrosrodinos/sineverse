"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ChevronsUpDown, CreditCard, LogOut, User, PanelLeftClose, PanelLeft, X } from "lucide-react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Skeleton } from "@heroui/skeleton";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Drawer, DrawerContent, DrawerBody } from "@heroui/drawer";
import { siteConfig } from "@/config/navigation/site";
import { signOut, useSession } from "next-auth/react";
import { Routes } from "@/config/routes";
import { useLayoutStore } from "@/stores/layout.store";
import { DashboardSidebarItem } from "@/interfaces/navigation-bars.interfaces";

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

  const collapsed = !isMobile && userCollapsed;
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
  const { isMobileDrawerOpen, setMobileDrawerOpen } = useLayoutStore();
  const { data: session, status } = useSession();
  const isSessionLoading = status === "loading";
  const { full_name, email } = session || {};

  const sidebarContent = (
    <nav className="flex h-full w-full flex-col rounded-2xl border border-default-200 bg-default-100 py-1.5 shadow-lg shadow-default-200/20 dark:border-default-100/10 dark:bg-default-50 dark:shadow-black/10">
        <div className={clsx("flex items-center border-b border-default-200/60 dark:border-default-100/20 pb-3 mb-2", collapsed ? "justify-center px-0" : "justify-between px-4")}>
          {!collapsed && (
            <NextLink
              href="/"
              className="text-lg font-semibold tracking-tight text-foreground/90 dark:text-foreground truncate hover:text-primary transition-colors min-w-0"
            >
              {siteConfig.name}
            </NextLink>
          )}
          <div className="hidden md:block">
            <Tooltip content={collapsed ? "Expand sidebar" : "Collapse sidebar"} placement="right">
              <Button isIconOnly variant="light" size="sm" onPress={toggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="shrink-0">
                {collapsed ? <PanelLeft className="size-5" /> : <PanelLeftClose className="size-5" />}
              </Button>
            </Tooltip>
          </div>
          <Button isIconOnly variant="light" size="sm" onPress={() => setMobileDrawerOpen(false)} aria-label="Close menu" className="md:hidden shrink-0">
            <X className="size-5" />
          </Button>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = 
              pathname === item.href || 
              (item.href !== Routes.dashboard && pathname.startsWith(item.href)) || 
              (item.href === Routes.dashboard && pathname.startsWith(Routes.studio));
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
          <Dropdown placement="top-start" isDisabled={isSessionLoading}>
            <DropdownTrigger>
              <Button
                variant="flat"
                className={clsx(
                  "h-auto w-full rounded-xl bg-default-100 py-2.5 dark:bg-default-100/10",
                  collapsed ? "justify-center min-w-0 px-0" : "justify-start gap-3 px-3"
                )}
              >
                {isSessionLoading ? (
                  <>
                    <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
                    {!collapsed && (
                      <>
                        <div className="min-w-0 flex-1 space-y-1.5 text-left">
                          <Skeleton className="h-4 w-[min(100%,10rem)] rounded-md" />
                          <Skeleton className="h-3 w-[min(100%,12rem)] rounded-md" />
                        </div>
                        <Skeleton className="size-4 shrink-0 rounded-full" />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Avatar name={full_name} className="h-9 w-9 shrink-0" />
                    {!collapsed && (
                      <>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="truncate text-sm font-semibold text-foreground">{full_name}</p>
                          <p className="truncate text-xs font-normal text-default-500">{email}</p>
                        </div>
                        <ChevronsUpDown className="size-4 shrink-0 text-default-400" />
                      </>
                    )}
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
                  onPress={() => signOut({ callbackUrl: Routes.auth.sign_in })}
                >
                  Log out
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </nav>
  );

  return (
    <>
      <aside
        className={clsx(
          "hidden md:flex h-screen shrink-0 items-stretch py-3 transition-[width] duration-200",
          collapsed ? "w-[4.5rem] pl-2 pr-2" : "w-60 pl-2 pr-2"
        )}
      >
        {sidebarContent}
      </aside>

      <Drawer 
        isOpen={isMobileDrawerOpen} 
        onOpenChange={setMobileDrawerOpen} 
        placement="left" 
        size="xs" 
        className="md:hidden"
        hideCloseButton
      >
        <DrawerContent className="bg-transparent shadow-none w-72 max-w-[80vw]">
          <DrawerBody className="p-0 px-2 py-3">
            {sidebarContent}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
