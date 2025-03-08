'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PLANS } from '@/lib/plans';
import { Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';

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

export default function CheckoutPage({
  params,
}: {
  params: { priceId: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = Object.values(PLANS).find((p) => p.priceId === params.priceId);

  useEffect(() => {
    if (!plan) {
      router.push('/pricing');
    }
  }, [plan, router]);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/billing/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: params.priceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  if (!plan) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <Card className="bg-background border rounded-lg shadow-lg p-6 space-y-8">
          <CardContent className="space-y-6">
            {/* Header */}
            <motion.div variants={fadeInUp} className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
              <p className="text-muted-foreground">Subscribe to {plan.name}</p>
            </motion.div>

            {/* Plan Details */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="font-medium text-foreground">{plan.name}</p>
                  <p className="text-sm text-muted-foreground">Billed monthly</p>
                </div>
                <p className="text-2xl font-bold text-foreground">${plan.price}</p>
              </div>

              <div className="space-y-2">
                <p className="font-medium text-foreground">What’s Included:</p>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <motion.li
                      key={feature}
                      className="flex items-center text-sm text-muted-foreground"
                      variants={fadeInUp}
                    >
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                variants={fadeInUp}
                className="bg-destructive/10 text-destructive text-sm p-3 rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}

            {/* Buttons */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Subscribe for $${plan.price}/month`
                  )}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push('/pricing')}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </motion.div>
            </motion.div>

            {/* Footer Note */}
            <motion.p
              variants={fadeInUp}
              className="text-xs text-center text-muted-foreground"
            >
              By subscribing, you agree to our{' '}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              . You can cancel anytime.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}