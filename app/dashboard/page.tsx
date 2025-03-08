import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import DashboardClient from '@/components/dashboard/DashboardClient';
import { FeedbackItem, StatItem, CompanyData } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

export const dynamic = 'force-dynamic'; // Ensure dynamic rendering to avoid caching issues

export default async function DashboardPage() {
  // Debug the session
  const session = (await auth()) as CustomSession | null;
  console.log('Session:', session);

  // Handle session absence or invalid companyId
  if (!session || !session.user || !session.user.companyId) {
    console.log('Redirecting to /auth/register due to missing session or companyId');
    redirect('/auth/register');
  }

  const companyId = session.user.companyId;

  try {
    const [recentFeedback, stats, company] = await Promise.all([
      prisma.feedback.findMany({
        where: { companyId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { appointment: true },
      }),
      prisma.feedback.groupBy({
        by: ['score'],
        where: { companyId },
        _count: true,
      }),
      prisma.company.findUnique({
        where: { id: companyId },
        select: {
          remainingFreeCustomers: true,
          subscriptionStatus: true,
          stripeCustomerId: true,
        },
      }),
    ]);

    const totalCustomers = 20 - (company?.remainingFreeCustomers || 0);
    const usagePercentage = (totalCustomers / 20) * 100;

    // Transform feedback data to match FeedbackItem type
    const formattedFeedback: FeedbackItem[] = recentFeedback.map((item) => ({
      id: item.id,
      score: item.score,
      comment: item.comment ?? undefined,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      response: item.response ?? null,
      read: item.read ?? false,
      appointment: {
        id: item.appointment.id,
        companyId: item.appointment.companyId,
        customerName: item.appointment.customerName,
        date: item.appointment.date.toISOString(),
        createdAt: item.appointment.createdAt.toISOString(),
        updatedAt: item.appointment.updatedAt.toISOString(),
      },
    }));

    // Transform stats to match StatItem type
    const formattedStats: StatItem[] = stats.map((stat) => ({
      score: stat.score,
      _count: stat._count,
    }));

    // Transform company to match CompanyData type
    const formattedCompany: CompanyData | null = company
      ? {
          remainingFreeCustomers: company.remainingFreeCustomers,
          subscriptionStatus: company.subscriptionStatus,
          stripeCustomerId: company.stripeCustomerId,
        }
      : null;

    return (
      <DashboardClient
        feedback={formattedFeedback}
        stats={formattedStats}
        company={formattedCompany}
        totalCustomers={totalCustomers}
        usagePercentage={usagePercentage}
      />
    );
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6 text-center">
          <h1 className="text-2xl font-bold">Error</h1>
          <p>Failed to load dashboard. Please try again later.</p>
          <Button onClick={() => redirect('/dashboard')}>Retry</Button>
        </Card>
      </div>
    );
  }
}