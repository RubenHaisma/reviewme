import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const settingsSchema = z.object({
  googleReviewLink: z.string().url().optional().nullable(),
  notifyEmail: z.string().email().optional().nullable(),
  notifyOnNegative: z.boolean(),
  webhookUrl: z.string().url().optional(),
});

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.companyId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { googleReviewLink, notifyEmail, notifyOnNegative, webhookUrl } = settingsSchema.parse(body);

    const company = await prisma.company.update({
      where: { id: session.user.companyId },
      data: {
        googleReviewLink,
        notifyEmail,
        notifyOnNegative,
        webhookUrls: {
          upsert: {
            where: {
              provider_companyId: {
                provider: "default",
                companyId: session.user.companyId,
              },
            },
            create: {
              provider: "default",
              url: webhookUrl || "",
            },
            update: {
              url: webhookUrl || "",
            },
          },
        },
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}