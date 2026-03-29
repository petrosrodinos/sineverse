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
  const pathHashMatch = href.match(/^([^#]+)#(.+)$/);

  if (pathHashMatch) {
    const targetPath = pathHashMatch[1];
    const hash = pathHashMatch[2];

    const scrollToId = () => {
      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `${targetPath}#${hash}`);
    };

    return (
      <NextLink
        href={href}
        className={className}
        scroll={pathname !== targetPath}
        onClick={(e) => {
          if (pathname === targetPath) {
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
