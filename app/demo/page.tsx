'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    id: 'collect',
    title: 'Collect Feedback',
    description: 'After each appointment, automatically send personalized review requests.',
  },
  {
    id: 'rate',
    title: 'Customer Rating',
    description: 'Customers rate their experience quickly and easily.',
  },
  {
    id: 'route',
    title: 'Smart Routing',
    description: 'Positive reviews go to Google, while improvement feedback comes to you privately.',
  },
  {
    id: 'respond',
    title: 'Quick Response',
    description: 'Respond to feedback promptly and professionally.',
  },
  {
    id: 'analyze',
    title: 'Analyze & Improve',
    description: 'Track trends and insights to continuously enhance your service.',
  },
];

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [rating, setRating] = useState<number | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRatingSubmit = () => {
    if (!rating) return;
    
    if (rating >= 4) {
      window.open('https://google.com/business', '_blank');
      setShowSuccess(true);
    } else {
      setShowFeedbackForm(true);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const resetDemo = () => {
    setRating(null);
    setShowFeedbackForm(false);
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={false} />

      <main>
        {/* Hero Section */}
        <motion.section
          className="py-20 bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl font-bold mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                See OpiniFlow in Action
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Experience how OpiniFlow helps you collect and manage customer feedback
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Interactive Demo Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Progress Steps */}
              <div className="mb-12">
                <div className="flex justify-between relative">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="flex flex-col items-center relative z-10"
                    >
                      <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          index <= currentStep
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                        animate={{
                          scale: index === currentStep ? [1, 1.1, 1] : 1,
                        }}
                        transition={{ duration: 0.5, repeat: index === currentStep ? Infinity : 0 }}
                      >
                        {index < currentStep ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </motion.div>
                      <div className="absolute top-16 w-32 text-center">
                        <p className="font-medium mb-1">{step.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="absolute top-5 left-0 w-full h-[2px] bg-muted -z-10">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: '0%' }}
                      animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Interactive Demo Area */}
              <div className="mt-32">
                <AnimatePresence mode="wait">
                  {!showSuccess && !showFeedbackForm && (
                    <motion.div
                      key="rating"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center"
                    >
                      <Card className="p-8 max-w-xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6">
                          How was your experience with Demo Company?
                        </h2>
                        <div className="flex justify-center gap-4 mb-8">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <motion.button
                              key={value}
                              onClick={() => setRating(value)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2"
                            >
                              <Star
                                className={`w-12 h-12 ${
                                  value <= (rating || 0)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            </motion.button>
                          ))}
                        </div>
                        <Button
                          onClick={handleRatingSubmit}
                          disabled={!rating}
                          className="w-full"
                        >
                          Submit Rating
                        </Button>
                      </Card>
                    </motion.div>
                  )}

                  {showFeedbackForm && (
                    <motion.div
                      key="feedback"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Card className="p-8 max-w-xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6">
                          Help us improve our service
                        </h2>
                        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                          <div>
                            <Label htmlFor="feedback">What could we do better?</Label>
                            <Input
                              id="feedback"
                              placeholder="Share your thoughts..."
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="suggestion">Any specific suggestions?</Label>
                            <Input
                              id="suggestion"
                              placeholder="Your suggestions help us improve"
                              className="mt-1"
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Submit Feedback
                          </Button>
                        </form>
                      </Card>
                    </motion.div>
                  )}

                  {showSuccess && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center"
                    >
                      <Card className="p-8 max-w-xl mx-auto">
                        <div className="flex justify-center mb-4">
                          <CheckCircle className="w-16 h-16 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                        <p className="text-muted-foreground mb-8">
                          Your feedback helps us improve our service.
                        </p>
                        <div className="space-y-4">
                          <Button onClick={resetDemo} variant="outline" className="w-full">
                            Try Demo Again
                          </Button>
                          <Link href="/auth/register">
                            <Button className="w-full">
                              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}