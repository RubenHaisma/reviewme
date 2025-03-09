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
      // Only process completed meeting events
      if (payload.event !== 'invitee.created' || payload.payload.status !== 'completed') {
        return;
      }

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
            email: payload.payload.invitee.email,
            companyId: this.companyId,
          },
        },
        create: {
          companyId: this.companyId,
          name: payload.payload.invitee.name,
          email: payload.payload.invitee.email,
        },
        update: {},
      });

      // Create appointment record
      const appointment = await prisma.appointment.create({
        data: {
          companyId: this.companyId,
          customerName: payload.payload.invitee.name,
          customerEmail: payload.payload.invitee.email,
          date: new Date(payload.payload.event.start_time),
        },
      });

      // Send feedback request email
      await sendFeedbackEmail({
        to: payload.payload.invitee.email,
        customerName: payload.payload.invitee.name,
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