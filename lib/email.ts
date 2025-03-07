import nodemailer from "nodemailer";

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
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

export async function sendFeedbackEmail({
  to,
  customerName,
  companyName,
  appointmentId,
}: SendFeedbackEmailParams) {
  const feedbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/feedback/${appointmentId}`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
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
    console.error("Error sending feedback email:", error);
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
    from: process.env.GMAIL_USER,
    to,
    subject: subject || `How was your experience with ${companyName}?`,
    html: template?.replace(/\${customerName}/g, customerName)
      .replace(/\${companyName}/g, companyName)
      .replace(/\${feedbackUrl}/g, feedbackUrl) || defaultTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending review request email:", error);
    throw error;
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Verify your email address",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to ReviewFlow!</h2>
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
        <p>Best regards,<br>The ReviewFlow Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
}