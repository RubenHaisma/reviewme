import { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient, UserRole } from '@prisma/client';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import type { DefaultSession } from 'next-auth';
import { z } from 'zod';

declare module 'next-auth' {
  interface User {
    role: UserRole;
    companyId?: string | null;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
      companyId?: string | null;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    companyId?: string | null;
  }
}

const prisma = new PrismaClient();

// Define a schema for credentials
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const customPrismaAdapter = (p: PrismaClient): Adapter => {
  const baseAdapter = PrismaAdapter(p) as Adapter;

  return {
    ...baseAdapter,
    async createUser(data) {
      const user = await p.user.create({
        data: {
          email: data.email,
          name: data.name,
          emailVerified: data.emailVerified,
          role: 'USER',
          companyId: null,
        },
      });

      return {
        ...user,
        role: user.role,
        companyId: user.companyId,
      };
    },

    async getUser(id) {
      const user = await p.user.findUnique({ where: { id } });
      if (!user) return null;
      return {
        ...user,
        role: user.role,
        companyId: user.companyId,
      };
    },

    async getUserByEmail(email) {
      const user = await p.user.findUnique({ where: { email } });
      if (!user) return null;
      return {
        ...user,
        role: user.role,
        companyId: user.companyId,
      };
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await p.account.findUnique({
        where: {
          provider_providerAccountId: { provider, providerAccountId },
        },
        include: { user: true },
      });
      if (!account) return null;

      const { user } = account;
      return {
        ...user,
        role: user.role,
        companyId: user.companyId,
      };
    },

    async updateUser(data) {
      const user = await p.user.update({
        where: { id: data.id },
        data: {
          name: data.name,
          email: data.email,
          emailVerified: data.emailVerified,
          image: data.image,
        },
      });
      return {
        ...user,
        role: user.role,
        companyId: user.companyId,
      };
    },
  };
};

export const authOptions: NextAuthConfig = {
  adapter: customPrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsedCredentials = credentialsSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error('Invalid credentials');
        }

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { email },
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
          throw new Error('Invalid credentials');
        }

        if (!user.emailVerified) {
          throw new Error('Please verify your email address first. Check your inbox.');
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
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
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true, // Explicitly trust the host
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.companyId = token.companyId;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
        token.role = user.role;
        token.companyId = user.companyId;
      }
      return token;
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);