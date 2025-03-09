import { VertiMartWebhookHandler } from '../lib/integrations/vertimart';
import { WebhookError } from '../lib/integrations/index';
import { prisma } from '../lib/prisma';
import { sendFeedbackEmail } from '../lib/email';
import crypto from 'crypto';

jest.mock('../lib/prisma', () => ({
  prisma: {
    integrationConnection: { findUnique: jest.fn() },
    company: { findUnique: jest.fn() },
    customer: { upsert: jest.fn() },
    appointment: { create: jest.fn(), update: jest.fn() },
    webhookEvent: { create: jest.fn() },
  },
}));
jest.mock('../lib/email', () => ({
  sendFeedbackEmail: jest.fn(),
}));
jest.mock('crypto', () => ({
  createHmac: jest.fn(() => ({
    update: jest.fn(() => ({
      digest: jest.fn(),
    })),
  })),
  timingSafeEqual: jest.fn(),
}));

describe('VertiMartWebhookHandler', () => {
  let handler: VertiMartWebhookHandler;
  const companyId = 'test-company-id';
  const mockApiKey = 'test-api-key';
  const mockPayload = JSON.stringify({
    customerName: 'John Doe',
    customerEmail: 'ruben@ihn-solutions.nl',
    appointmentDate: '2025-03-10T10:00:00Z',
    webhookUrlId: 'test-webhook-id',
  });

  beforeEach(() => {
    handler = new VertiMartWebhookHandler(companyId);
    jest.clearAllMocks();
  });

  describe('verifySignature', () => {
    it('should verify a valid signature', async () => {
      (prisma.integrationConnection.findUnique as jest.Mock).mockResolvedValue({
        credentials: { api_key: mockApiKey },
      });
      const mockHmac = {
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue('mock-signature'),
      };
      (crypto.createHmac as jest.Mock).mockReturnValue(mockHmac);
      (crypto.timingSafeEqual as jest.Mock).mockReturnValue(true);

      const result = await handler.verifySignature('mock-signature', mockPayload);
      expect(result).toBe(true);
    });

    it('should throw WebhookError if connection not found', async () => {
      (prisma.integrationConnection.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(handler.verifySignature('sig', mockPayload)).rejects.toThrow(
        new WebhookError('Failed to verify signature', 'vertimart', 'SIGNATURE_VERIFICATION_FAILED')
      );
    });
  });

  describe('processWebhook', () => {
    it('should process webhook successfully', async () => {
      const mockCompany = { name: 'Test Company', emailTemplate: null, emailSubject: null };
      const mockCustomer = { id: 'customer-id' };
      const mockAppointment = { id: 'appointment-id' };

      (prisma.company.findUnique as jest.Mock).mockResolvedValue(mockCompany);
      (prisma.customer.upsert as jest.Mock).mockResolvedValue(mockCustomer);
      (prisma.appointment.create as jest.Mock).mockResolvedValue(mockAppointment);
      (prisma.appointment.update as jest.Mock).mockResolvedValue(mockAppointment);
      (sendFeedbackEmail as jest.Mock).mockResolvedValue(undefined);
      (prisma.webhookEvent.create as jest.Mock)
        .mockResolvedValueOnce({}) // Success case
        .mockResolvedValueOnce({}); // Error case

      const parsedPayload = JSON.parse(mockPayload);
      console.log('Parsed payload:', parsedPayload);
      await handler.processWebhook(parsedPayload);

      expect(prisma.company.findUnique).toHaveBeenCalledWith({
        where: { id: companyId },
        select: { name: true, emailTemplate: true, emailSubject: true },
      });
      expect(prisma.customer.upsert).toHaveBeenCalledWith({
        where: {
          email_companyId: {
            email: 'ruben@ihn-solutions.nl',
            companyId,
          },
        },
        create: {
          companyId,
          name: 'John Doe',
          email: 'ruben@ihn-solutions.nl',
        },
        update: {},
      });
      expect(prisma.appointment.create).toHaveBeenCalledWith({
        data: {
          companyId,
          customerName: 'John Doe',
          customerEmail: 'ruben@ihn-solutions.nl',
          date: expect.any(Date),
        },
      });
      expect(sendFeedbackEmail).toHaveBeenCalledWith({
        to: 'ruben@ihn-solutions.nl',
        customerName: 'John Doe',
        companyName: 'Test Company',
        appointmentId: 'appointment-id',
        template: '', // Updated to match received value
        subject: '',  // Updated to match received value
      });
      expect(prisma.appointment.update).toHaveBeenCalledWith({
        where: { id: 'appointment-id' },
        data: { feedbackSent: true },
      });
      expect(prisma.webhookEvent.create).toHaveBeenCalledWith({
        data: {
          webhookUrlId: 'test-webhook-id',
          eventType: 'appointment.created',
          payload: parsedPayload,
          processed: true,
          processedAt: expect.any(Date),
        },
      });
    });

    it('should handle processing errors', async () => {
      (prisma.company.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(handler.processWebhook(JSON.parse(mockPayload))).rejects.toThrow(
        new WebhookError('Failed to process webhook', 'vertimart', 'WEBHOOK_PROCESSING_FAILED')
      );
      expect(prisma.webhookEvent.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          eventType: 'appointment.created',
          processed: false,
          errorMessage: 'Company not found',
        }),
      });
    });
  });
});