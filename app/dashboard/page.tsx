import { auth } from "../api/auth/[...nextauth]/route"; // Import from your auth route
import { redirect } from "next/navigation";
import { DashboardOverview } from "@/components/dashboard/overview";
import { prisma } from "@/lib/prisma";

// Custom session type (same as above)
interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
  companyId: number | null;
}

interface CustomSession extends Record<string, unknown> {
  user?: CustomUser;
}

export default async function DashboardPage() {
  const session = (await auth()) as CustomSession | null;

  if (!session || !session.user || !session.user.companyId) {
    redirect("/auth/register");
  }

  const [recentFeedback, stats] = await Promise.all([
    prisma.feedback.findMany({
      where: { companyId: session.user.companyId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { appointment: true },
    }),
    prisma.feedback.groupBy({
      by: ["score"],
      where: { companyId: session.user.companyId },
      _count: true,
    }),
  ]);

  return <DashboardOverview feedback={recentFeedback} stats={stats} />;
}