import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WebhookUrlForm } from "@/components/dashboard/webhook-url-form";

interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
  companyId: string | null;
}

interface CustomSession extends Record<string, unknown> {
  user?: CustomUser;
}

export default async function IntegrationsPage() {
  const session = (await auth()) as CustomSession | null;

  if (!session?.user?.companyId) {
    redirect("/auth/register");
  }

  const webhookUrls = await prisma.webhookUrl.findMany({
    where: { companyId: session.user.companyId },
  });

  const integrations = [
    {
      id: "vertimart",
      name: "VertiMart",
      description: "Connect with VertiMart's booking system to automatically collect feedback after appointments.",
      icon: "/integrations/vertimart-logo.png",
      connected: webhookUrls.some(webhook => webhook.provider === "vertimart"),
      docs: "/docs/integrations/vertimart",
    },
    {
      id: "calendly",
      name: "Calendly",
      description: "Integrate with Calendly to send feedback requests after scheduled meetings.",
      icon: "/integrations/calendly-logo.png",
      connected: webhookUrls.some(webhook => webhook.provider === "calendly"),
      docs: "/docs/integrations/calendly",
      comingSoon: true,
    },
    {
      id: "acuity",
      name: "Acuity Scheduling",
      description: "Connect your Acuity Scheduling account to automate feedback collection.",
      icon: "/integrations/acuity-logo.png",
      connected: webhookUrls.some(webhook => webhook.provider === "acuity"),
      docs: "/docs/integrations/acuity",
      comingSoon: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Integrations</h1>
        <p className="text-muted-foreground">
          Connect your booking software to automate feedback collection
        </p>
      </div>

      <div className="grid gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg border p-2">
                <img
                  src={integration.icon}
                  alt={`${integration.name} logo`}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{integration.name}</h3>
                  {integration.comingSoon && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {integration.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {integration.connected ? (
                  <Button variant="outline" className="w-[100px]">
                    Connected
                  </Button>
                ) : integration.comingSoon ? (
                  <Button disabled className="w-[100px]">
                    Coming Soon
                  </Button>
                ) : (
                  <Button className="w-[100px]">Connect</Button>
                )}
              </div>
            </div>

            {integration.connected && integration.id === "vertimart" && (
              <div className="mt-4 border-t pt-4">
                <WebhookUrlForm
                  provider="vertimart"
                  initialUrl={webhookUrls.find(w => w.provider === "vertimart")?.url}
                />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}