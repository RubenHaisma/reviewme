import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WebhookTester } from "@/components/admin/webhook-tester";

export default async function AdminWebhooksPage() {
  const webhooks = await prisma.webhookUrl.findMany({
    include: {
      company: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Webhook Testing</h1>
        <p className="text-muted-foreground">Test and monitor webhook integrations</p>
      </div>

      <div className="grid gap-6">
        {webhooks.map((webhook) => (
          <Card key={webhook.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{webhook.company.name}</h3>
                  <p className="text-sm text-muted-foreground">{webhook.provider}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  webhook.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {webhook.status}
                </div>
              </div>
              
              <div className="text-sm">
                <Label>Webhook URL</Label>
                <Input value={webhook.url} readOnly className="mt-1" />
              </div>

              <WebhookTester webhookId={webhook.id} provider={webhook.provider} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}