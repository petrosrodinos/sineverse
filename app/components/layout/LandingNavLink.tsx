"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type LandingNavLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function LandingNavLink({ href, className, children }: LandingNavLinkProps) {
  const pathname = usePathname();
  const isLandingHash = href.startsWith("/#") && href.length > 2;
  const hash = isLandingHash ? href.slice(2) : "";

  const scrollToId = () => {
    const el = document.getElementById(hash);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${hash}`);
  };

  if (isLandingHash) {
    return (
      <NextLink
        href={href}
        className={className}
        scroll={pathname !== "/"}
        onClick={(e) => {
          if (pathname === "/") {
            e.preventDefault();
            scrollToId();
          }
        }}
      >
        {children}
      </NextLink>
    );
  }

  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
}
