"use client";

import type { ReactNode } from "react";
import { useLandingHashScroll } from "@/hooks/use-landing-hash-scroll";

export function LandingHashScroll(props: { pathnameMatch: string; children: ReactNode }) {
  useLandingHashScroll(props.pathnameMatch);
  return <>{props.children}</>;
}
