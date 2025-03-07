'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { formatDistanceToNow, format } from "date-fns";
import { Star, TrendingUp, TrendingDown, Link as LinkIcon, MessageSquare, Users, Copy } from "lucide-react";
import { toast } from "sonner";

interface Appointment {
  customerName: string;
  id: string;
}

interface FeedbackItem {
  id: string;
  score: number;
  comment?: string;
  createdAt: string;
  appointment: Appointment;
  response?: string | null;
}

interface StatItem {
  score: number;
  _count: number;
}

interface DashboardOverviewProps {
  feedback: FeedbackItem[];
  stats: StatItem[];
}

export function DashboardOverview({ feedback, stats }: DashboardOverviewProps) {
  const chartData = stats.map((stat) => ({
    score: stat.score,
    count: stat._count,
  }));

  const totalReviews = stats.reduce((acc, curr) => acc + curr._count, 0);
  const averageRating = totalReviews > 0
    ? stats.reduce((acc, curr) => acc + curr.score * curr._count, 0) / totalReviews
    : 0;
  
  const positiveReviews = stats
    .filter((stat) => stat.score >= 4)
    .reduce((acc, curr) => acc + curr._count, 0);
  const negativeReviews = stats
    .filter((stat) => stat.score <= 2)
    .reduce((acc, curr) => acc + curr._count, 0);
  
  const responseRate = feedback.filter((item) => item.response).length / feedback.length * 100;

  const copyFeedbackUrl = (appointmentId: string) => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/feedback/${appointmentId}`;
    navigator.clipboard.writeText(url);
    toast.success("Feedback URL copied to clipboard");
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
              <h3 className="text-2xl font-bold">{totalReviews}</h3>
            </div>
            <MessageSquare className="h-8 w-8 text-primary opacity-75" />
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <span>Lifetime total</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
              <h3 className="text-2xl font-bold">{averageRating.toFixed(1)}</h3>
            </div>
            <Star className="h-8 w-8 text-primary opacity-75" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(averageRating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Positive Reviews</p>
              <h3 className="text-2xl font-bold">{((positiveReviews / totalReviews) * 100).toFixed(1)}%</h3>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500 opacity-75" />
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <span>{positiveReviews} reviews rated 4+ stars</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
              <h3 className="text-2xl font-bold">{responseRate.toFixed(1)}%</h3>
            </div>
            <Users className="h-8 w-8 text-primary opacity-75" />
          </div>
          <div className="mt-4 flex items-center text-sm text-muted-foreground">
            <span>{feedback.filter((item) => item.response).length} responses sent</span>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Rating Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="score" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" name="Reviews" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Review Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="score" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Reviews"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Recent Feedback</h3>
          <Link href="/dashboard/feedback">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>
        <div className="space-y-4">
          {feedback.map((item) => (
            <div key={item.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <LinkIcon className="h-4 w-4" />
                  <span>Feedback URL:</span>
                  <code className="px-2 py-1 bg-muted rounded">
                    {`${process.env.NEXT_PUBLIC_APP_URL}/feedback/${item.appointment.id}`}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => copyFeedbackUrl(item.appointment.id)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Link href={`/dashboard/feedback/${item.id}`}>
                <div className="hover:bg-muted/50 p-4 rounded-lg transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.appointment.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(item.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.score
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-bold">{item.score}/5</span>
                    </div>
                  </div>
                  {item.comment && (
                    <p className="mt-2 text-muted-foreground line-clamp-2">{item.comment}</p>
                  )}
                  {item.response ? (
                    <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>Response sent {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span>
                    </div>
                  ) : (
                    <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>No response yet</span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}