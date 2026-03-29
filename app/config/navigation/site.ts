export type SiteConfig = typeof siteConfig;

export type NavItem =
  | { readonly label: string; readonly href: string }
  | { readonly label: string; readonly section: "features" | "about" };

export const siteConfig = {
  name: "SineVerse",
  description: "Make beautiful websites regardless of your design experience.",
  navHome: {
    label: "Home",
    href: "/",
  },
  navItems: [
    {
      label: "Pricing",
      href: "/#pricing",
    },
    {
      label: "Features",
      section: "features",
    },
    {
      label: "About",
      section: "about",
    },
  ] as const satisfies readonly NavItem[],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
