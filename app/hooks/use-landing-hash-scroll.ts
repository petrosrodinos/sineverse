"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useLandingHashScroll(matchPathname: string) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== matchPathname) return;

    const id = window.location.hash.slice(1);

    if (!id) return;

    const frame = requestAnimationFrame(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, matchPathname]);
}
