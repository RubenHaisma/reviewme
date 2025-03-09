'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

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
    },
  },
  acuity: {
    action: "appointment.completed",
    appointment: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      datetime: new Date().toISOString(),
    },
  },
  simplybook: {
    event: "booking.completed",
    booking: {
      client_name: "John Doe",
      client_email: "john@example.com",
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
      },
      appointment: {
        start_at: new Date().toISOString(),
      },
    },
  },
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

  const handleReset = () => {
    setPayload(JSON.stringify(SAMPLE_PAYLOADS[provider as keyof typeof SAMPLE_PAYLOADS] || {}, null, 2));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Test Payload</Label>
        <Textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          className="font-mono text-sm"
          rows={10}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleTest} disabled={isLoading}>
          {isLoading ? 'Testing...' : 'Test Webhook'}
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Reset Payload
        </Button>
      </div>
    </div>
  );
}