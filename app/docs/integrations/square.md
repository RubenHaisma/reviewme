# Square Appointments Integration Guide

## Overview
Connect Square Appointments with Raatum to automatically collect customer feedback after appointments.

## Prerequisites
- Square Appointments subscription
- Square developer account
- Raatum account

## Setup Steps

### 1. Create Square Application
1. Go to Square Developer Dashboard
2. Create new application
3. Get your:
   - Access Token
   - Location ID
   - Webhook Signing Key

### 2. Raatum Configuration
1. Open Raatum dashboard
2. Go to "Settings" → "Integrations"
3. Select Square Appointments
4. Enter credentials
5. Save configuration

### 3. Square Webhook Setup
1. In Square Developer Dashboard
2. Go to "Webhooks"
3. Add webhook URL:
   ```
   https://app.raatum.com/api/webhooks/square/[your-webhook-id]
   ```
4. Subscribe to events:
   - `appointment.created`
   - `appointment.updated`
   - `appointment.canceled`
5. Save webhook

## Testing
1. Create test appointment
2. Verify webhook delivery
3. Check feedback email
4. Test cancellation flow

## Webhook Payload Example
```json
{
  "type": "appointment.created",
  "data": {
    "appointment": {
      "id": "abc123",
      "customer_id": "cust_123",
      "start_at": "2025-03-08T09:00:00Z"
    },
    "customer": {
      "id": "cust_123",
      "email_address": "customer@example.com",
      "given_name": "John",
      "family_name": "Smith"
    }
  }
}
```

## Troubleshooting
- **Webhook Issues**
  - Check signature verification
  - Verify URL configuration
  - Review event subscriptions

- **Authentication**
  - Validate access token
  - Check permissions
  - Verify location ID

## Security
- Use production tokens only
- Enable webhook signatures
- Monitor access logs
- Regular security audits

## Support
- Email: support@raatum.com
- Documentation: [/docs](/docs)
- Help Center: https://help.raatum.com