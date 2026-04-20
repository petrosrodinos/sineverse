import { Routes } from "@/config/routes";

export type LandingNavSection = "features" | "about";

export function landingSectionBasePath(pathname: string): string {
  const el = Routes.landing.estatelift;

  const sv = Routes.landing.sineverse;

  if (pathname === el || pathname.startsWith(`${el}/`)) return el;

  if (pathname === sv || pathname.startsWith(`${sv}/`)) return sv;

  return sv;
}

export function landingSectionHref(
  pathname: string,
  section: LandingNavSection,
): string {
  return `${landingSectionBasePath(pathname)}#${section}`;
}
