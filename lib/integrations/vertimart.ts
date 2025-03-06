import { prisma } from "@/lib/prisma";

interface VertiMartAppointment {
  id: string;
  customerName: string;
  customerEmail: string;
  appointmentDate: string;
  service: string;
}

export async function handleVertiMartWebhook(
  companyId: string,
  data: VertiMartAppointment
) {
  try {
    // Create appointment record
    const appointment = await prisma.appointment.create({
      data: {
        companyId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        date: new Date(data.appointmentDate),
      },
    });

    // Schedule feedback email
    const feedbackDate = new Date(data.appointmentDate);
    feedbackDate.setHours(feedbackDate.getHours() + 2); // Send 2 hours after appointment

    // You would implement your email scheduling logic here
    // For example, using a job queue system

    return appointment;
  } catch (error) {
    console.error("Error handling VertiMart webhook:", error);
    throw error;
  }
}

export async function verifyVertiMartWebhook(
  signature: string,
  payload: string
): Promise<boolean> {
  // Implement VertiMart's webhook signature verification
  // This would depend on their specific security requirements
  return true;
}