'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

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
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  useEffect(() => {
    if (!session_id) {
      router.push('/pricing');
    }
  }, [session_id, router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <Card className="bg-background border rounded-lg shadow-lg p-6 space-y-8 text-center">
          <CardContent className="space-y-6">
            {/* Icon */}
            <motion.div variants={fadeInUp} className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </motion.div>

            {/* Message */}
            <motion.div variants={fadeInUp} className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Thank You!</h1>
              <p className="text-muted-foreground">
                Your subscription has been successfully activated.
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => router.push('/dashboard')}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Go to Dashboard
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={() => router.push('/dashboard/billing')}
                  className="w-full"
                >
                  View Billing Details
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}