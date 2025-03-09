'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SAMPLE_PAYLOADS = {
  vertimart: {
    customerName: "John Doe",
    customerEmail: "john@example.com",
    appointmentDate: new Date().toISOString(),
  },
  calendly: {
    event: "invitee.created",
    payload: {
      invitee: {
        name: "John Doe",
        email: "john@example.com",
      },
      event: {
        start_time: new Date().toISOString(),
      },
      status: "completed"
    },
  },
  acuity: {
    action: "appointment.completed",
    appointment: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      datetime: new Date().toISOString(),
      phone: "+1234567890"
    },
  },
  simplybook: {
    event: "booking.completed",
    booking: {
      client_name: "John Doe",
      client_email: "john@example.com",
      client_phone: "+1234567890",
      start_datetime: new Date().toISOString(),
    },
  },
  square: {
    type: "appointment.completed",
    data: {
      customer: {
        given_name: "John",
        family_name: "Doe",
        email_address: "john@example.com",
        phone_number: "+1234567890"
      },
      appointment: {
        start_at: new Date().toISOString(),
      },
    },
  },
};

const WEBHOOK_EXAMPLES = {
  vertimart: `// Example VertiMart webhook handler
const handler = new VertiMartWebhookHandler(companyId);

// Verify webhook signature
const isValid = await handler.verifySignature(signature, payload);

// Process webhook data
await handler.processWebhook({
  customerName: "John Doe",
  customerEmail: "john@example.com",
  appointmentDate: "2025-03-10T10:00:00Z",
  webhookUrlId: "webhook-123"
});`,
  calendly: `// Example Calendly webhook handler
const handler = new CalendlyWebhookHandler(companyId);

// Process invitee.created event
await handler.processWebhook({
  event: "invitee.created",
  payload: {
    invitee: {
      name: "John Doe",
      email: "john@example.com"
    },
    event: {
      start_time: "2025-03-10T10:00:00Z"
    },
    status: "completed"
  },
  webhookUrlId: "webhook-123"
});`,
  acuity: `// Example Acuity webhook handler
const handler = new AcuityWebhookHandler(companyId);

// Process completed appointment
await handler.processWebhook({
  action: "appointment.completed",
  appointment: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    datetime: "2025-03-10T10:00:00Z",
    phone: "+1234567890"
  },
  webhookUrlId: "webhook-123"
});`,
  simplybook: `// Example SimplyBook webhook handler
const handler = new SimplyBookWebhookHandler(companyId);

// Process completed booking
await handler.processWebhook({
  event: "booking.completed",
  booking: {
    client_name: "John Doe",
    client_email: "john@example.com",
    client_phone: "+1234567890",
    start_datetime: "2025-03-10T10:00:00Z"
  },
  webhookUrlId: "webhook-123"
});`,
  square: `// Example Square webhook handler
const handler = new SquareWebhookHandler(companyId);

// Process completed appointment
await handler.processWebhook({
  type: "appointment.completed",
  data: {
    customer: {
      given_name: "John",
      family_name: "Doe",
      email_address: "john@example.com",
      phone_number: "+1234567890"
    },
    appointment: {
      start_at: "2025-03-10T10:00:00Z"
    }
  },
  webhookUrlId: "webhook-123"
});`,
};

interface WebhookTesterProps {
  webhookId: string;
  provider: string;
}

export function WebhookTester({ webhookId, provider }: WebhookTesterProps) {
  const [payload, setPayload] = useState(
    JSON.stringify(SAMPLE_PAYLOADS[provider as keyof typeof SAMPLE_PAYLOADS] || {}, null, 2)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(provider);

  const handleTest = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/webhooks/test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webhookId,
          payload: JSON.parse(payload),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to test webhook');
      }

      toast.success('Webhook test sent successfully');
    } catch (error) {
      toast.error('Failed to test webhook');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderChange = (value: string) => {
    setSelectedProvider(value);
    setPayload(JSON.stringify(SAMPLE_PAYLOADS[value as keyof typeof SAMPLE_PAYLOADS] || {}, null, 2));
  };

  const handleReset = () => {
    setPayload(JSON.stringify(SAMPLE_PAYLOADS[selectedProvider as keyof typeof SAMPLE_PAYLOADS] || {}, null, 2));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Label>Integration Provider</Label>
          <Select value={selectedProvider} onValueChange={handleProviderChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vertimart">VertiMart</SelectItem>
              <SelectItem value="calendly">Calendly</SelectItem>
              <SelectItem value="acuity">Acuity</SelectItem>
              <SelectItem value="simplybook">SimplyBook</SelectItem>
              <SelectItem value="square">Square</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="payload" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="payload" className="flex-1">Test Payload</TabsTrigger>
          <TabsTrigger value="example" className="flex-1">Example Usage</TabsTrigger>
        </TabsList>
        <TabsContent value="payload">
          <Card className="p-4">
            <Label>Webhook Payload</Label>
            <Textarea
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className="font-mono text-sm mt-2"
              rows={15}
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={handleTest} disabled={isLoading}>
                {isLoading ? 'Testing...' : 'Test Webhook'}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Reset Payload
              </Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="example">
          <Card className="p-4">
            <Label>Example Implementation</Label>
            <Textarea
              value={WEBHOOK_EXAMPLES[selectedProvider as keyof typeof WEBHOOK_EXAMPLES]}
              readOnly
              className="font-mono text-sm mt-2 bg-muted"
              rows={15}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}