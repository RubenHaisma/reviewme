import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import DashboardClient from '@/components/dashboard/DashboardClient';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.companyId) {
    redirect('/auth/login');
  }

  try {
    const [recentFeedback, stats, company] = await Promise.all([
      prisma.feedback.findMany({
        where: { companyId: session.user.companyId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { appointment: true },
      }),
      prisma.feedback.groupBy({
        by: ['score'],
        where: { companyId: session.user.companyId },
        _count: true,
      }),
      prisma.company.findUnique({
        where: { id: session.user.companyId },
        select: {
          remainingFreeCustomers: true,
          subscriptionStatus: true,
          stripeCustomerId: true,
        },
      }),
    ]);

    const totalCustomers = 20 - (company?.remainingFreeCustomers || 0);
    const usagePercentage = (totalCustomers / 20) * 100;

    const formattedFeedback = recentFeedback.map((item) => ({
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

    return (
      <DashboardClient
        feedback={formattedFeedback}
        stats={stats}
        company={company}
        totalCustomers={totalCustomers}
        usagePercentage={usagePercentage}
      />
    );
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return <div>Error loading dashboard data</div>;
  }
}