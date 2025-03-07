// app/api/auth/[...nextauth]/route.ts
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

// Export the HTTP handlers
export const { GET, POST } = NextAuth(authOptions).handlers;