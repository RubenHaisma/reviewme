// lib/auth.ts
import { NextAuthOptions, getServerSession } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient, UserRole } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DefaultSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';

// Extend the Session and User types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      companyId?: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    role: UserRole;
    companyId?: string | null;
  }
}

// Extend the JWT type
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    companyId?: string | null;
  }
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error('Missing email or password');
          throw new Error('Please provide both email and password');
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            select: {
              id: true,
              email: true,
              name: true,
              password: true,
              role: true,
              companyId: true,
              emailVerified: true,
            },
          });

          if (!user || !user.password) {
            console.error('User not found or no password set:', credentials.email);
            throw new Error('Invalid credentials');
          }

          if (!user.emailVerified) {
            console.error('Email not verified:', credentials.email);
            throw new Error('Please verify your email address first');
          }

          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (!isValidPassword) {
            console.error('Incorrect password for:', credentials.email);
            throw new Error('Invalid credentials');
          }

          console.log('Authorize success:', { id: user.id, email: user.email });
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            companyId: user.companyId,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login/error',
    verifyRequest: '/auth/verify-request',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.companyId = user.companyId;
      }
      if (trigger === 'update' && session) {
        return { ...token, ...session.user };
      }
      console.log('JWT Callback:', token);
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.companyId = token.companyId;
      }
      console.log('Session Callback:', session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      const productionBaseUrl = process.env.NEXTAUTH_URL || 'https://raatum.com';
      console.log('Redirect Callback:', { url, baseUrl, resolvedBaseUrl: productionBaseUrl });
      return url.startsWith('/') ? `${productionBaseUrl}${url}` : url;
    },
  },
  events: {
    async signIn({ user }) {
      if (user.id) {
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable in production temporarily
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        domain: process.env.NODE_ENV === 'production' ? '.raatum.com' : undefined,
      },
    },
  },
};

// Export NextAuth handlers and utilities
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);