import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const feedbackLinkSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email address"),
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
    const { customerName, customerEmail } = feedbackLinkSchema.parse(body);

    // Create appointment record
    const appointment = await prisma.appointment.create({
      data: {
        companyId: session.user.companyId,
        customerName,
        customerEmail,
        date: new Date(),
      },
    });

    const feedbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/feedback/${appointment.id}`;

    return NextResponse.json({ 
      appointment,
      feedbackUrl 
    });
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