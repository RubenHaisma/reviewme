import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    const dbStatus = "operational";
  } catch (error) {
    const dbStatus = "down";
  }

  // Check email service
  const emailStatus = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD 
    ? "operational" 
    : "not configured";

  // Check Stripe integration
  const stripeStatus = process.env.STRIPE_SECRET_KEY 
    ? "operational" 
    : "not configured";

  const status = {
    status: "operational",
    updated_at: new Date().toISOString(),
    services: {
      api: "operational",
      database: dbStatus,
      email: emailStatus,
      stripe: stripeStatus,
    }
  };

  return NextResponse.json(status);
}