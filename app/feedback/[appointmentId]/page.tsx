import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StarRating } from "@/components/feedback/star-rating";
import { FeedbackForm } from "@/components/feedback/form";

export default async function FeedbackPage({
  params,
}: {
  params: { appointmentId: string };
}) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: params.appointmentId },
    include: { company: true },
  });

  if (!appointment) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
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
    </div>
  );
}