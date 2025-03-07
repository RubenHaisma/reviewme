import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClientList } from "@/components/dashboard/client-list";
import { AddClientDialog } from "@/components/dashboard/add-client-dialog";

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

export default async function ClientsPage() {
  const session = (await auth()) as CustomSession | null;

  if (!session?.user?.companyId) {
    redirect("/auth/register");
  }

  const clients = await prisma.client.findMany({
    where: { companyId: session.user.companyId?.toString() },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-muted-foreground">Manage your client list and send review requests</p>
        </div>
        <AddClientDialog />
      </div>

      <div className="flex gap-2">
        <Input 
          placeholder="Search clients..." 
          className="max-w-sm"
        />
      </div>

      <ClientList clients={clients} />
    </div>
  );
}