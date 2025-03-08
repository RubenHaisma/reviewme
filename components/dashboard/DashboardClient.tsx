'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DashboardOverview } from '@/components/dashboard/overview';
import { FeedbackItem, StatItem, CompanyData } from '@/lib/types';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

interface DashboardClientProps {
  feedback: FeedbackItem[];
  stats: StatItem[];
  company: CompanyData | null;
  totalCustomers: number;
  usagePercentage: number;
}


export default function DashboardClient({
  feedback,
  stats,
  company,
  totalCustomers,
  usagePercentage,
}: DashboardClientProps) {
  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Header Section */}
      <motion.h1
        className="text-3xl font-bold text-foreground mb-8"
        variants={fadeInUp}
      >
        Dashboard
      </motion.h1>

      {/* Overview Section */}
      <motion.div variants={fadeInUp} className="space-y-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Overview</h2>
        <DashboardOverview feedback={feedback} stats={stats} />
      </motion.div>

      {/* Upgrade Suggestion */}
      {!company?.subscriptionStatus && (
        <motion.div variants={fadeInUp} className="mt-12 text-center">
          <Card className="p-6 bg-muted border">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Unlock More with Raatum Pro
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upgrade to a paid plan to access advanced analytics, custom feedback forms, and unlimited responses. Start growing your business today!
            </p>
            <Link href="/dashboard/billing">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Upgrade to Pro
                </Button>
              </motion.div>
            </Link>
          </Card>
        </motion.div>
      )}

      {/* Free Tier Usage (Conditionally Rendered) */}
      {company && !company.subscriptionStatus && company.remainingFreeCustomers !== null && (
        <motion.div variants={fadeInUp} className="mt-12">
          <Card className="p-6 bg-primary/5 border border-primary">
            <motion.h3
              className="text-lg font-semibold text-primary mb-2"
              variants={fadeInUp}
            >
              Free Tier Usage
            </motion.h3>
            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{company.remainingFreeCustomers} customers remaining</span>
                <span>{totalCustomers}/20 used</span>
              </div>
              <Progress value={usagePercentage} className="h-2" />
            </motion.div>
            {company.remainingFreeCustomers <= 5 && (
              <motion.div variants={fadeInUp} className="mt-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  {company.remainingFreeCustomers === 0
                    ? "You've used all your free feedback responses. Upgrade now to continue collecting feedback."
                    : `You're approaching your free tier limit. Only ${company.remainingFreeCustomers} feedback responses remaining.`}
                </p>
                <Link href="/dashboard/billing">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full">
                      {company.remainingFreeCustomers === 0 ? 'Upgrade Now' : 'View Plans'}
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}