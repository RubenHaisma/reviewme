import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AcuityWebhookHandler } from '@/lib/integrations/acuity';
import { CalendlyWebhookHandler } from '@/lib/integrations/calendly';
import { SimplyBookWebhookHandler } from '@/lib/integrations/simplybook';
import { SquareWebhookHandler } from '@/lib/integrations/square';
import { VertiMartWebhookHandler } from '@/lib/integrations/vertimart';

interface Params {
  provider: string;
}

interface Context {
  params: Promise<Params>;
}

const HANDLERS = {
  acuity: AcuityWebhookHandler,
  calendly: CalendlyWebhookHandler,
  simplybook: SimplyBookWebhookHandler,
  square: SquareWebhookHandler,
  vertimart: VertiMartWebhookHandler,
};

export async function POST(req: NextRequest, context: Context) {
  try {
    const params = await context.params;
    const provider = params.provider;

    if (!Object.keys(HANDLERS).includes(provider)) {
      return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
    }

    const url = new URL(req.url);
    const webhookUrl = await prisma.webhookUrl.findFirst({
      where: {
        url: {
          contains: url.pathname,
        },
        provider,
      },
      include: {
        company: true,
      },
    });

    if (!webhookUrl) {
      return NextResponse.json({ error: 'Webhook URL not found' }, { status: 404 });
    }

    const body = await req.text();
    const Handler = HANDLERS[provider as keyof typeof HANDLERS];
    const handler = new Handler(webhookUrl.companyId);

    const signature = req.headers.get(
      provider === 'calendly'
        ? 'calendly-webhook-signature'
        : provider === 'square'
        ? 'x-square-signature'
        : provider === 'vertimart'
        ? 'x-vertimart-signature'
        : 'x-webhook-signature'
    );

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    const isValid = await handler.verifySignature(signature, body);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(body);
    await handler.processWebhook({
      ...payload,
      webhookUrlId: webhookUrl.id,
    });

    await prisma.webhookUrl.update({
      where: { id: webhookUrl.id },
      data: {
        lastEventAt: new Date(),
        status: 'ACTIVE',
        errorCount: 0,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);

    if (error instanceof Error) {
      const url = new URL(req.url);
      await prisma.webhookUrl.updateMany({
        where: {
          url: {
            contains: url.pathname,
          },
        },
        data: {
          errorCount: {
            increment: 1,
          },
          status: 'ERROR',
        },
      });
    }

    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

export const runtime = 'nodejs';