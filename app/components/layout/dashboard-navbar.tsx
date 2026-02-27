"use client";

import { Navbar as HeroUINavbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { User, CreditCard, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function DashboardNavbar() {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex items-center gap-3">
          <ThemeSwitch />
          <Dropdown placement="bottom-end" classNames={{ content: "rounded-xl shadow-lg border border-default-200/80 p-0 min-w-[220px]" }}>
            <DropdownTrigger>
              <Avatar as="button" name="John Doe" className="h-8 w-8 cursor-pointer transition-transform" />
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu" className="p-0" itemClasses={{ base: "gap-3" }}>
              <DropdownSection showDivider>
                <DropdownItem key="profile" isReadOnly className="h-auto cursor-default gap-3 py-3" startContent={<Avatar name="John Doe" className="h-10 w-10 shrink-0" />} description="john.doe@example.com">
                  John Doe
                </DropdownItem>
              </DropdownSection>
              <DropdownSection className="py-1">
                <DropdownItem key="account" startContent={<User className="size-4" />} href="/dashboard/settings" className="rounded-lg">
                  Account
                </DropdownItem>
                <DropdownItem key="billing" startContent={<CreditCard className="size-4" />} href="/dashboard/billing" className="rounded-lg">
                  Billing
                </DropdownItem>
                <DropdownItem 
                  key="logout" 
                  color="danger" 
                  startContent={<LogOut className="size-4" />} 
                  className="rounded-lg"
                  onPress={() => signOut({ callbackUrl: "/auth/sign-in" })}
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
