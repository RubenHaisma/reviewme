'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';
import {
  CheckCircle,
  Star,
  Mail,
  MessageSquare,
  BarChart,
  Settings,
} from 'lucide-react';

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

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navigation isAuthenticated={false} />

      {/* Hero Section */}
      <motion.section
        className="py-20 bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4">
          <motion.div className="max-w-3xl mx-auto text-center" variants={fadeInUp}>
            <motion.h1
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6"
              variants={fadeInUp}
            >
              How Raatum Works
            </motion.h1>
            <motion.p className="text-lg text-muted-foreground mb-12" variants={fadeInUp}>
              A simple, automated way to collect and manage customer reviews.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Steps Section */}
      <motion.section
        className="py-20 bg-muted/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="grid gap-12 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Settings,
                title: '1. Easy Setup',
                desc: 'Create your account and connect your booking system in minutes.',
              },
              {
                icon: Mail,
                title: '2. Automated Requests',
                desc: 'Customers receive review requests automatically after appointments.',
              },
              {
                icon: Star,
                title: '3. Collect Reviews',
                desc: 'Happy customers go to Google; others provide private feedback.',
              },
              {
                icon: MessageSquare,
                title: '4. Manage Feedback',
                desc: 'Respond to feedback and address concerns privately.',
              },
              {
                icon: BarChart,
                title: '5. Track Progress',
                desc: 'Monitor review performance with detailed analytics.',
              },
              {
                icon: CheckCircle,
                title: '6. Grow Your Business',
                desc: 'Build trust and attract customers with positive reviews.',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-4">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-background"
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
            Key Features
          </motion.h2>
          <motion.div
            className="grid gap-8 md:grid-cols-2"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              variants={fadeInUp}
              className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">Smart Review Routing</h3>
              <ul className="space-y-3">
                {[
                  'Automatically direct happy customers to Google',
                  'Collect private feedback from dissatisfied customers',
                  'Prevent negative reviews before they go public',
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">Automated Workflow</h3>
              <ul className="space-y-3">
                {[
                  'Seamless integration with your booking system',
                  'Customizable email templates',
                  'Perfect timing for review requests',
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-muted/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-bold text-foreground mb-6"
            variants={fadeInUp}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground mb-8"
            variants={fadeInUp}
          >
            Join thousands of businesses using Raatum to boost their online reputation.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={fadeInUp}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/auth/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Free Trial
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/pricing">
                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}