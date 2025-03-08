// feedback/[appointmentId]/form/page.tsx
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import FeedbackFormClient from './FeedbackFormClient';

interface Params {
  appointmentId: string;
}

interface SearchParams {
  score?: string;
}

interface FeedbackFormPageProps {
  params: Params;
  searchParams: SearchParams;
}

export default async function FeedbackFormPage({
  params,
  searchParams,
}: FeedbackFormPageProps) {
  const score = parseInt(searchParams.score || '', 10);

  // Validate score early
  if (isNaN(score) || score >= 4) {
    redirect(`/feedback/${params.appointmentId}`);
  }

  const appointment = await prisma.appointment.findUnique({
    where: { id: params.appointmentId },
    include: {
      company: {
        include: { feedbackTheme: true },
      },
    },
  });

  if (!appointment) {
    notFound();
  }

  // Explicitly pass props to the Client Component
  return (
    <FeedbackFormClient
      appointmentId={appointment.id}
      companyName={appointment.company.name}
      initialScore={score}
      theme={appointment.company.feedbackTheme ? {
        ...appointment.company.feedbackTheme,
        logo: appointment.company.feedbackTheme.logo || undefined,
        customCss: appointment.company.feedbackTheme.customCss || undefined,
      } : null}
    />
  );
}