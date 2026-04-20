"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { Coins, CreditCard, LogOut, Menu, User } from "lucide-react";
import { Button } from "@heroui/button";
import { signOut, useSession } from "next-auth/react";
import NextLink from "next/link";

import { ThemeSwitch } from "@/components/ui/theme-switch";
import { Routes } from "@/config/routes";
import { useCreditsSummary } from "@/features/credits/hooks/use-credits";
import { useLayoutStore } from "@/stores/layout.store";

export function DashboardNavbar() {
  const { data: session, status } = useSession();

  const isSessionLoading = status === "loading";

  const { full_name, email } = session || {};

  const { toggleMobileDrawer } = useLayoutStore();

  const { data: creditsSummary, isLoading: creditsLoading } =
    useCreditsSummary();

  return (
    <HeroUINavbar isBordered maxWidth="xl" position="sticky">
      <NavbarContent className="md:hidden" justify="start">
        <NavbarItem>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onPress={toggleMobileDrawer}
          >
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
              aria-label={`Credits: ${(creditsSummary?.balance ?? 0).toLocaleString()}. Buy credits.`}
              classNames={{
                base: "h-9 max-w-[min(100%,20rem)] gap-1 border-default-200 bg-default-100/90 pl-2 pr-1",
                content: "min-w-0 gap-2 font-semibold tabular-nums",
              }}
              endContent={
                <NextLink
                  className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-primary sm:text-sm"
                  href={Routes.billing}
                >
                  <span className="hidden sm:inline">Buy credits</span>
                  <span className="sm:hidden">Buy</span>
                </NextLink>
              }
              size="md"
              startContent={
                <Coins aria-hidden className="size-4 shrink-0 text-primary" />
              }
              variant="bordered"
            >
              <span className="truncate">
                {(creditsSummary?.balance ?? 0).toLocaleString()}
              </span>
            </Chip>
          )}
          <ThemeSwitch />
          <Dropdown
            classNames={{
              content:
                "rounded-xl shadow-lg border border-default-200/80 p-0 min-w-[220px]",
            }}
            isDisabled={isSessionLoading}
            placement="bottom-end"
          >
            <DropdownTrigger>
              {isSessionLoading ? (
                <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
              ) : (
                <Avatar
                  as="button"
                  className="h-8 w-8 cursor-pointer transition-transform"
                  name={full_name}
                />
              )}
            </DropdownTrigger>
            <DropdownMenu
              aria-label="User menu"
              className="p-0"
              itemClasses={{ base: "gap-3" }}
            >
              <DropdownSection showDivider>
                <DropdownItem
                  key="profile"
                  isReadOnly
                  className="h-auto cursor-default gap-3 py-3"
                  description={email}
                  startContent={
                    <Avatar className="h-10 w-10 shrink-0" name={full_name} />
                  }
                >
                  {full_name}
                </DropdownItem>
              </DropdownSection>
              <DropdownSection className="py-1">
                <DropdownItem
                  key="account"
                  className="rounded-lg"
                  href={Routes.settings}
                  startContent={<User className="size-4" />}
                >
                  Account
                </DropdownItem>
                <DropdownItem
                  key="billing"
                  className="rounded-lg"
                  href={Routes.billing}
                  startContent={<CreditCard className="size-4" />}
                >
                  Billing
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className="rounded-lg"
                  color="danger"
                  startContent={<LogOut className="size-4" />}
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
