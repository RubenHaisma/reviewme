import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log('Middleware Token:', token);

  const isAuth = !!token;
  const isAuthPage =
    req.nextUrl.pathname.startsWith('/auth/login') ||
    req.nextUrl.pathname.startsWith('/auth/register');

  if (isAuthPage && isAuth) {
    console.log('Authenticated user on auth page, redirecting to /dashboard');
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!isAuth && req.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('Unauthenticated user on dashboard, redirecting to /auth/login');
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('callbackUrl', new URL('/dashboard', req.url).toString());
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/login', '/auth/register'],
};