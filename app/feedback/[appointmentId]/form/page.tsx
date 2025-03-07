import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FeedbackForm } from "@/components/feedback/form";

export default async function FeedbackFormPage({
  params,
  searchParams,
}: {
  params: { appointmentId: string };
  searchParams: { score?: string };
}) {
  const score = parseInt(searchParams.score || "", 10);
  
  if (!score || score >= 4) {
    redirect(`/feedback/${params.appointmentId}`);
  }

  const appointment = await prisma.appointment.findUnique({
    where: { id: params.appointmentId },
    include: { 
      company: {
        include: { feedbackTheme: true }
      }
    },
  });

  if (!appointment) {
    notFound();
  }

  return (
    <div 
      className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8"
      style={{
        "--primary": appointment.company.feedbackTheme?.primaryColor || "#2563eb",
        "--accent": appointment.company.feedbackTheme?.accentColor || "#1d4ed8",
      } as React.CSSProperties}
    >
      <div className="max-w-md mx-auto">
        {appointment.company.feedbackTheme?.logo && (
          <div className="text-center mb-8">
            <img 
              src={appointment.company.feedbackTheme.logo} 
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
      {appointment.company.feedbackTheme?.customCss && (
        <style dangerouslySetInnerHTML={{ 
          __html: appointment.company.feedbackTheme.customCss 
        }} />
      )}
    </div>
  );
}