'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
    transition: { staggerChildren: 0.2 },
  },
};

export function InteractiveDemo() {
  const [demoStep, setDemoStep] = useState<'initial' | 'rating' | 'feedback' | 'google'>('initial');
  const [rating, setRating] = useState<number | null>(null);

  const handleRatingSubmit = () => {
    if (!rating) return;
    if (rating >= 4) {
      setDemoStep('google');
    } else {
      setDemoStep('feedback');
    }
  };

  const handleReset = () => {
    setDemoStep('initial');
    setRating(null);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {demoStep === 'initial' && (
            <motion.div
              className="text-center space-y-6"
              variants={fadeInUp}
            >
              <motion.div
                className="inline-flex items-center mb-4 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary"
                variants={fadeInUp}
              >
                <Star className="mr-2 h-4 w-4" />
                Interactive Demo
              </motion.div>
              
              <h2 className="text-4xl font-bold text-foreground">
                Experience Your Customer&apos;s Journey
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See how OpiniFlow makes collecting and managing reviews effortless
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="mt-8"
                  onClick={() => setDemoStep('rating')}
                >
                  Start Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {demoStep === 'rating' && (
            <Card className="p-8 max-w-xl mx-auto">
              <motion.div
                className="text-center space-y-6"
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-bold">
                  How was your experience with Demo Company?
                </h3>
                
                <div className="flex justify-center gap-4">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <motion.button
                      key={value}
                      onClick={() => setRating(value)}
                      className={`p-4 rounded-full transition-colors ${
                        rating === value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Star className={`h-8 w-8 ${rating === value ? 'fill-current' : ''}`} />
                    </motion.button>
                  ))}
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleRatingSubmit}
                  disabled={!rating}
                >
                  Submit Rating
                </Button>
              </motion.div>
            </Card>
          )}

          {demoStep === 'feedback' && (
            <Card className="p-8 max-w-xl mx-auto">
              <motion.div
                className="space-y-6"
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-bold text-center">
                  Thank you for your feedback
                </h3>
                
                <p className="text-center text-muted-foreground">
                  Your feedback helps us improve our service. Would you like to share more details about your experience?
                </p>

                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={handleReset}>
                    Skip
                  </Button>
                  <Button onClick={handleReset}>
                    Share Details
                  </Button>
                </div>
              </motion.div>
            </Card>
          )}

          {demoStep === 'google' && (
            <Card className="p-8 max-w-xl mx-auto">
              <motion.div
                className="space-y-6"
                variants={fadeInUp}
              >
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-center">
                  Thanks for the great rating!
                </h3>
                
                <p className="text-center text-muted-foreground">
                  Would you mind sharing your experience on Google to help other customers?
                </p>

                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={handleReset}>
                    Maybe Later
                  </Button>
                  <Button onClick={handleReset}>
                    Review on Google
                  </Button>
                </div>
              </motion.div>
            </Card>
          )}

          {demoStep !== 'initial' && (
            <motion.div
              className="mt-8 text-center"
              variants={fadeInUp}
            >
              <p className="text-sm text-muted-foreground mb-4">
                This is how your customers experience OpiniFlow
              </p>
              <Link href="/auth/register">
                <Button variant="outline">
                  Try It For Free
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}