// lib/auth.ts
import { NextAuthOptions, getServerSession } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth';

// Extend NextAuth types to match your project
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      role: string;
      companyId?: string | null;
    };
  }

  interface User {
    id: string;
    email?: string | null;
    name?: string | null;
    role: string;
    companyId?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    companyId?: string | null;
    email?: string | null;
    name?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/',
    error: '/auth/login/error',
    newUser: '/auth/register',
    verifyRequest: '/auth/verify-request',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }

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

        if (!user) {
          throw new Error('No user found with this email');
        }

        if (!user.password) {
          throw new Error('Please use the login link sent to your email');
        }

        if (!user.emailVerified) {
          throw new Error('Please verify your email first');
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          companyId: user.companyId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          companyId: user.companyId,
        };
      }
      const dbUser = token.email
        ? await prisma.user.findFirst({
            where: { email: token.email },
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              companyId: true,
            },
          })
        : null;

      if (!dbUser) {
        return token;
      }

      return {
        ...token,
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role,
        companyId: dbUser.companyId,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          email: token.email,
          name: token.name,
          role: token.role,
          companyId: token.companyId,
        };
      }
      return session;
    },
  },
};

// Export NextAuth handlers and auth utilities
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);