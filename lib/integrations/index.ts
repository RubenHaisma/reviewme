// Integration provider interface
export interface IntegrationProvider {
    id: string;
    name: string;
    description: string;
    website: string;
    documentationUrl: string;
    webhookFormat: Record<string, any>;
    requiredFields: string[];
  }
  
  // Integration connection interface
  export interface IntegrationConnection {
    id: string;
    companyId: string;
    providerId: string;
    credentials: Record<string, any>;
    settings: Record<string, any>;
    status: 'active' | 'inactive' | 'error';
    lastSyncAt: Date | null;
    errorMessage: string | null;
  }
  
  // Webhook event interface
  export interface WebhookEvent {
    id: string;
    webhookUrlId: string;
    eventType: string;
    payload: Record<string, any>;
    processed: boolean;
    errorMessage: string | null;
    createdAt: Date;
    processedAt: Date | null;
  }
  
  // Base webhook handler interface
  export interface WebhookHandler {
    verifySignature(signature: string, payload: string): Promise<boolean>;
    processWebhook(payload: any): Promise<void>;
  }
  
  // Integration error types
  export class IntegrationError extends Error {
    constructor(
      message: string,
      public readonly providerId: string,
      public readonly code: string
    ) {
      super(message);
      this.name = 'IntegrationError';
    }
  }
  
  export class WebhookError extends Error {
    constructor(
      message: string,
      public readonly providerId: string,
      public readonly eventId: string
    ) {
      super(message);
      this.name = 'WebhookError';
    }
  }
  
  // Utility function to validate required fields
  export function validateRequiredFields(
    provider: IntegrationProvider,
    credentials: Record<string, any>
  ): boolean {
    return provider.requiredFields.every((field) => credentials[field]);
  }
  
  // Utility function to encrypt sensitive data
  export function encryptCredentials(
    credentials: Record<string, any>
  ): Record<string, any> {
    // Implementation would use a secure encryption method
    return credentials;
  }
  
  // Utility function to decrypt sensitive data
  export function decryptCredentials(
    encrypted: Record<string, any>
  ): Record<string, any> {
    // Implementation would use a secure decryption method
    return encrypted;
  }