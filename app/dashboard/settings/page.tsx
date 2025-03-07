import { auth, authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SettingsForm } from "@/components/dashboard/settings-form";

// Define custom session type based on your authOptions
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

export default async function SettingsPage() {
  const session = (await auth()) as CustomSession | null;

  // Check if session and companyId exist
  if (!session || !session.user || !session.user.companyId) {
    redirect("/auth/register");
  }

  const company = await prisma.company.findUnique({
    where: { id: session.user.companyId.toString() },
    include: {
      webhookUrls: true,
    },
  });

  if (!company) {
    redirect("/auth/register");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Company Settings</h1>
      <SettingsForm company={{...company, webhookUrls: company.webhookUrls}} />
    </div>
  );
}