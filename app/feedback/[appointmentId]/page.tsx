import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StarRating } from "@/components/feedback/star-rating";
import Image from "next/image";

// Define the params interface
interface Params {
  appointmentId: string;
}

// Define the page props interface with params as a Promise
interface FeedbackPageProps {
  params: Promise<Params>;
}

export default async function FeedbackPage({ params }: FeedbackPageProps) {
  // Await the entire params Promise to resolve the dynamic segment value
  const resolvedParams = await params;
  const appointmentId = resolvedParams.appointmentId;
  
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
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
            <Image 
              src={theme.logo} 
              alt={appointment.company.name}
              className="h-12 mx-auto"
              width={48}
              height={48}
            />
          </div>
        )}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            How was your experience with {appointment.company.name}?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Your feedback helps us improve our service
          </p>
        </div>
        <div className="mt-8">
          <StarRating
            appointmentId={appointment.id}
            companyName={appointment.company.name}
            googleReviewLink={appointment.company.googleReviewLink}
          />
        </div>
      </div>
      {theme?.customCss && (
        <style dangerouslySetInnerHTML={{ __html: theme.customCss }} />
      )}
    </div>
  );
}