'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, ChartBar, MessageCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const isAuthenticated = false;

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={isAuthenticated} />

      {/* Hero Section */}
      <motion.header 
        className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background pt-32 pb-40"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            <motion.h1 
              className="text-4xl font-bold tracking-tight text-primary sm:text-6xl mb-6"
              variants={fadeInUp}
            >
              Transform Your Customer Reviews
            </motion.h1>
            <motion.p 
              className="text-lg leading-8 text-muted-foreground mb-10"
              variants={fadeInUp}
            >
              Start collecting and managing customer feedback today. Get your first 20 customers completely free,
              then choose a plan that grows with your business.
            </motion.p>
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4"
              variants={fadeInUp}
            >
              <Link href="/auth/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* Features Section */}
      <motion.section 
        className="py-24 bg-muted/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Star,
                title: "Automated Review Collection",
                description: "Automatically send review requests after customer appointments"
              },
              {
                icon: ChartBar,
                title: "Analytics Dashboard",
                description: "Track your review performance with detailed analytics"
              },
              {
                icon: MessageCircle,
                title: "Feedback Management",
                description: "Handle negative feedback internally and improve customer satisfaction"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                variants={fadeInUp}
              >
                <motion.div 
                  className="rounded-2xl bg-primary p-3 text-primary-foreground"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <feature.icon className="h-6 w-6" />
                </motion.div>
                <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Integrations Section */}
      <motion.section 
        className="py-24 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold">Integrated with Your Favorite Tools</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Connect with popular booking systems and CRMs
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Vertimart Integration",
                description: "Seamlessly connect with Vertimart's booking system to automate review collection",
                link: "/dashboard/integrations"
              },
              {
                title: "Calendly",
                description: "Integrate with Calendly to automatically request reviews after appointments",
                link: "/dashboard/integrations"
              },
              {
                title: "Custom Integration",
                description: "Use our API to build custom integrations for your specific needs",
                link: "/docs/api-reference"
              }
            ].map((integration, index) => (
              <motion.div
                key={index}
                className="border rounded-lg p-6 hover:border-primary transition-all duration-300 hover:shadow-lg"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold mb-2">{integration.title}</h3>
                <p className="text-muted-foreground mb-4">{integration.description}</p>
                <Link href={integration.link}>
                  <Button variant="outline" className="w-full group">
                    Connect
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Free Tier Section */}
      <motion.section 
        className="py-24 bg-muted/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-primary">Start Free, Scale As You Grow</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get started with no upfront costs
            </p>
          </motion.div>
          <motion.div 
            className="max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            <motion.div 
              className="bg-background rounded-lg shadow-lg border p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold mb-6">Free Starter Package</h3>
              <ul className="space-y-4">
                {[
                  'First 20 customers completely free',
                  'Full access to all features',
                  'Automated review collection',
                  'Basic analytics dashboard',
                  'Email notifications',
                ].map((feature, index) => (
                  <motion.li 
                    key={feature} 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div 
                className="mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/auth/register">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}