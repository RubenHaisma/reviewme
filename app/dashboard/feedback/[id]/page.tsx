import { auth, authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Star, Mail, Phone } from "lucide-react";
import { FeedbackResponse } from "@/components/dashboard/feedback-response";

interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
  companyId: number | null;
}

interface CustomSession extends Record<string, unknown> {
  user?: CustomUser;
}

export default async function FeedbackDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = (await auth()) as CustomSession | null;

  if (!session?.user?.companyId) {
    redirect("/auth/register");
  }

  const feedback = await prisma.feedback.findUnique({
    where: { 
      id: params.id,
      companyId: session.user.companyId?.toString(),
    },
    include: { 
      appointment: true,
      customer: true,
    },
  });

  if (!feedback) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Feedback Details</h1>
        <p className="text-muted-foreground">
          Received {formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium">{feedback.appointment.customerName}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{feedback.appointment.customerEmail}</span>
              </div>
              {feedback.customer?.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{feedback.customer.phone}</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Rating</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < feedback.score
                      ? "fill-primary stroke-primary"
                      : "stroke-muted-foreground"
                  }`}
                />
              ))}
              <span className="ml-2 text-lg font-semibold">
                {feedback.score}/5
              </span>
            </div>
            {feedback.comment && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Comment:
                </p>
                <p className="mt-1">{feedback.comment}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Response</h2>
        <FeedbackResponse feedback={feedback} />
      </Card>
    </div>
  );
}