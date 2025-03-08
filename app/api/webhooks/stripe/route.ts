import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { Stripe } from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Missing stripe signature or webhook secret' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const companyId = subscription.metadata.companyId;

        if (!companyId) {
          throw new Error('No companyId in subscription metadata');
        }

        await prisma.company.update({
          where: { id: companyId },
          data: {
            stripeCustomerId: subscription.customer as string,
            subscriptionId: subscription.id,
            subscriptionStatus: subscription.status,
          },
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const companyId = subscription.metadata.companyId;

        if (!companyId) {
          throw new Error('No companyId in subscription metadata');
        }

        await prisma.company.update({
          where: { id: companyId },
          data: {
            subscriptionId: null,
            subscriptionStatus: 'canceled',
          },
        });
        break;
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription' && session.subscription && session.client_reference_id) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          
          await prisma.company.update({
            where: { id: session.client_reference_id },
            data: {
              stripeCustomerId: session.customer as string,
              subscriptionId: subscription.id,
              subscriptionStatus: subscription.status,
            },
          });
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
          const companyId = subscription.metadata.companyId;

          if (companyId) {
            await prisma.company.update({
              where: { id: companyId },
              data: {
                subscriptionStatus: subscription.status,
              },
            });
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
          const companyId = subscription.metadata.companyId;

          if (companyId) {
            await prisma.company.update({
              where: { id: companyId },
              data: {
                subscriptionStatus: 'past_due',
              },
            });
          }
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};