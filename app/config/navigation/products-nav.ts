import { Routes } from "@/config/routes";

export const navProducts = [
  {
    key: "sineverse",
    label: "Sineverse",
    description: "AI film studio: structure scenes, generate footage, assemble and publish without a classic NLE.",
    href: Routes.landing.sineverse,
  },
  {
    key: "estatelift",
    label: "EstateLift",
    description: "Turn listing photos into walkthrough videos with music, captions, and vertical or horizontal exports.",
    href: Routes.landing.estatelift,
  },
] as const;
