import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuth = !!token;
  const isAuthPage =
    req.nextUrl.pathname.startsWith('/auth/login') ||
    req.nextUrl.pathname.startsWith('/auth/register');

  // Redirect authenticated users away from auth pages
  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Protect dashboard routes
  if (!isAuth && req.nextUrl.pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/login',
    '/auth/register',
    '/api/auth/:path*'
  ],
};