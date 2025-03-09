// app/api/notifications/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    // Use getToken to retrieve the session token from the request
    const token = await getToken({ req: req as NextRequest, secret: authOptions.secret });

    if (!token?.companyId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const notifications = await prisma.feedback.findMany({
      where: {
        companyId: token.companyId,
        score: { lte: 3 }, // Only get notifications for scores of 3 or less
        response: null, // Only get unresponded feedback
      },
      include: {
        appointment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10, // Limit to 10 most recent notifications
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Use getToken to retrieve the session token from the request
    const token = await getToken({ req: req as NextRequest, secret: authOptions.secret });

    if (!token?.companyId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { feedbackId, read } = body;

    const notification = await prisma.feedback.update({
      where: {
        id: feedbackId,
        companyId: token.companyId,
      },
      data: {
        read: read,
      },
    });

    return NextResponse.json(notification);
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}