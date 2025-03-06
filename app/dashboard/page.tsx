import getServerSession from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { DashboardOverview } from "@/components/dashboard/overview";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.companyId) {
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