import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const feedbackSchema = z.object({
  appointmentId: z.string(),
  score: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { appointmentId, score, comment } = feedbackSchema.parse(body);

    // Get appointment with existing feedback
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { 
        company: true,
        feedback: true
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // If feedback already exists, return error
    if (appointment.feedback) {
      return NextResponse.json(
        { error: "Feedback already submitted for this appointment" },
        { status: 400 }
      );
    }

    // Create or get customer record
    const customer = await prisma.customer.upsert({
      where: {
        email_companyId: {
          email: appointment.customerEmail,
          companyId: appointment.companyId,
        },
      },
      create: {
        companyId: appointment.companyId,
        name: appointment.customerName,
        email: appointment.customerEmail,
      },
      update: {},
    });

    // Create feedback
    const feedback = await prisma.feedback.create({
      data: {
        appointmentId,
        companyId: appointment.companyId,
        customerId: customer.id,
        score,
        comment,
        redirectedToGoogle: score >= 4,
      },
    });

    // Update appointment to mark feedback as sent
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { feedbackSent: true },
    });

    // If score is less than 4 and company has notification enabled, send email
    if (score < 4 && appointment.company.notifyOnNegative && appointment.company.notifyEmail) {
      // Send notification email using SendGrid (implement this)
    }

    return NextResponse.json(feedback);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error creating feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}