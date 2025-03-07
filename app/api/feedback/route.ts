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
        company: {
          select: {
            id: true,
            name: true,
            notifyOnNegative: true,
            notifyEmail: true,
            remainingFreeCustomers: true,
            subscriptionStatus: true,
          }
        },
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

    // Check if company has remaining free customers or active subscription
    if (appointment.company.remainingFreeCustomers <= 0 && 
        appointment.company.subscriptionStatus !== 'active') {
      return NextResponse.json(
        { error: "Please upgrade to a paid plan to continue collecting feedback" },
        { status: 403 }
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

    // Start a transaction to ensure data consistency
    const [feedback, updatedCompany] = await prisma.$transaction([
      // Create feedback
      prisma.feedback.create({
        data: {
          appointmentId,
          companyId: appointment.companyId,
          customerId: customer.id,
          score,
          comment,
          redirectedToGoogle: score >= 4,
        },
      }),
      // Update company's remaining free customers if not on paid plan
      prisma.company.update({
        where: { id: appointment.companyId },
        data: appointment.company.subscriptionStatus !== 'active' ? {
          remainingFreeCustomers: {
            decrement: 1
          }
        } : {},
      })
    ]);

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