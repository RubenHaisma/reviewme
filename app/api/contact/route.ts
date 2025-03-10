import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER || '',
    pass: process.env.GMAIL_APP_PASSWORD || '',
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter configuration before using it
if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
  console.warn("WARNING: Email credentials are missing. Email functionality will not work properly.");
}

export async function POST(req: Request) {
  console.log("Contact form submission received");
  try {
    const body = await req.json();
    console.log("Form data:", { 
      name: body.name, 
      email: body.email, 
      subject: body.subject,
      messageLength: body.message?.length || 0
    });
    
    const { name, email, subject, message } = contactSchema.parse(body);
    console.log("Form data validated successfully");

    // Send email to admin
    console.log("Sending email to admin...");
    const adminMailInfo = await transporter.sendMail({
      from: "info@OpiniFlow.com",
      to: process.env.GMAIL_USER, // Send to admin email
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });
    console.log("Admin email sent successfully", { messageId: adminMailInfo.messageId });

    // Send confirmation email to user
    console.log("Sending confirmation email to user...");
    const userMailInfo = await transporter.sendMail({
      from: "info@OpiniFlow.com",
      to: email,
      subject: "We've received your message",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for contacting us!</h2>
          <p>Hi ${name},</p>
          <p>We've received your message and will get back to you as soon as possible.</p>
          <p>For reference, here's a copy of your message:</p>
          <div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
            <p><strong>Subject:</strong> ${subject}</p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p>Best regards,<br>The OpiniFlow Team</p>
        </div>
      `,
    });
    console.log("User confirmation email sent successfully", { messageId: userMailInfo.messageId });

    console.log("Contact form submission completed successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", JSON.stringify(error.errors, null, 2));
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}