"use client";

import { Navbar as HeroUINavbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { Coins, CreditCard, LogOut, Menu, User } from "lucide-react";
import { Button } from "@heroui/button";
import { signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { Routes } from "@/config/routes";
import { useCreditsSummary } from "@/features/credits/hooks/use-credits";
import { useLayoutStore } from "@/stores/layout.store";

export function DashboardNavbar() {
  const { data: session, status } = useSession();
  const isSessionLoading = status === "loading";
  const { full_name, email } = session || {};
  const { toggleMobileDrawer } = useLayoutStore();
  const { data: creditsSummary, isLoading: creditsLoading } = useCreditsSummary();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" isBordered>
      <NavbarContent className="md:hidden" justify="start">
        <NavbarItem>
          <Button isIconOnly variant="light" size="sm" onPress={toggleMobileDrawer}>
            <Menu className="size-5" />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="w-full" justify="end">
        <NavbarItem className="ml-auto flex items-center gap-2 sm:gap-3">
          {creditsLoading ? (
            <Skeleton className="h-9 w-[min(100%,14rem)] max-w-[14rem] shrink-0 rounded-full" />
          ) : (
            <Chip
              variant="bordered"
              size="md"
              classNames={{
                base: "h-9 max-w-[min(100%,20rem)] gap-1 border-default-200 bg-default-100/90 pl-2 pr-1",
                content: "min-w-0 gap-2 font-semibold tabular-nums",
              }}
              startContent={<Coins className="size-4 shrink-0 text-primary" aria-hidden />}
              endContent={
                <NextLink
                  href={Routes.billing}
                  className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-primary sm:text-sm"
                >
                  <span className="hidden sm:inline">Buy credits</span>
                  <span className="sm:hidden">Buy</span>
                </NextLink>
              }
              aria-label={`Credits: ${(creditsSummary?.balance ?? 0).toLocaleString()}. Buy credits.`}
            >
              <span className="truncate">{(creditsSummary?.balance ?? 0).toLocaleString()}</span>
            </Chip>
          )}
          <ThemeSwitch />
          <Dropdown placement="bottom-end" isDisabled={isSessionLoading} classNames={{ content: "rounded-xl shadow-lg border border-default-200/80 p-0 min-w-[220px]" }}>
            <DropdownTrigger>
              {isSessionLoading ? (
                <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
              ) : (
                <Avatar as="button" name={full_name} className="h-8 w-8 cursor-pointer transition-transform" />
              )}
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu" className="p-0" itemClasses={{ base: "gap-3" }}>
              <DropdownSection showDivider>
                <DropdownItem key="profile" isReadOnly className="h-auto cursor-default gap-3 py-3" startContent={<Avatar name={full_name} className="h-10 w-10 shrink-0" />} description={email}>
                  {full_name}
                </DropdownItem>
              </DropdownSection>
              <DropdownSection className="py-1">
                <DropdownItem key="account" startContent={<User className="size-4" />} href={Routes.settings} className="rounded-lg">
                  Account
                </DropdownItem>
                <DropdownItem key="billing" startContent={<CreditCard className="size-4" />} href={Routes.billing} className="rounded-lg">
                  Billing
                </DropdownItem>
                <DropdownItem 
                  key="logout" 
                  color="danger" 
                  startContent={<LogOut className="size-4" />} 
                  className="rounded-lg"
                  onPress={() => signOut({ callbackUrl: Routes.auth.sign_in })}
                >
                  Log out
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
}
