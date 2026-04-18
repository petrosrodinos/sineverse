import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { Routes } from "@/config/routes";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isAuthPath = pathname === "/auth" || pathname.startsWith("/auth/");
  const isDashboardPath = pathname.startsWith(Routes.dashboard);

  if (!isAuthPath && !isDashboardPath) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (isAuthPath) {
    if (token) {
      return NextResponse.redirect(new URL(Routes.dashboard, request.url));
    }
    return NextResponse.next();
  }

  if (isDashboardPath) {
    if (!token) {
      const signIn = new URL(Routes.auth.sign_in, request.url);
      signIn.searchParams.set("callbackUrl", pathname + search);
      return NextResponse.redirect(signIn);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/auth/:path*", "/dashboard/:path*"],
};
