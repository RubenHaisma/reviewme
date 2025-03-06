import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { SettingsForm } from "@/components/dashboard/settings-form";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.companyId) {
    redirect("/auth/register");
  }

  const company = await prisma.company.findUnique({
    where: { id: session.user.companyId },
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
      <SettingsForm company={company} />
    </div>
  );
}