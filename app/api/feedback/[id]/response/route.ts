import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import type { NextRequest } from "next/server";

// Define the params interface
interface Params {
  id: string;
}

// Define the context type with params as a Promise
interface Context {
  params: Promise<Params>;
}

const responseSchema = z.object({
  response: z.string().min(1),
});

export async function POST(req: NextRequest, context: Context) {
  try {
    // Resolve the params Promise
    const params = await context.params;
    const session = await auth();
    
    if (!session?.user?.companyId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { response } = responseSchema.parse(body);

    const feedback = await prisma.feedback.findUnique({
      where: { 
        id: params.id,
        companyId: session.user.companyId,
      },
    });

    if (!feedback) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.feedback.update({
      where: { id: params.id },
      data: { response },
    });

    return NextResponse.json(updated);
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

export const runtime = "nodejs";