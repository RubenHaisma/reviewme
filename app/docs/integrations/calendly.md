# Calendly Integration Guide

## Overview
Learn how to integrate Calendly with Raatum to automatically collect feedback after scheduled meetings.

## Prerequisites
- A Calendly Professional or higher account
- Admin access to your Calendly account
- A Raatum account

## Setup Steps

### 1. Get Your Calendly API Token
1. Log in to Calendly
2. Go to "Integrations" → "API & Webhooks"
3. Generate a new API key
4. Copy your:
   - API Token
   - Webhook Signing Key

### 2. Configure Raatum Integration
1. Log in to your Raatum dashboard
2. Go to "Settings" → "Integrations"
3. Click "Connect" next to Calendly
4. Enter your Calendly API token
5. Save the configuration

### 3. Set Up Calendly Webhook
1. In Calendly, go to "Integrations" → "Webhooks"
2. Click "Create New Webhook"
3. Enter your Raatum webhook URL:
   ```
   https://app.raatum.com/api/webhooks/calendly/[your-webhook-id]
   ```
4. Select these subscription events:
   - invitee.created
   - invitee.canceled
5. Click "Create Webhook"

## Testing the Integration
1. Create a test meeting in Calendly
2. Schedule it with a test email
3. Verify the appointment appears in Raatum
4. Check for the feedback request email

## Webhook Payload Example
```json
{
  "event": "invitee.created",
  "payload": {
    "event_type": "meeting",
    "invitee": {
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "event": {
      "start_time": "2025-03-08T15:00:00Z",
      "end_time": "2025-03-08T16:00:00Z"
    }
  }
}
```

## Troubleshooting
- **Webhook Not Working**
  - Verify webhook URL
  - Check subscription events
  - Validate API permissions

- **Authentication Errors**
  - Confirm API token is valid
  - Check token permissions
  - Verify webhook signing key

- **Missing Invitee Data**
  - Ensure required fields are enabled
  - Check form configuration

## Security Best Practices
- Rotate API tokens regularly
- Monitor webhook activity
- Use secure HTTPS connections
- Review access logs periodically

## Support
Need help?
- Email: support@raatum.com
- Documentation: [/docs](/docs)
- Help Center: https://help.raatum.com