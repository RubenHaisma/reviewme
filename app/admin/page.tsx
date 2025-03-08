import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminDashboard() {
  // Fetch statistics
  const [
    totalUsers,
    totalCompanies,
    totalFeedback,
    totalAppointments,
    recentFeedback,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.company.count(),
    prisma.feedback.count(),
    prisma.appointment.count(),
    prisma.feedback.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        company: true,
        appointment: true,
      },
    }),
  ]);

  // Calculate average rating
  const feedbackStats = await prisma.feedback.aggregate({
    _avg: { score: true },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Companies</h3>
          <p className="text-2xl font-bold">{totalCompanies}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Feedback</h3>
          <p className="text-2xl font-bold">{totalFeedback}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Average Rating</h3>
          <p className="text-2xl font-bold">{feedbackStats._avg.score?.toFixed(1) || 0}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Recent Feedback</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentFeedback.map((feedback) => (
              <TableRow key={feedback.id}>
                <TableCell>{feedback.company.name}</TableCell>
                <TableCell>{feedback.appointment.customerName}</TableCell>
                <TableCell>{feedback.score}/5</TableCell>
                <TableCell>
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}