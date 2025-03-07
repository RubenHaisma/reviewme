import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const settingsSchema = z.object({
  googleReviewLink: z.string().url().nullable().optional(),
  notifyEmail: z.string().email().nullable().optional(),
  notifyOnNegative: z.boolean().optional(),
  emailTemplate: z.string().nullable().optional(),
  emailSubject: z.string().nullable().optional(),
  webhookUrls: z
    .array(
      z.object({
        id: z.string().optional(),
        provider: z.string(),
        url: z.string().url(),
      })
    )
    .optional(),
  feedbackTheme: z
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

    const companyId = session.user.companyId;
    const body = await req.json();
    console.log("Received body:", JSON.stringify(body, null, 2));

    const parsedData = settingsSchema.parse(body);
    const {
      googleReviewLink,
      notifyEmail,
      notifyOnNegative,
      emailTemplate,
      emailSubject,
      webhookUrls,
      feedbackTheme,
    } = parsedData;

    const updatedCompany = await prisma.$transaction(async (tx) => {
      // Handle webhook URLs
      if (webhookUrls !== undefined) {
        if (webhookUrls.length === 0) {
          await tx.webhookUrl.deleteMany({ where: { companyId } });
        } else {
          await tx.webhookUrl.deleteMany({
            where: {
              companyId,
              NOT: { id: { in: webhookUrls.filter(w => w.id).map(w => w.id!) } },
            },
          });
          await Promise.all(
            webhookUrls.map(webhook =>
              tx.webhookUrl.upsert({
                where: {
                  provider_companyId: {
                    provider: webhook.provider || "default",
                    companyId,
                  },
                },
                create: {
                  provider: webhook.provider || "default",
                  url: webhook.url,
                  companyId,
                },
                update: { url: webhook.url },
              })
            )
          );
        }
      }

      // Handle feedback theme updates
      if (feedbackTheme && Object.keys(feedbackTheme).length > 0) {
        await tx.feedbackTheme.upsert({
          where: { companyId },
          create: {
            companyId,
            primaryColor: feedbackTheme.primaryColor || "#2563eb",
            accentColor: feedbackTheme.accentColor || "#1d4ed8",
            logo: feedbackTheme.logo ?? null,
            customCss: feedbackTheme.customCss ?? null,
          },
          update: {
            ...(feedbackTheme.primaryColor && { primaryColor: feedbackTheme.primaryColor }),
            ...(feedbackTheme.accentColor && { accentColor: feedbackTheme.accentColor }),
            ...(feedbackTheme.logo !== undefined && { logo: feedbackTheme.logo }),
            ...(feedbackTheme.customCss !== undefined && { customCss: feedbackTheme.customCss }),
          },
        });
      }

      // Update company settings
      const company = await tx.company.update({
        where: { id: companyId },
        data: {
          googleReviewLink,
          notifyEmail,
          notifyOnNegative,
          emailTemplate,
          emailSubject,
        },
        include: {
          webhookUrls: true,
          feedbackTheme: true,
        },
      });

      return company;
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const runtime = "nodejs";