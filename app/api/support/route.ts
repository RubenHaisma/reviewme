// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendSupportRequestEmail } from '@/lib/email'; // Only import sendSupportRequestEmail

export async function POST(req: NextRequest) {
  try {
    const { name, email, orderId, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Generate support ticket ID
    const ticketId = `TICKET-${Date.now().toString(36).toUpperCase()}`;

    // Send confirmation email to the user
    await sendSupportRequestEmail({
      to: email,
      name,
      email,
      orderId: orderId || '',
      subject: subject || 'Support Request',
      message,
      ticketId,
    });

    // Send notification email to support team
    await sendSupportRequestEmail({
      to: process.env.SUPPORT_EMAIL!,
      name,
      email,
      orderId: orderId || '',
      subject: subject || 'Support Request',
      message,
      ticketId,
    });

    return NextResponse.json({
      success: true,
      ticketId,
      message: 'Support request submitted successfully',
    });
  } catch (error) {
    console.error('Support request error:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your support request' },
      { status: 500 }
    );
  }
}