import { WebhookHandler, IntegrationError, WebhookError } from './index';
import { prisma } from '@/lib/prisma';
import { sendFeedbackEmail } from '@/lib/email';
import crypto from 'crypto';

export class VertiMartWebhookHandler implements WebhookHandler {
  constructor(private readonly companyId: string) {}

  async verifySignature(signature: string, payload: string): Promise<boolean> {
    try {
      const connection = await prisma.integrationConnection.findUnique({
        where: {
          companyId_providerId: {
            companyId: this.companyId,
            providerId: 'vertimart',
          },
        },
        select: {
          credentials: true,
        },
      });

      if (!connection) {
        throw new IntegrationError(
          'Integration not found',
          'vertimart',
          'INTEGRATION_NOT_FOUND'
        );
      }

      if (
        !connection.credentials ||
        typeof connection.credentials !== 'object' ||
        !('api_key' in connection.credentials)
      ) {
        throw new IntegrationError(
          'Invalid credentials',
          'vertimart',
          'INVALID_CREDENTIALS'
        );
      }

      const apiKey = connection.credentials.api_key as string;
      const hmac = crypto.createHmac('sha256', apiKey);
      const calculatedSignature = hmac.update(payload).digest('hex');

      return crypto.timingSafeEqual(
        Uint8Array.from(Buffer.from(signature, 'hex')),
        Uint8Array.from(Buffer.from(calculatedSignature, 'hex'))
      );
    } catch (error) {
      throw new WebhookError(
        'Failed to verify signature',
        'vertimart',
        'SIGNATURE_VERIFICATION_FAILED'
      );
    }
  }

  async processWebhook(payload: any): Promise<void> {
    try {
      // Get company details first to ensure it exists
      const company = await prisma.company.findUnique({
        where: { id: this.companyId },
        select: { 
          name: true,
          emailTemplate: true,
          emailSubject: true,
        },
      });

      if (!company) {
        throw new Error('Company not found');
      }

      // Create or update customer record
      const customer = await prisma.customer.upsert({
        where: {
          email_companyId: {
            email: payload.customerEmail,
            companyId: this.companyId,
          },
        },
        create: {
          companyId: this.companyId,
          name: payload.customerName,
          email: payload.customerEmail,
        },
        update: {},
      });

      // Create appointment record
      const appointment = await prisma.appointment.create({
        data: {
          companyId: this.companyId,
          customerName: payload.customerName,
          customerEmail: payload.customerEmail,
          date: new Date(payload.appointmentDate),
        },
      });

      // Schedule feedback email for 2 hours after appointment
      const feedbackDate = new Date(payload.appointmentDate);
      feedbackDate.setHours(feedbackDate.getHours() + 2);

      // Send feedback request email
      await sendFeedbackEmail({
        to: payload.customerEmail,
        customerName: payload.customerName,
        companyName: company.name,
        appointmentId: appointment.id,
        template: company.emailTemplate || '',
        subject: company.emailSubject || '',
      });

      // Update appointment to mark feedback email as sent
      await prisma.appointment.update({
        where: { id: appointment.id },
        data: { feedbackSent: true },
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
        'vertimart',
        'WEBHOOK_PROCESSING_FAILED'
      );
    }
  }
}