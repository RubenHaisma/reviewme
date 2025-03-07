import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// Define the settings schema with more flexible validation
const settingsSchema = z.object({
  googleReviewLink: z.string().url().nullable().optional(),
  notifyEmail: z.string().email().nullable().optional(),
  notifyOnNegative: z.boolean().optional(),
  emailTemplate: z.string().nullable().optional(),
  emailSubject: z.string().nullable().optional(),
  webhookUrl: z.string().url().nullable().optional(),
  theme: z
    .object({
      primaryColor: z.string().optional(), // Make optional to allow partial updates
      accentColor: z.string().optional(),  // Make optional to allow partial updates
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

    const body = await req.json();
    console.log("Received body:", body); // Debug log

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
    const [company, feedbackTheme] = await prisma.$transaction([
      // Update company settings
      prisma.company.update({
        where: { id: session.user.companyId },
        data: {
          googleReviewLink,
          notifyEmail,
          notifyOnNegative,
          emailTemplate,
          emailSubject,
          webhookUrls: webhookUrl
            ? {
                upsert: {
                  where: {
                    provider_companyId: {
                      provider: "default",
                      companyId: session.user.companyId,
                    },
                  },
                  create: {
                    provider: "default",
                    url: webhookUrl,
                  },
                  update: {
                    url: webhookUrl,
                  },
                },
              }
            : undefined,
        },
      }),

      // Update feedback theme only if theme is provided and has at least one field
      theme && Object.keys(theme).length > 0
        ? prisma.feedbackTheme.upsert({
            where: { companyId: session.user.companyId },
            create: {
              companyId: session.user.companyId,
              primaryColor: theme.primaryColor,
              accentColor: theme.accentColor,
              logo: theme.logo,
              customCss: theme.customCss,
            },
            update: {
              primaryColor: theme.primaryColor,
              accentColor: theme.accentColor,
              logo: theme.logo,
              customCss: theme.customCss,
            },
          })
        : prisma.feedbackTheme.findUnique({
            where: { companyId: session.user.companyId },
          }), // No-op if no theme provided or empty
    ]);

    // Return the updated company data
    return NextResponse.json({
      ...company,
      feedbackTheme: theme && Object.keys(theme).length > 0 ? feedbackTheme : undefined,
    });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error.errors); // Log specific validation issues
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

export const runtime = "nodejs"; // Explicitly specify runtime