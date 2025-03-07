import { NextResponse } from "next/server";
import { headers } from "next/headers";
import {
  handleVertiMartWebhook,
  verifyVertiMartWebhook,
} from "@/lib/integrations/vertimart";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = (await headers()).get("x-vertimart-signature") || "";

    // Verify webhook signature
    const isValid = await verifyVertiMartWebhook(signature, body);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const data = JSON.parse(body);

    // Find company by webhook URL
    const webhook = await prisma.webhookUrl.findFirst({
      where: {
        provider: "vertimart",
        url: {
          contains: req.url,
        },
      },
      include: {
        company: true,
      },
    });

    if (!webhook) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    // Process the webhook
    const appointment = await handleVertiMartWebhook(
      webhook.company.id,
      data
    );

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error processing VertiMart webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}