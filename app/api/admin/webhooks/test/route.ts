import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AcuityWebhookHandler } from '@/lib/integrations/acuity';
import { CalendlyWebhookHandler } from '@/lib/integrations/calendly';
import { SimplyBookWebhookHandler } from '@/lib/integrations/simplybook';
import { SquareWebhookHandler } from '@/lib/integrations/square';
import { VertiMartWebhookHandler } from '@/lib/integrations/vertimart';
import crypto from 'crypto';

const HANDLERS = {
  acuity: AcuityWebhookHandler,
  calendly: CalendlyWebhookHandler,
  simplybook: SimplyBookWebhookHandler,
  square: SquareWebhookHandler,
  vertimart: VertiMartWebhookHandler,
};

export async function POST(req: Request) {
  try {
    const { webhookId, payload } = await req.json();

    const webhook = await prisma.webhookUrl.findUnique({
      where: { id: webhookId },
      include: { company: true },
    });

    if (!webhook) {
      return NextResponse.json({ error: 'Webhook not found' }, { status: 404 });
    }

    const Handler = HANDLERS[webhook.provider as keyof typeof HANDLERS];
    if (!Handler) {
      return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
    }

    const handler = new Handler(webhook.companyId);
    
    // Generate a test signature
    const testSignature = crypto.randomBytes(32).toString('hex');
    const stringifiedPayload = JSON.stringify(payload);

    // Verify signature and process webhook
    await handler.verifySignature(testSignature, stringifiedPayload);
    await handler.processWebhook({
      ...payload,
      webhookUrlId: webhookId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error testing webhook:', error);
    return NextResponse.json(
      { error: 'Failed to test webhook' },
      { status: 500 }
    );
  }
}