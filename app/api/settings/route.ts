import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// Define the settings schema with flexible validation
const settingsSchema = z.object({
  googleReviewLink: z.string().url().nullable().optional(),
  notifyEmail: z.string().email().nullable().optional(),
  notifyOnNegative: z.boolean().optional(),
  emailTemplate: z.string().nullable().optional(),
  emailSubject: z.string().nullable().optional(),
  webhookUrl: z.string().url().nullable().optional().or(z.literal("")),
  theme: z
    .object({
      primaryColor: z.string().optional(),
      accentColor: z.string().optional(),
      logo: z.string().nullable().optional(),
      customCss: z.string().nullable().optional(),
    })
    .optional(),
});

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();

    // Check authentication and authorization
    if (!session?.user?.companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Convert companyId to string (it’s guaranteed to be non-null here)
    const companyIdStr = session.user.companyId.toString();

    const body = await req.json();
    console.log("Received body:", body);

    // Parse and validate the request body
    const parsedData = settingsSchema.parse(body);
    const {
      googleReviewLink,
      notifyEmail,
      notifyOnNegative,
      emailTemplate,
      emailSubject,
      webhookUrl,
      theme,
    } = parsedData;

    // Start a transaction to ensure atomic updates
    const [updatedCompany] = await prisma.$transaction(async (tx) => {
      // Handle webhook URL
      if (webhookUrl === "") {
        // Delete existing webhook URL if empty string is provided
        await tx.webhookUrl.deleteMany({
          where: {
            companyId: companyIdStr, // Use string version
            provider: "default",
          },
        });
      } else if (webhookUrl) {
        // Upsert webhook URL if provided
        await tx.webhookUrl.upsert({
          where: {
            provider_companyId: {
              provider: "default",
              companyId: companyIdStr, // Use string version
            },
          },
          create: {
            provider: "default",
            url: webhookUrl,
            companyId: companyIdStr, // Use string version
          },
          update: {
            url: webhookUrl,
          },
        });
      }

      // Handle theme updates
      if (theme) {
        await tx.feedbackTheme.upsert({
          where: { companyId: companyIdStr }, // Use string version
          create: {
            companyId: companyIdStr, // Use string version
            primaryColor: theme.primaryColor || "#2563eb",
            accentColor: theme.accentColor || "#1d4ed8",
            logo: theme.logo ?? null,
            customCss: theme.customCss ?? null,
          },
          update: {
            primaryColor: theme.primaryColor || "#2563eb",
            accentColor: theme.accentColor || "#1d4ed8",
            logo: theme.logo ?? null,
            customCss: theme.customCss ?? null,
          },
        });
      }

      // Update company settings
      const company = await tx.company.update({
        where: { id: companyIdStr }, // Use string version
        data: {
          googleReviewLink: googleReviewLink ?? null,
          notifyEmail: notifyEmail ?? null,
          notifyOnNegative: notifyOnNegative ?? false,
          emailTemplate: emailTemplate ?? null,
          emailSubject: emailSubject ?? null,
        },
        include: {
          webhookUrls: {
            where: { provider: "default" },
          },
          feedbackTheme: true,
        },
      });

      return [company];
    });

    // Return the updated company data with included relations
    return NextResponse.json(updatedCompany);
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error.errors);
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    // Handle Prisma or other unexpected errors
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";