import { auth } from "@/lib/auth"; // Assuming authOptions is exported if needed
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SettingsForm } from "@/components/dashboard/settings-form";

// Export this type if needed elsewhere, or keep it here
interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
  companyId: string | null; // Changed to string to match Prisma schema
}

interface CustomSession {
  user?: CustomUser;
}

export default async function SettingsPage() {
  const session = await auth() as CustomSession | null;

  // Check if session and companyId exist
  if (!session?.user?.companyId) {
    redirect("/auth/register"); // Or consider a different route like "/setup"
  }

  const companyId = session.user.companyId;

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: {
      webhookUrls: true,
      feedbackTheme: true, // Add this to fetch feedbackTheme
    },
  });

  if (!company) {
    redirect("/auth/register"); // Or "/setup" if company creation is needed
  }

  // Ensure feedbackTheme is included in the props passed to SettingsForm
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Company Settings</h1>
      <SettingsForm company={{ ...company, webhookUrls: company.webhookUrls, feedbackTheme: company.feedbackTheme }} />
    </div>
  );
}