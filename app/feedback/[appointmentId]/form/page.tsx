import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FeedbackForm } from "@/components/feedback/form";

// Define the params interface
interface Params {
  appointmentId: string;
}

// Define the searchParams interface
interface SearchParams {
  score?: string;
}

// Define the page props interface with both params and searchParams as Promises
interface FeedbackFormPageProps {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}

export default async function FeedbackFormPage({
  params,
  searchParams,
}: FeedbackFormPageProps) {
  // Await both params and searchParams Promises
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const score = parseInt(resolvedSearchParams.score || "", 10);
  
  if (!score || score >= 4) {
    redirect(`/feedback/${resolvedParams.appointmentId}`);
  }

  const appointment = await prisma.appointment.findUnique({
    where: { id: resolvedParams.appointmentId },
    include: { 
      company: {
        include: { feedbackTheme: true }
      }
    },
  });

  if (!appointment) {
    notFound();
  }

  const theme = appointment.company.feedbackTheme;

  return (
    <div 
      className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8"
      style={{
        "--primary": theme?.primaryColor || "#2563eb",
        "--accent": theme?.accentColor || "#1d4ed8",
      } as React.CSSProperties}
    >
      <div className="max-w-md mx-auto">
        {theme?.logo && (
          <div className="text-center mb-8">
            <img 
              src={theme.logo} 
              alt={appointment.company.name}
              className="h-12 mx-auto"
            />
          </div>
        )}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Share Your Feedback
          </h2>
          <p className="mt-2 text-muted-foreground">
            Help us understand how we can improve our service
          </p>
        </div>
        <div className="mt-8">
          <FeedbackForm
            appointmentId={appointment.id}
            companyName={appointment.company.name}
            initialScore={score}
          />
        </div>
      </div>
      {theme?.customCss && (
        <style dangerouslySetInnerHTML={{ __html: theme.customCss }} />
      )}
    </div>
  );
}