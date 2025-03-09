import { WebhookHandler, IntegrationError, WebhookError } from './index';
import { prisma } from '@/lib/prisma';
import { sendFeedbackEmail } from '@/lib/email';
import crypto from 'crypto';

export class SimplyBookWebhookHandler implements WebhookHandler {
  constructor(private readonly companyId: string) {}

  async verifySignature(signature: string, payload: string): Promise<boolean> {
    try {
      const connection = await prisma.integrationConnection.findUnique({
        where: {
          companyId_providerId: {
            companyId: this.companyId,
            providerId: 'simplybook',
          },
        },
        select: {
          credentials: true,
        },
      });

      if (!connection || !connection.credentials) {
        throw new IntegrationError(
          'Integration not found',
          'simplybook',
          'INTEGRATION_NOT_FOUND'
        );
      }

      const credentials = connection.credentials as { api_key: string };
      const apiKey = credentials.api_key;
      const hmac = crypto.createHmac('sha256', apiKey);
      const calculatedSignature = hmac.update(payload).digest('hex');

      return signature === calculatedSignature;
    } catch (error) {
      throw new WebhookError(
        'Failed to verify signature',
        'simplybook',
        'SIGNATURE_VERIFICATION_FAILED'
      );
    }
  }

  async processWebhook(payload: any): Promise<void> {
    try {
      const appointment = await prisma.appointment.create({
        data: {
          companyId: this.companyId,
          customerName: payload.booking.client_name,
          customerEmail: payload.booking.client_email,
          date: new Date(payload.booking.start_datetime),
        },
      });

      // Schedule feedback email for 2 hours after appointment
      const feedbackDate = new Date(payload.booking.start_datetime);
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
        to: payload.booking.client_email,
        customerName: payload.booking.client_name,
        companyName: company.name,
        appointmentId: appointment.id,
      });

      // Log successful webhook processing
      await prisma.webhookEvent.create({
        data: {
          webhookUrlId: payload.webhookUrlId,
          eventType: 'booking.created',
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
          eventType: 'booking.created',
          payload,
          processed: false,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        },
      });

      throw new WebhookError(
        'Failed to process webhook',
        'simplybook',
        'WEBHOOK_PROCESSING_FAILED'
      );
    }
  }
}