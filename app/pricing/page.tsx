'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';
import { CheckCircle } from 'lucide-react';
import { PLANS } from '@/lib/plans'; // Updated import

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

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isAuthenticated={false} />

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
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p className="text-lg text-muted-foreground" variants={fadeInUp}>
              Start free with 20 customers, then scale with a plan that fits your business.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 bg-muted/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Free Tier */}
            <motion.div
              variants={fadeInUp}
              className="border bg-background rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold text-foreground mb-2">Free Trial</h3>
              <p className="text-muted-foreground mb-4">Perfect for getting started</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>20 customers included</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>Email notifications</span>
                </li>
              </ul>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/auth/register">
                  <Button className="w-full bg-primary hover:bg-primary/90">Start Free Trial</Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Basic Plan */}
            <motion.div
              variants={fadeInUp}
              className="border bg-background rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold text-foreground mb-2">{PLANS.BASIC.name}</h3>
              <p className="text-muted-foreground mb-4">For growing businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">${PLANS.BASIC.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {PLANS.BASIC.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={`/checkout/${PLANS.BASIC.priceId}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90">Choose Basic</Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              variants={fadeInUp}
              className="border bg-background rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{PLANS.PRO.name}</h3>
              <p className="text-muted-foreground mb-4">For serious businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">${PLANS.PRO.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {PLANS.PRO.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={`/checkout/${PLANS.PRO.priceId}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90">Choose Pro</Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
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
            Frequently Asked Questions
          </motion.h2>
          <motion.div
            className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold text-foreground mb-2">What happens after the free trial?</h3>
              <p className="text-muted-foreground">
                After your 20 free customers, upgrade to Basic or Pro to keep using Raatum.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold text-foreground mb-2">Can I switch plans later?</h3>
              <p className="text-muted-foreground">
                Yes, upgrade or downgrade anytime—changes apply in your next billing cycle.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold text-foreground mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                We provide a 30-day money-back guarantee if you’re not satisfied.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-semibold text-foreground mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept major credit cards via our secure processor, Stripe.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}