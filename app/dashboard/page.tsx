import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardOverview } from "@/components/dashboard/overview";
import { FeedbackLinkGenerator } from "@/components/dashboard/feedback-link-generator";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
  companyId: string | null;
}

interface CustomSession extends Record<string, unknown> {
  user?: CustomUser;
}

export default async function DashboardPage() {
  const session = (await auth()) as CustomSession | null;

  if (!session?.user?.companyId) {
    redirect("/auth/register");
  }

  const [recentFeedback, stats, company] = await Promise.all([
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
    prisma.company.findUnique({
      where: { id: session.user.companyId },
      select: { 
        remainingFreeCustomers: true, 
        subscriptionStatus: true,
        stripeCustomerId: true
      },
    }),
  ]);

  const totalCustomers = 20 - (company?.remainingFreeCustomers || 0);
  const usagePercentage = (totalCustomers / 20) * 100;

  // Transform feedback data to match FeedbackItem type
  const formattedFeedback = recentFeedback.map(item => ({
    ...item,
    comment: item.comment ?? undefined,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    appointment: {
      ...item.appointment,
      createdAt: item.appointment.createdAt.toISOString(),
      updatedAt: item.appointment.updatedAt.toISOString(),
      date: item.appointment.date.toISOString()
    }
  }));

  return (
    <div className="space-y-8">
      {company && !company.subscriptionStatus && company.remainingFreeCustomers !== null && (
        <Card className="p-6 bg-primary/5 border-primary">
          <h3 className="text-lg font-semibold text-primary mb-2">
            Free Tier Usage
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{company.remainingFreeCustomers} customers remaining</span>
              <span>{totalCustomers}/20 used</span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
          </div>
          {company.remainingFreeCustomers <= 5 && (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                {company.remainingFreeCustomers === 0 
                  ? "You've used all your free feedback responses. Upgrade now to continue collecting feedback."
                  : `You're approaching your free tier limit. Only ${company.remainingFreeCustomers} feedback responses remaining.`
                }
              </p>
              <Link href="/dashboard/billing">
                <Button className="w-full">
                  {company.remainingFreeCustomers === 0 ? "Upgrade Now" : "View Plans"}
                </Button>
              </Link>
            </div>
          )}
        </Card>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <FeedbackLinkGenerator disabled={company?.remainingFreeCustomers === 0 && !company?.subscriptionStatus} />
        <DashboardOverview feedback={formattedFeedback} stats={stats} />
      </div>
    </div>
  );
}