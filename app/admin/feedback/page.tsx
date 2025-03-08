import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default async function AdminFeedbackPage() {
  const feedback = await prisma.feedback.findMany({
    include: {
      company: true,
      appointment: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Feedback</h1>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Response</TableHead>
              <TableHead>Google</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedback.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.company.name}</TableCell>
                <TableCell>{item.appointment.customerName}</TableCell>
                <TableCell>{item.score}/5</TableCell>
                <TableCell>{item.comment || '-'}</TableCell>
                <TableCell>{item.response || '-'}</TableCell>
                <TableCell>
                  {item.redirectedToGoogle ? '✅' : '❌'}
                </TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}