import { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, UserRole } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import type { Adapter } from "next-auth/adapters";
import type { DefaultSession } from "next-auth";

// Single module augmentation for "next-auth"
declare module "next-auth" {
  interface User {
    id: string; // Required to match Prisma and adapter
    name?: string | null;
    email: string;
    image?: string | null;
    role: UserRole;
    companyId?: string | null;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
      companyId?: string | null;
    } & DefaultSession["user"];
  }
}

// Extend the JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    companyId?: string | null;
  }
}

const prisma = new PrismaClient();

// Custom adapter to include role and companyId
const customPrismaAdapter = (prisma: PrismaClient): Adapter => {
  const adapter = PrismaAdapter(prisma);

  const createUser = async (data: any) => {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        emailVerified: data.emailVerified,
        role: data.role || "USER",
        companyId: data.companyId || null,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      role: user.role,
      companyId: user.companyId,
    };
  };

  const getUser = async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      role: user.role,
      companyId: user.companyId,
    };
  };

  const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      role: user.role,
      companyId: user.companyId,
    };
  };

  const getUserByAccount = async (providerAccountId: { provider: string; providerAccountId: string }) => {
    const account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: providerAccountId.provider,
          providerAccountId: providerAccountId.providerAccountId,
        },
      },
      include: { user: true },
    });
    const user = account?.user;
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      role: user.role,
      companyId: user.companyId,
    };
  };

  return {
    ...adapter,
    createUser,
    getUser,
    getUserByEmail,
    getUserByAccount,
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
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Ongeldige inloggegevens");
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
          throw new Error("Ongeldige inloggegevens");
        }

        if (!user.emailVerified) {
          throw new Error("E-mailadres is nog niet geverifieerd. Controleer je inbox.");
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isCorrectPassword) {
          throw new Error("Ongeldige inloggegevens");
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
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
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
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.companyId = user.companyId;
      }
      return token;
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);