import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter'; // Correct v4 import
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
          throw new Error('Please verify your email address first. Check your inbox.');
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isCorrectPassword) {
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
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development', // Debug only in dev
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.companyId = user.companyId;
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
      console.log('Redirect Callback:', { url, baseUrl });
      return url.startsWith('/') ? `${baseUrl}${url}` : url;
    },
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // True in production (HTTPS)
        sameSite: 'lax',
        path: '/',
        domain: process.env.NODE_ENV === 'production' ? '.raatum.com' : undefined,
      },
    },
  },
};

export default NextAuth(authOptions);