"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { LandingNavLink } from "@/components/layout/LandingNavLink";
import { landingSectionHref } from "@/config/navigation/landing-section-href";
import { siteConfig, type NavItem } from "@/config/navigation/site";
import { navProducts } from "@/config/navigation/products-nav";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { ChevronDown, Clapperboard, LogsIcon, Video } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@heroui/button";
import { Routes } from "@/config/routes";
import { environments } from "@/config/environments";

const productIcons = {
  sineverse: Clapperboard,
  estatelift: Video,
} as const;

function navItemHref(item: NavItem, pathname: string): string {
  if ("href" in item) return item.href;
  return landingSectionHref(pathname, item.section);
}

export const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="border-b border-divider/50 bg-background/70 backdrop-blur-lg">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <div className="flex items-center justify-center rounded-xl bg-primary/20 p-2 text-primary shadow-sm">
              <LogsIcon size={22} strokeWidth={2.5} />
            </div>
            <p className="text-lg font-bold tracking-tight text-inherit">{environments.APP_NAME}</p>
          </NextLink>
        </NavbarBrand>
        <ul className="ml-2 hidden items-center gap-1 md:flex">
          <NavbarItem>
            <LandingNavLink
              className={clsx(linkStyles({ color: "foreground" }), "data-[active=true]:font-medium data-[active=true]:text-primary px-3 py-2")}
              href={siteConfig.navHome.href}
            >
              {siteConfig.navHome.label}
            </LandingNavLink>
          </NavbarItem>
          <NavbarItem>
            <Dropdown placement="bottom-start" offset={10} classNames={{ content: "min-w-[min(100vw-2rem,22rem)] rounded-2xl border border-divider/50 p-1 shadow-xl" }}>
              <DropdownTrigger>
                <Button
                  variant="light"
                  radius="sm"
                  className="h-9 min-w-0 gap-1 px-3 font-medium text-foreground data-[hover=true]:bg-default-100"
                  endContent={<ChevronDown className="size-4 opacity-70" strokeWidth={2} />}
                >
                  Products
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Products" variant="flat" itemClasses={{ base: "rounded-xl gap-3 py-3 data-[hover=true]:bg-default-100" }}>
                {navProducts.map((p) => {
                  const Icon = productIcons[p.key];
                  return (
                    <DropdownItem key={p.key} href={p.href} description={p.description} startContent={<Icon className="size-5 shrink-0 text-primary" strokeWidth={1.75} />}>
                      {p.label}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          {siteConfig.navItems.map((item) => {
            const href = navItemHref(item, pathname);
            return (
              <NavbarItem key={`${item.label}-${href}`}>
                <LandingNavLink
                  className={clsx(linkStyles({ color: "foreground" }), "data-[active=true]:font-medium data-[active=true]:text-primary px-3 py-2")}
                  href={href}
                >
                  {item.label}
                </LandingNavLink>
              </NavbarItem>
            );
          })}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden basis-1/5 sm:flex sm:basis-full" justify="end">
        <NavbarItem className="hidden gap-3 sm:flex sm:items-center">
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

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="pt-2">
        <div className="mx-4 mt-2 flex flex-col gap-1">
          <NavbarMenuItem>
            <LandingNavLink href={siteConfig.navHome.href} className="block w-full py-2 text-lg text-foreground">
              {siteConfig.navHome.label}
            </LandingNavLink>
          </NavbarMenuItem>
          <p className="px-0 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-default-500">Products</p>
          {navProducts.map((p) => {
            const Icon = productIcons[p.key];
            return (
              <NavbarMenuItem key={p.key}>
                <NextLink href={p.href} className="flex gap-3 rounded-xl py-2 pl-1 pr-2 transition-colors hover:bg-default-100">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg font-medium text-foreground">{p.label}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-default-500">{p.description}</span>
                  </span>
                </NextLink>
              </NavbarMenuItem>
            );
          })}
          {siteConfig.navItems.map((item) => {
            const href = navItemHref(item, pathname);
            return (
              <NavbarMenuItem key={`${item.label}-${href}`}>
                <LandingNavLink href={href} className="block w-full py-2 text-lg text-foreground">
                  {item.label}
                </LandingNavLink>
              </NavbarMenuItem>
            );
          })}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
