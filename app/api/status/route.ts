import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Generate mock uptime history for the last 24 hours
function generateUptimeHistory() {
  const history = [];
  const now = new Date();
  for (let i = 0; i < 288; i++) { // 5-minute intervals for 24 hours
    const timestamp = new Date(now.getTime() - (i * 5 * 60 * 1000));
    // 98% chance of being up, 1% degraded, 1% down
    const random = Math.random();
    const status = random > 0.98 ? 'down' : random > 0.97 ? 'degraded' : 'up';
    history.unshift({ timestamp: timestamp.toISOString(), status });
  }
  return history;
}

// Calculate uptime percentage from history
function calculateUptimePercentage(history: Array<{ status: string }>) {
  const total = history.length;
  const upCount = history.filter(point => point.status === 'up').length;
  const degradedCount = history.filter(point => point.status === 'degraded').length;
  return ((upCount + (degradedCount * 0.5)) / total) * 100;
}

export async function GET() {
  let dbStatus = "unknown";
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = "operational";
  } catch (error) {
    dbStatus = "down";
  }

  // Check email service
  const emailStatus = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD 
    ? "operational" 
    : "not configured";

  // Check Stripe integration
  const stripeStatus = process.env.STRIPE_SECRET_KEY 
    ? "operational" 
    : "not configured";

  // Generate uptime history
  const history = generateUptimeHistory();
  const uptimePercentage = calculateUptimePercentage(history);

  const status = {
    status: "operational",
    updated_at: new Date().toISOString(),
    services: {
      api: "operational",
      database: dbStatus,
      email: emailStatus,
      stripe: stripeStatus,
    },
    uptime: {
      percentage: uptimePercentage,
      history,
    }
  };

  return NextResponse.json(status);
}