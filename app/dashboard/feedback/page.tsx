import { auth, authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";

interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
  companyId: number | null;
}

interface CustomSession extends Record<string, unknown> {
  user?: CustomUser;
}

export default async function FeedbackPage() {
  const session = (await auth()) as CustomSession | null;

  if (!session?.user?.companyId) {
    redirect("/auth/register");
  }

  const feedback = await prisma.feedback.findMany({
    where: { companyId: String(session.user.companyId) },
    include: { appointment: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customer Feedback</h1>
          <p className="text-muted-foreground">View and manage customer reviews</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Input 
            placeholder="Search feedback..." 
            className="max-w-[300px]"
          />
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {feedback.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < item.score
                            ? "fill-primary stroke-primary"
                            : "stroke-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <h3 className="font-medium">{item.appointment.customerName}</h3>
                {item.comment && (
                  <p className="mt-2 text-muted-foreground">{item.comment}</p>
                )}
              </div>
              {item.response && (
                <div className="bg-muted/50 p-4 rounded-lg max-w-[400px]">
                  <p className="text-sm font-medium mb-1">Your Response:</p>
                  <p className="text-sm text-muted-foreground">{item.response}</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}