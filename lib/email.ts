import sgMail from "@sendgrid/mail";

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface SendFeedbackEmailParams {
  to: string;
  customerName: string;
  companyName: string;
  appointmentId: string;
}

export async function sendFeedbackEmail({
  to,
  customerName,
  companyName,
  appointmentId,
}: SendFeedbackEmailParams) {
  const feedbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/feedback/${appointmentId}`;

  const msg = {
    to,
    from: process.env.EMAIL_FROM || "",
    subject: `How was your experience with ${companyName}?`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${customerName},</h2>
        <p>Thank you for choosing ${companyName}. We'd love to hear about your experience!</p>
        <p>Please take a moment to share your feedback:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${feedbackUrl}" style="
            background-color: #000;
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
    await sgMail.send(msg);
  } catch (error) {
    console.error("Error sending feedback email:", error);
    throw error;
  }
}