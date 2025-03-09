// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs'; // Ensure Node.js runtime

const { handlers } = NextAuth(authOptions);

export async function GET(req: NextRequest, { params }: { params: Promise<{ nextauth: string[] }> }) {
  const resolvedParams = await params; // Await dynamic params
  return handlers.GET(req, { params: resolvedParams });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ nextauth: string[] }> }) {
  const resolvedParams = await params; // Await dynamic params
  return handlers.POST(req, { params: resolvedParams });
}