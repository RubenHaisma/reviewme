import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AcuityWebhookHandler } from '@/lib/integrations/acuity';
import { CalendlyWebhookHandler } from '@/lib/integrations/calendly';
import { SimplyBookWebhookHandler } from '@/lib/integrations/simplybook';
import { SquareWebhookHandler } from '@/lib/integrations/square';

// Define the params interface
interface Params {
  provider: string;
}

// Define the context type with params as a Promise
interface Context {
  params: Promise<Params>;
}

const HANDLERS = {
  acuity: AcuityWebhookHandler,
  calendly: CalendlyWebhookHandler,
  simplybook: SimplyBookWebhookHandler,
  square: SquareWebhookHandler,
};

export async function POST(req: NextRequest, context: Context) {
  try {
    // Resolve the params Promise
    const params = await context.params;
    const provider = params.provider;

    // Validate provider
    if (!Object.keys(HANDLERS).includes(provider)) {
      return NextResponse.json(
        { error: 'Invalid provider' },
        { status: 400 }
      );
    }

    // Get webhook URL and company from the request URL
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
      return NextResponse.json(
        { error: 'Webhook URL not found' },
        { status: 404 }
      );
    }

    const body = await req.text();
    const Handler = HANDLERS[provider as keyof typeof HANDLERS];
    const handler = new Handler(webhookUrl.companyId);

    // Get signature from headers using req.headers
    const signature = req.headers.get(
      provider === 'calendly'
        ? 'calendly-webhook-signature'
        : provider === 'square'
        ? 'x-square-signature'
        : 'x-webhook-signature'
    );

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      );
    }

    // Verify webhook signature
    const isValid = await handler.verifySignature(signature, body);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Process webhook
    const payload = JSON.parse(body);
    await handler.processWebhook({
      ...payload,
      webhookUrlId: webhookUrl.id,
    });

    // Update webhook URL status
    await prisma.webhookUrl.update({
      where: { id: webhookUrl.id },
      data: {
        lastEventAt: new Date(),
        status: 'ACTIVE', // Changed to uppercase to match enum
        errorCount: 0,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);

    // Update webhook URL error status
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
          status: 'ERROR', // Changed to uppercase to match enum
        },
      });
    }

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs'; // Ensure Node.js runtime for crypto, etc.