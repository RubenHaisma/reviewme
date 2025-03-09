import { WebhookHandler, IntegrationError, WebhookError } from './index';
import { prisma } from '@/lib/prisma';
import { sendFeedbackEmail } from '@/lib/email';
import crypto from 'crypto';

export class SquareWebhookHandler implements WebhookHandler {
  constructor(private readonly companyId: string) {}

  async verifySignature(signature: string, payload: string): Promise<boolean> {
    try {
      const connection = await prisma.integrationConnection.findUnique({
        where: {
          companyId_providerId: {
            companyId: this.companyId,
            providerId: 'square',
          },
        },
        select: {
          credentials: true,
        },
      });

      if (!connection) {
        throw new IntegrationError(
          'Integration not found',
          'square',
          'INTEGRATION_NOT_FOUND'
        );
      }
      
      if (!connection.credentials || typeof connection.credentials !== 'object') {
        throw new IntegrationError(
          'Invalid credentials',
          'square',
          'INVALID_CREDENTIALS'
        );
      }

      const credentials = connection.credentials as Record<string, string>;
      const signingKey = credentials.webhook_signing_key;
      
      if (!signingKey) {
        throw new IntegrationError(
          'Missing webhook signing key',
          'square',
          'MISSING_SIGNING_KEY'
        );
      }
      const hmac = crypto.createHmac('sha256', signingKey);
      const calculatedSignature = hmac.update(payload).digest('base64');

      return signature === calculatedSignature;
    } catch (error) {
      throw new WebhookError(
        'Failed to verify signature',
        'square',
        'SIGNATURE_VERIFICATION_FAILED'
      );
    }
  }

  async processWebhook(payload: any): Promise<void> {
    try {
      if (payload.type !== 'appointment.created') {
        return;
      }

      const appointment = await prisma.appointment.create({
        data: {
          companyId: this.companyId,
          customerName: `${payload.data.customer.given_name} ${payload.data.customer.family_name}`,
          customerEmail: payload.data.customer.email_address,
          date: new Date(payload.data.appointment.start_at),
        },
      });

      // Schedule feedback email for 2 hours after appointment
      const feedbackDate = new Date(payload.data.appointment.start_at);
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
        to: payload.data.customer.email_address,
        customerName: `${payload.data.customer.given_name} ${payload.data.customer.family_name}`,
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
        'square',
        'WEBHOOK_PROCESSING_FAILED'
      );
    }
  }
}