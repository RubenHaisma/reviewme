'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
} from 'recharts';
import { formatDistanceToNow } from 'date-fns';
import {
  Star,
  TrendingUp,
  Link as LinkIcon,
  MessageSquare,
  Users,
  Copy,
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { FeedbackItem, StatItem } from '@/lib/types';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

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
  const averageRating =
    totalReviews > 0
      ? stats.reduce((acc, curr) => acc + curr.score * curr._count, 0) / totalReviews
      : 0;

  const positiveReviews = stats
    .filter((stat) => stat.score >= 4)
    .reduce((acc, curr) => acc + curr._count, 0);
  const negativeReviews = stats
    .filter((stat) => stat.score <= 2)
    .reduce((acc, curr) => acc + curr._count, 0);

  const responseRate =
    feedback.length > 0
      ? (feedback.filter((item) => item.response).length / feedback.length) * 100
      : 0;

  const copyFeedbackUrl = (appointmentId: string) => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/feedback/${appointmentId}`;
    navigator.clipboard.writeText(url);
    toast.success('Feedback URL copied to clipboard');
  };

  return (
    <motion.div
      className="space-y-8"
      initial="initial"
      animate="animate"
      variants={stagger}
    >
      {/* Stats Cards */}
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={stagger}
      >
        <motion.div variants={fadeInUp} {...hoverScale}>
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
                <h3 className="text-2xl font-bold">{totalReviews}</h3>
              </div>
              <MessageSquare className="h-8 w-8 text-primary opacity-75" />
            </div>
            <div className="mt-4 text-sm text-muted-foreground">Lifetime total</div>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp} {...hoverScale}>
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <h3 className="text-2xl font-bold">{averageRating.toFixed(1)}</h3>
              </div>
              <Star className="h-8 w-8 text-primary opacity-75" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 transition-colors ${
                    i < Math.round(averageRating)
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp} {...hoverScale}>
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Positive Reviews</p>
                <h3 className="text-2xl font-bold">
                  {((positiveReviews / totalReviews) * 100).toFixed(1)}%
                </h3>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500 opacity-75" />
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              {positiveReviews} reviews rated 4+ stars
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp} {...hoverScale}>
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                <h3 className="text-2xl font-bold">{responseRate.toFixed(1)}%</h3>
              </div>
              <Users className="h-8 w-8 text-primary opacity-75" />
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              {feedback.filter((item) => item.response).length} responses sent
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        className="grid gap-6 md:grid-cols-2"
        variants={stagger}
      >
        <motion.div variants={fadeInUp} {...hoverScale}>
          <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-blue-50 border-blue-200">
            <h4 className="text-lg font-medium text-blue-800 mb-4">Rating Distribution</h4>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="score" stroke="#1E40AF" />
                  <YAxis stroke="#1E40AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#EFF6FF',
                      border: '1px solid #1E40AF',
                      color: '#1E40AF',
                    }}
                  />
                  <Legend wrapperStyle={{ color: '#1E40AF' }} />
                  <Bar dataKey="count" fill="#3B82F6" name="Reviews" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp} {...hoverScale}>
          <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-blue-50 border-blue-200">
            <h4 className="text-lg font-medium text-blue-800 mb-4">Review Trend</h4>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="score" stroke="#1E40AF" />
                  <YAxis stroke="#1E40AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#EFF6FF',
                      border: '1px solid #1E40AF',
                      color: '#1E40AF',
                    }}
                  />
                  <Legend wrapperStyle={{ color: '#1E40AF' }} />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    name="Reviews"
                    dot={{ fill: '#3B82F6', stroke: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent Feedback Section */}
      <motion.div variants={fadeInUp} {...hoverScale}>
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <motion.h3
              className="text-lg font-medium"
              variants={fadeInUp}
            >
              Recent Feedback
            </motion.h3>
            <Link href="/dashboard/feedback">
              <motion.div {...hoverScale}>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </motion.div>
            </Link>
          </div>
          <motion.div variants={stagger} className="space-y-4">
            {feedback.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
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
                  <motion.div
                    className="hover:bg-muted/50 p-4 rounded-lg transition-colors"
                    {...hoverScale}
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
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 transition-colors ${
                                i < item.score
                                  ? 'fill-primary text-primary'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-lg font-bold">{item.score}/5</span>
                      </div>
                    </div>
                    {item.comment && (
                      <p className="mt-2 text-muted-foreground line-clamp-2">
                        {item.comment}
                      </p>
                    )}
                    {item.response ? (
                      <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>
                          Response sent{' '}
                          {formatDistanceToNow(new Date(item.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    ) : (
                      <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>No response yet</span>
                      </div>
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
}