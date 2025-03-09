import { WebhookHandler, IntegrationError, WebhookError } from './index';
import { prisma } from '@/lib/prisma';
import { sendFeedbackEmail } from '@/lib/email';
import crypto from 'crypto';

export class AcuityWebhookHandler implements WebhookHandler {
  constructor(private readonly companyId: string) {}

  async verifySignature(signature: string, payload: string): Promise<boolean> {
    try {
      const connection = await prisma.integrationConnection.findUnique({
        where: {
          companyId_providerId: {
            companyId: this.companyId,
            providerId: 'acuity',
          },
        },
        select: {
          credentials: true,
        },
      });

      if (!connection) {
        throw new IntegrationError(
          'Integration not found',
          'acuity',
          'INTEGRATION_NOT_FOUND'
        );
      }

      if (!connection.credentials || typeof connection.credentials !== 'object' || !('api_key' in connection.credentials)) {
        throw new IntegrationError(
          'Invalid credentials',
          'acuity',
          'INVALID_CREDENTIALS'
        );
      }

      const apiKey = connection.credentials.api_key as string;
      const hmac = crypto.createHmac('sha256', apiKey);
      const calculatedSignature = hmac.update(payload).digest('hex');

      return crypto.timingSafeEqual(
        new Uint8Array(Buffer.from(signature, 'hex')),
        new Uint8Array(Buffer.from(calculatedSignature, 'hex'))
      );
    } catch (error) {
      throw new WebhookError(
        'Failed to verify signature',
        'acuity',
        'SIGNATURE_VERIFICATION_FAILED'
      );
    }
  }

  async processWebhook(payload: any): Promise<void> {
    try {
      const appointment = await prisma.appointment.create({
        data: {
          companyId: this.companyId,
          customerName: `${payload.client.firstName} ${payload.client.lastName}`,
          customerEmail: payload.client.email,
          date: new Date(payload.datetime),
        },
      });

      // Schedule feedback email for 2 hours after appointment
      const feedbackDate = new Date(payload.datetime);
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
        to: payload.client.email,
        customerName: `${payload.client.firstName} ${payload.client.lastName}`,
        companyName: company.name,
        appointmentId: appointment.id,
      });

      // Log successful webhook processing
      await prisma.webhookEvent.create({
        data: {
          webhookUrlId: payload.webhookUrlId,
          eventType: 'appointment.created',
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
          eventType: 'appointment.created',
          payload,
          processed: false,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        },
      });

      throw new WebhookError(
        'Failed to process webhook',
        'acuity',
        'WEBHOOK_PROCESSING_FAILED'
      );
    }
  }
}