import { NextResponse } from "next/server";
import { auth } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { sendReviewRequestEmail } from "@/lib/email";
import { z } from "zod";

const requestSchema = z.object({
  clientId: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.companyId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { clientId } = requestSchema.parse(body);

    // Get client and company data
    const [client, company] = await Promise.all([
      prisma.client.findUnique({
        where: { id: clientId },
      }),
      prisma.company.findUnique({
        where: { id: session.user.companyId },
        select: {
          name: true,
          emailTemplate: true,
          emailSubject: true,
        },
      }),
    ]);

    if (!client || !company) {
      return NextResponse.json(
        { error: "Client or company not found" },
        { status: 404 }
      );
    }

    // Create appointment record
    const appointment = await prisma.appointment.create({
      data: {
        companyId: session.user.companyId,
        customerName: client.name,
        customerEmail: client.email,
        date: new Date(),
      },
    });

    // Send review request email
    await sendReviewRequestEmail({
      to: client.email,
      customerName: client.name,
      companyName: company.name,
      appointmentId: appointment.id,
      template: company.emailTemplate,
      subject: company.emailSubject,
    });

    // Update client's last review request date
    await prisma.client.update({
      where: { id: clientId },
      data: { lastReviewRequest: new Date() },
    });

    return NextResponse.json({ success: true });
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