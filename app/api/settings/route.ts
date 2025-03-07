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

    if (!session?.user?.companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const companyIdStr = session.user.companyId.toString();
    const body = await req.json();
    console.log("Received body:", JSON.stringify(body, null, 2));

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

    const [updatedCompany] = await prisma.$transaction(async (tx) => {
      // Handle webhook URL
      if (webhookUrl === "") {
        await tx.webhookUrl.deleteMany({
          where: {
            companyId: companyIdStr,
            provider: "default",
          },
        });
      } else if (webhookUrl) {
        await tx.webhookUrl.upsert({
          where: {
            provider_companyId: {
              provider: "default",
              companyId: companyIdStr,
            },
          },
          create: {
            provider: "default",
            url: webhookUrl,
            companyId: companyIdStr,
          },
          update: {
            url: webhookUrl,
          },
        });
      }

      // Handle theme updates
      let updatedTheme = null;
      if (theme && Object.keys(theme).length > 0) {
        updatedTheme = await tx.feedbackTheme.upsert({
          where: { companyId: companyIdStr },
          create: {
            companyId: companyIdStr,
            primaryColor: theme.primaryColor ?? "#2563eb", // Use ?? to avoid overriding falsy valid values
            accentColor: theme.accentColor ?? "#1d4ed8",   // Use ?? instead of ||
            logo: theme.logo ?? null,
            customCss: theme.customCss ?? null,
          },
          update: {
            primaryColor: theme.primaryColor ?? "#2563eb",
            accentColor: theme.accentColor ?? "#1d4ed8",
            logo: theme.logo ?? null,
            customCss: theme.customCss ?? null,
          },
        });
      }

      // Update company settings
      const company = await tx.company.update({
        where: { id: companyIdStr },
        data: {
          googleReviewLink: googleReviewLink ?? null,
          notifyEmail: notifyEmail ?? null,
          notifyOnNegative: notifyOnNegative ?? false,
          emailTemplate: emailTemplate ?? null,
          emailSubject: emailSubject ?? null,
        },
        include: {
          webhookUrls: { where: { provider: "default" } },
          feedbackTheme: true,
        },
      });

      return [company];
    });

    return NextResponse.json(updatedCompany);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation errors:", JSON.stringify(error.errors, null, 2));
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";