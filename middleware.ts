import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware function
export async function middleware(req: NextRequest) {
  // Get the token using next-auth/jwt
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;

  // Define auth-related paths
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/auth/login") ||
    req.nextUrl.pathname.startsWith("/auth/register");

  // Redirect authenticated users away from auth pages
  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isAuth && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Allow the request to proceed if no redirects are triggered
  return NextResponse.next();
}

// Config to specify which routes the middleware applies to
export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/auth/register"],
};