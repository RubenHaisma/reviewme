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

export default async function AdminCompaniesPage() {
  const companies = await prisma.company.findMany({
    include: {
      _count: {
        select: {
          users: true,
          feedback: true,
          appointments: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Companies</h1>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Appointments</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.website || '-'}</TableCell>
                <TableCell>{company._count.users}</TableCell>
                <TableCell>{company._count.feedback}</TableCell>
                <TableCell>{company._count.appointments}</TableCell>
                <TableCell>
                  {company.subscriptionStatus || 'Free'}
                </TableCell>
                <TableCell>
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}