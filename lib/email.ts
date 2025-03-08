// lib/email.ts
import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface SendFeedbackEmailParams {
  to: string;
  customerName: string;
  companyName: string;
  appointmentId: string;
}

interface SendReviewRequestEmailParams {
  to: string;
  customerName: string;
  companyName: string;
  appointmentId: string;
  template?: string;
  subject?: string;
}

interface SendSupportRequestEmailParams {
  to: string;
  name: string;
  email: string;
  orderId: string;
  subject: string;
  message: string;
  ticketId: string;
}

// Internal helper function (not exported)
// Suppress unused warning
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateSupportConfirmationEmail(name: string, ticketId: string, subject: string, message: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2563eb;">Support Request Received</h1>
      <p>Hello ${name},</p>
      <p>Thank you for contacting Raatum Support. We’ve received your request and will respond within 24 hours during business days.</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Ticket ID:</strong> ${ticketId}</p>
        <p style="margin: 10px 0 0;"><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
      </div>
      <p>Your message:</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0;">${message.replace(/\n/g, '<br>')}</p>
      </div>
      <p>Reply to this email if you have additional details to add.</p>
      <p>Best regards,<br>The Raatum Support Team</p>
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #666;">If you didn’t submit this request, please ignore this email.</p>
    </div>
  `;
}

// Internal helper function (not exported)
// Suppress unused warning
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateSupportNotificationEmail(
  name: string,
  email: string,
  orderId: string,
  subject: string,
  message: string,
  ticketId: string
) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2563eb;">New Support Request</h1>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Ticket ID:</strong> ${ticketId}</p>
        <p style="margin: 10px 0 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 10px 0 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin: 10px 0 0;"><strong>Order ID:</strong> ${orderId || 'Not provided'}</p>
        <p style="margin: 10px 0 0;"><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
      </div>
      <h2>Message:</h2>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0;">${message.replace(/\n/g, '<br>')}</p>
      </div>
      <p>Please respond within 24 hours.</p>
    </div>
  `;
}

export async function sendFeedbackEmail({
  to,
  customerName,
  companyName,
  appointmentId,
}: SendFeedbackEmailParams) {
  const feedbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/feedback/${appointmentId}`;

  const mailOptions = {
    from: 'info@raatum.com',
    to,
    subject: `How was your experience with ${companyName}?`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${customerName},</h2>
        <p>Thank you for choosing ${companyName}. We'd love to hear about your experience!</p>
        <p>Please take a moment to share your feedback:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${feedbackUrl}" style="
            background-color: #2563eb;
            color: #fff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
          ">
            Rate Your Experience
          </a>
        </div>
        <p>Your feedback helps us improve our service.</p>
        <p>Best regards,<br>${companyName}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending feedback email:', error);
    throw error;
  }
}

export async function sendReviewRequestEmail({
  to,
  customerName,
  companyName,
  appointmentId,
  template,
  subject,
}: SendReviewRequestEmailParams) {
  const feedbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/feedback/${appointmentId}`;

  const defaultTemplate = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Hi ${customerName},</h2>
      <p>Thank you for choosing ${companyName}. We'd love to hear about your experience!</p>
      <p>Please take a moment to share your feedback:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${feedbackUrl}" style="
          background-color: #2563eb;
          color: #fff;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
        ">
          Rate Your Experience
        </a>
      </div>
      <p>Your feedback helps us improve our service.</p>
      <p>Best regards,<br>${companyName}</p>
    </div>
  `;

  const mailOptions = {
    from: 'info@raatum.com',
    to,
    subject: subject || `How was your experience with ${companyName}?`,
    html: template
      ?.replace(/\${customerName}/g, customerName)
      .replace(/\${companyName}/g, companyName)
      .replace(/\${feedbackUrl}/g, feedbackUrl) || defaultTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending review request email:', error);
    throw error;
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Verify your email address',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Raatum!</h2>
        <p>Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="
            background-color: #2563eb;
            color: #fff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
          ">
            Verify Email Address
          </a>
        </div>
        <p>If you didn't create an account, you can safely ignore this email.</p>
        <p>Best regards,<br>The Raatum Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Reset your password',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Forgot your password?</h2>
        <p>No worries! You can reset your password by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="
            background-color: #2563eb;
            color: #fff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
          ">
            Reset Password
          </a>
        </div>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <p>Best regards,<br>The Raatum Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}

export async function sendSupportRequestEmail({
  to,
  name,
  email,
  orderId,
  subject,
  message,
  ticketId,
}: SendSupportRequestEmailParams) {
  const html =
    to === process.env.SUPPORT_EMAIL
      ? generateSupportNotificationEmail(name, email, orderId, subject, message, ticketId)
      : generateSupportConfirmationEmail(name, ticketId, subject, message);

  const mailOptions = {
    from: 'info@raatum.com',
    to,
    subject: to === process.env.SUPPORT_EMAIL ? `Support Request: ${subject}` : 'Support Request Received',
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending support request email:', error);
    throw error;
  }
}