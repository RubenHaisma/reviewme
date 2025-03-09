# Acuity Scheduling Integration Guide

## Overview
This guide explains how to integrate your Acuity Scheduling account with Raatum to automatically collect customer feedback after appointments.

## Prerequisites
- An active Acuity Scheduling account
- Admin access to your Acuity account
- A Raatum account

## Setup Steps

### 1. Get Your Acuity API Credentials
1. Log in to your Acuity Scheduling account
2. Go to "Settings" → "Integrations"
3. Click on "API Credentials"
4. Note down your:
   - User ID
   - API Key

### 2. Configure Raatum Integration
1. Log in to your Raatum dashboard
2. Navigate to "Settings" → "Integrations"
3. Click "Connect" next to Acuity Scheduling
4. Enter your Acuity API credentials
5. Click "Save"

### 3. Configure Webhook in Acuity
1. In Acuity, go to "Settings" → "Integrations" → "Webhooks"
2. Click "Add New Webhook"
3. Enter your Raatum webhook URL:
   ```
   https://app.raatum.com/api/webhooks/acuity/[your-webhook-id]
   ```
4. Select the following events:
   - Appointment Scheduled
   - Appointment Rescheduled
   - Appointment Canceled
5. Click "Save"

## Testing the Integration
1. Create a test appointment in Acuity
2. Check your Raatum dashboard's "Recent Activity" section
3. Verify that the appointment was received
4. Check that the feedback request email was sent

## Webhook Payload Example
```json
{
  "id": "123456",
  "client": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  },
  "datetime": "2025-03-08T14:00:00Z",
  "type": "scheduled"
}
```

## Troubleshooting
- **Webhook Not Receiving Events**
  - Verify the webhook URL is correct
  - Check Acuity webhook settings
  - Ensure events are selected

- **Invalid Signature Errors**
  - Verify API credentials are correct
  - Check if API key has expired
  - Ensure webhook secret is properly configured

- **Missing Customer Data**
  - Verify required fields are enabled in Acuity
  - Check client information is complete

## Security Considerations
- Keep your API credentials secure
- Regularly rotate API keys
- Monitor webhook activity for unusual patterns
- Use HTTPS for all connections

## Support
If you need assistance:
1. Check our [documentation](/docs)
2. Contact support at support@raatum.com
3. Visit our [help center](https://help.raatum.com)