"use client";

import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatDistanceToNow } from "date-fns";

interface Appointment {
  customerName: string;
}

interface FeedbackItem {
  id: string;
  score: number;
  comment?: string;
  createdAt: string;
  appointment: Appointment;
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

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-lg font-medium">Total Reviews</h3>
          <p className="text-3xl font-bold">
            {stats.reduce((acc, curr) => acc + curr._count, 0)}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium">Average Rating</h3>
          <p className="text-3xl font-bold">
            {(
              stats.reduce(
                (acc, curr) => acc + curr.score * curr._count,
                0
              ) / stats.reduce((acc, curr) => acc + curr._count, 0)
            ).toFixed(1)}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Rating Distribution</h3>
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
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Feedback</h3>
        <div className="space-y-4">
          {feedback.map((item) => (
            <div
              key={item.id}
              className="border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.appointment.customerName}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-bold">{item.score}/5</span>
                </div>
              </div>
              {item.comment && (
                <p className="mt-2 text-muted-foreground">{item.comment}</p>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}