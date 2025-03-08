import { NextResponse } from "next/server";
import { z } from "zod";

const authSchema = z.object({
  password: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password } = authSchema.parse(body);

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

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