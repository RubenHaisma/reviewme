'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Clock, Briefcase, Mail } from 'lucide-react';
import Link from 'next/link';

// Static benefits data
const benefits = [
  'Competitive salary and equity',
  'Health, dental, and vision insurance',
  'Unlimited PTO',
  'Remote-first culture',
  'Professional development budget',
  'Home office stipend',
  '401(k) matching',
  'Regular team retreats',
];

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
    transition: { staggerChildren: 0.1 },
  },
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isAuthenticated={false} />

      <main>
        {/* Hero Section */}
        <motion.section
          className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-foreground mb-6"
              variants={fadeInUp}
            >
              Careers at Raatum
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Join us in transforming how businesses manage customer feedback.
            </motion.p>
          </div>
        </motion.section>

        {/* Open Positions */}
        <motion.section
          className="py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center text-foreground mb-12"
              variants={fadeInUp}
            >
              Open Positions
            </motion.h2>
            <motion.div
              className="max-w-3xl mx-auto text-center"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.p
                className="text-lg text-muted-foreground mb-6"
                variants={fadeInUp}
              >
                There are currently no open vacancies at Raatum. We’re always on the lookout for talented individuals, so feel free to check back later or reach out to us directly.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          className="py-20 bg-muted/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-3xl font-bold text-foreground mb-12"
                variants={fadeInUp}
              >
                Why Work at Raatum?
              </motion.h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-lg bg-card border shadow-sm hover:shadow-md transition-shadow"
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                  >
                    {benefit}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}