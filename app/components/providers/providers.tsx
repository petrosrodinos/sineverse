"use client";

import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react"
import { QueryProvider } from "./query-provider";
import { HeroUiProviders } from "./hero-ui";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}


export function Providers({ children, themeProps }: ProvidersProps) {

  return (
     <HeroUiProviders>
       <NextThemesProvider {...themeProps}>
        <QueryProvider>
          <SessionProvider>
              {children}
          </SessionProvider>
        </QueryProvider>
      </NextThemesProvider>
     </HeroUiProviders>
  );
}
