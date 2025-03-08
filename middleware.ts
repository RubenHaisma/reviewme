import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log('Middleware Token:', token); // Debug token presence
  const isAuth = !!token;

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/auth/login") ||
    req.nextUrl.pathname.startsWith("/auth/register");

  if (isAuthPage && isAuth) {
    console.log('Redirecting authenticated user to /dashboard');
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!isAuth && req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log('Redirecting unauthenticated user to /auth/login');
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/auth/register"],
};