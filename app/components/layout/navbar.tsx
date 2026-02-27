"use client";

import { Navbar as HeroUINavbar, NavbarContent, NavbarMenu, NavbarMenuToggle, NavbarBrand, NavbarItem, NavbarMenuItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/navigation/site";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { LogsIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@heroui/button";
import { Routes } from "@/config/routes";
import { environments } from "@/config/environments";

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <HeroUINavbar 
      maxWidth="xl" 
      position="sticky"
      className="border-b border-divider/50 bg-background/70 backdrop-blur-lg"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <div className="flex items-center justify-center bg-primary/20 p-2 rounded-xl text-primary shadow-sm">
              <LogsIcon size={22} strokeWidth={2.5} />
            </div>
            <p className="font-bold text-inherit text-lg tracking-tight">{environments.APP_NAME}</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink className={clsx(linkStyles({ color: "foreground" }), "data-[active=true]:text-primary data-[active=true]:font-medium")} color="foreground" href={item.href}>
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-3 items-center">
          <ThemeSwitch />
          {session ? (
            <Button as={NextLink} color="primary" href={Routes.studio} variant="shadow" radius="full" className="font-medium">
              Dashboard
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button as={NextLink} href={Routes.auth.sign_in} variant="light" radius="full" className="font-medium">
                Login
              </Button>
              <Button as={NextLink} color="primary" href={Routes.auth.sign_up} variant="shadow" radius="full" className="font-medium">
                Register
              </Button>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color={index === 2 ? "primary" : index === siteConfig.navMenuItems.length - 1 ? "danger" : "foreground"} href="#" size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
