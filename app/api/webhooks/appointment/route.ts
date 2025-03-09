import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendFeedbackEmail } from "@/lib/email";

const appointmentSchema = z.object({
  companyId: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  date: z.string().datetime(),
  provider: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyId, customerName, customerEmail, date, provider } = appointmentSchema.parse(body);

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        webhookUrls: {
          where: { provider },
        },
      },
    });

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    // Verify webhook URL is configured for this provider
    if (company.webhookUrls.length === 0) {
      return NextResponse.json(
        { error: "Provider not configured" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        companyId,
        customerName,
        customerEmail,
        date: new Date(date),
      },
    });

    // Send feedback request email
    await sendFeedbackEmail({
      to: customerEmail,
      customerName,
      companyName: company.name,
      appointmentId: appointment.id,
      template: company.emailTemplate || "",
      subject: company.emailSubject || "",
    });

    return NextResponse.json(appointment);
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