# SimplyBook.me Integration Guide

## Overview
This guide explains how to connect your SimplyBook.me account with Raatum to automatically collect customer feedback after appointments.

## Prerequisites
- An active SimplyBook.me Professional or higher account
- Admin access to your SimplyBook.me account
- A Raatum account

## Setup Steps

### 1. Get Your SimplyBook.me API Credentials
1. Log in to your SimplyBook.me admin panel.
2. Navigate to **Settings** → **API & Integration**.
3. Click **Generate API Credentials** (or use existing ones if available).
4. Note down your:
   - **Company ID**
   - **API Key**
5. Keep these credentials secure.

### 2. Configure Raatum Integration
1. Log in to your Raatum dashboard.
2. Go to **Settings** → **Integrations**.
3. Locate **SimplyBook.me** and click **Connect**.
4. Enter your **Company ID** and **API Key** from Step 1.
5. Click **Save** to establish the connection.

### 3. Configure Webhook in SimplyBook.me
1. In SimplyBook.me, navigate to **Settings** → **Webhooks**.
2. Click **Add Webhook**.
3. Enter your Raatum webhook URL: https://app.raatum.com/api/webhooks/simplybook/[your-webhook-id]
- Replace `[your-webhook-id]` with the unique ID provided in your Raatum integrations settings.
4. Select the following events to trigger:
- **Booking Created**
- **Booking Updated**
- **Booking Cancelled**
5. Click **Save** to activate the webhook.

## Testing the Integration
1. Create a test booking in SimplyBook.me.
2. Check the **Recent Activity** section in your Raatum dashboard to confirm the booking appears.
3. Verify that a feedback request email is sent to the test client’s email address.
4. Cancel the test booking and ensure the cancellation is reflected in Raatum.

## Webhook Payload Example
When an event triggers the webhook, SimplyBook.me sends data in this format:
```json
{
"booking": {
 "id": "12345",
 "client_name": "Alice Johnson",
 "client_email": "alice@example.com",
 "service_name": "Consultation",
 "start_datetime": "2025-03-08T10:00:00Z"
}
}