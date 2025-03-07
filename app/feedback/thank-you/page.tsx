import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";

// Define the searchParams interface
interface SearchParams {
  companyName?: string;
  score?: string;
  appointmentId?: string;
}

// Define the page props interface
interface ThankYouPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  // Await the searchParams Promise to resolve query parameters
  const resolvedSearchParams = await searchParams;
  const { companyName, score: scoreStr, appointmentId } = resolvedSearchParams;
  const score = scoreStr ? parseInt(scoreStr, 10) : null;

  // Optionally fetch appointment data if appointmentId is provided
  const appointment = appointmentId
    ? await prisma.appointment.findUnique({
        where: { id: appointmentId },
        include: { 
          company: {
            include: { feedbackTheme: true }
          }
        },
      })
    : null;

  // Use companyName from query params or fall back to appointment data
  const displayCompanyName = companyName || appointment?.company.name || "us";
  const theme = appointment?.company.feedbackTheme;

  return (
    <div 
      className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
      style={{
        "--primary": theme?.primaryColor || "#2563eb",
        "--accent": theme?.accentColor || "#1d4ed8",
      } as React.CSSProperties}
    >
      <div className="max-w-md mx-auto text-center space-y-6">
        {theme?.logo && (
          <div className="mb-8">
            <img 
              src={theme.logo} 
              alt={displayCompanyName}
              className="h-12 mx-auto"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-tight">
          Thank You for Your Feedback!
        </h1>
        <p className="text-muted-foreground">
          We appreciate your input and will use it to improve our services at {displayCompanyName}.
        </p>

        {score !== null && (
          <div className="flex items-center justify-center gap-1">
            <p className="text-sm font-medium">Your rating:</p>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < score
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <p>You can close this page or return to our site.</p>
          {appointment?.company.website && (
            <a
              href={appointment.company.website}
              className="text-primary hover:underline"
            >
              Visit {displayCompanyName}
            </a>
          )}
        </div>
      </div>
      {theme?.customCss && (
        <style dangerouslySetInnerHTML={{ __html: theme.customCss }} />
      )}
    </div>
  );
}