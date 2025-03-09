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
      // Only process completed appointment events
      if (payload.type !== 'appointment.completed') {
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
            email: payload.data.customer.email_address,
            companyId: this.companyId,
          },
        },
        create: {
          companyId: this.companyId,
          name: `${payload.data.customer.given_name} ${payload.data.customer.family_name}`,
          email: payload.data.customer.email_address,
          phone: payload.data.customer.phone_number || null,
        },
        update: {},
      });

      // Create appointment record
      const appointment = await prisma.appointment.create({
        data: {
          companyId: this.companyId,
          customerName: `${payload.data.customer.given_name} ${payload.data.customer.family_name}`,
          customerEmail: payload.data.customer.email_address,
          date: new Date(payload.data.appointment.start_at),
        },
      });

      // Send feedback request email
      await sendFeedbackEmail({
        to: payload.data.customer.email_address,
        customerName: `${payload.data.customer.given_name} ${payload.data.customer.family_name}`,
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
          eventType: 'appointment.completed',
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
          eventType: 'appointment.completed',
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