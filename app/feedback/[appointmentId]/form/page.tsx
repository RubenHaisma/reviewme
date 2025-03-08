import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import FeedbackFormClient from '@/components/feedback/FeedbackFormClient';

// Define the params and searchParams interfaces
interface Params {
  appointmentId: string;
}

interface SearchParams {
  score?: string;
}

// Define the props type to match Next.js expectations
interface FeedbackFormPageProps {
  params: Promise<Params>; // params as a Promise
  searchParams: Promise<SearchParams>; // searchParams as a Promise
}

export default async function FeedbackFormPage({
  params,
  searchParams,
}: FeedbackFormPageProps) {
  // Resolve both params and searchParams Promises
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const score = parseInt(resolvedSearchParams.score || '', 10);

  // Validate score early
  if (isNaN(score) || score >= 4) {
    redirect(`/feedback/${resolvedParams.appointmentId}`);
  }

  const appointment = await prisma.appointment.findUnique({
    where: { id: resolvedParams.appointmentId },
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
      theme={
        appointment.company.feedbackTheme
          ? {
              ...appointment.company.feedbackTheme,
              logo: appointment.company.feedbackTheme.logo || undefined,
              customCss: appointment.company.feedbackTheme.customCss || undefined,
            }
          : null
      }
    />
  );
}