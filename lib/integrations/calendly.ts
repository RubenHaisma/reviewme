import { WebhookHandler, IntegrationError, WebhookError } from './index';
import { prisma } from '@/lib/prisma';
import { sendFeedbackEmail } from '@/lib/email';
import crypto from 'crypto';

export class CalendlyWebhookHandler implements WebhookHandler {
  constructor(private readonly companyId: string) {}

  async verifySignature(signature: string, payload: string): Promise<boolean> {
    try {
      const connection = await prisma.integrationConnection.findUnique({
        where: {
          companyId_providerId: {
            companyId: this.companyId,
            providerId: 'calendly',
          },
        },
        select: {
          credentials: true,
        },
      });

      if (!connection || !connection.credentials) {
        throw new IntegrationError(
          'Integration not found',
          'calendly',
          'INTEGRATION_NOT_FOUND'
        );
      }

      const credentials = connection.credentials as { webhook_signing_key: string };
      const signingKey = credentials.webhook_signing_key;
      const hmac = crypto.createHmac('sha256', signingKey);
      const calculatedSignature = hmac.update(payload).digest('base64');

      return signature === `v1=${calculatedSignature}`;
    } catch (error) {
      throw new WebhookError(
        'Failed to verify signature',
        'calendly',
        'SIGNATURE_VERIFICATION_FAILED'
      );
    }
  }

  async processWebhook(payload: any): Promise<void> {
    try {
      // Only process completed appointment events
      if (payload.event !== 'invitee.created') {
        return;
      }

      const appointment = await prisma.appointment.create({
        data: {
          companyId: this.companyId,
          customerName: payload.payload.invitee.name,
          customerEmail: payload.payload.invitee.email,
          date: new Date(payload.payload.event.start_time),
        },
      });

      // Schedule feedback email for 2 hours after appointment
      const feedbackDate = new Date(payload.payload.event.start_time);
      feedbackDate.setHours(feedbackDate.getHours() + 2);

      // Get company details
      const company = await prisma.company.findUnique({
        where: { id: this.companyId },
        select: { name: true },
      });

      if (!company) {
        throw new Error('Company not found');
      }

      // Send feedback request
      await sendFeedbackEmail({
        to: payload.payload.invitee.email,
        customerName: payload.payload.invitee.name,
        companyName: company.name,
        appointmentId: appointment.id,
      });

      // Log successful webhook processing
      await prisma.webhookEvent.create({
        data: {
          webhookUrlId: payload.webhookUrlId,
          eventType: 'invitee.created',
          payload,
          processed: true,
          processedAt: new Date(),
        },
      });
    } catch (error) {
      // Log failed webhook processing
      await prisma.webhookEvent.create({
        data: {
          webhookUrlId: payload.webhookUrlId,
          eventType: 'invitee.created',
          payload,
          processed: false,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        },
      });

      throw new WebhookError(
        'Failed to process webhook',
        'calendly',
        'WEBHOOK_PROCESSING_FAILED'
      );
    }
  }
}