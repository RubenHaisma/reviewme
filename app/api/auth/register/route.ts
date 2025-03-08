import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/email";
import { generateVerificationToken } from "@/lib/tokens";
import isURL from "validator/lib/isURL";

const registerSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  companyWebsite: z.string().refine((url) => !url || isURL(url), {
    message: "Please enter a valid URL",
  }),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  acceptDataProcessing: z.boolean().refine((val) => val === true, {
    message: "You must accept the data processing agreement",
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyName, companyWebsite, email, password, acceptTerms, acceptDataProcessing } = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create verification token
    const verificationToken = await generateVerificationToken(email);

    // Create company and unverified user in a transaction
    const result = await prisma.$transaction(async (tx: {
        company: { create: (arg0: { data: { name: string; website: string | null; remainingFreeCustomers: number; }; }) => any; }; user: {
          create: (arg0: {
            data: {
              email: string; password: string; companyId: any; role: string; emailVerified: null; // User starts as unverified
              acceptedTerms: boolean; acceptedDataProcessing: boolean; acceptedTermsAt: Date; acceptedDataProcessingAt: Date;
            };
          }) => any;
        };
      }) => {
      const company = await tx.company.create({
        data: {
          name: companyName,
          website: companyWebsite || null,
          remainingFreeCustomers: 20,
        },
      });

      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          companyId: company.id,
          role: "ADMIN",
          emailVerified: null, // User starts as unverified
          acceptedTerms: acceptTerms,
          acceptedDataProcessing: acceptDataProcessing,
          acceptedTermsAt: new Date(),
          acceptedDataProcessingAt: new Date(),
        },
      });

      return { company, user };
    });

    // Send verification email
    await sendVerificationEmail(
      email,
      verificationToken.token
    );

    return NextResponse.json({
      success: true,
      message: "Verification email sent",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}