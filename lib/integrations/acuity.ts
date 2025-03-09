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
      // Only process completed appointment events
      if (payload.action !== 'appointment.completed') {
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
            email: payload.appointment.email,
            companyId: this.companyId,
          },
        },
        create: {
          companyId: this.companyId,
          name: `${payload.appointment.firstName} ${payload.appointment.lastName}`,
          email: payload.appointment.email,
          phone: payload.appointment.phone || null,
        },
        update: {},
      });

      // Create appointment record
      const appointment = await prisma.appointment.create({
        data: {
          companyId: this.companyId,
          customerName: `${payload.appointment.firstName} ${payload.appointment.lastName}`,
          customerEmail: payload.appointment.email,
          date: new Date(payload.appointment.datetime),
        },
      });

      // Send feedback request email
      await sendFeedbackEmail({
        to: payload.appointment.email,
        customerName: `${payload.appointment.firstName} ${payload.appointment.lastName}`,
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
        'acuity',
        'WEBHOOK_PROCESSING_FAILED'
      );
    }
  }
}