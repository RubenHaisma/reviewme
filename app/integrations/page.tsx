'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Static integrations data
const integrations = [
  {
    name: 'VertiMart',
    description: 'Automatically collect feedback after appointments from your VertiMart booking system.',
    icon: '/integrations/vertimart-logo.png',
    features: [
      'Real-time appointment sync',
      'Automated feedback requests',
      'Custom timing settings',
      'Detailed analytics',
    ],
    status: 'Available',
    docsUrl: '/docs/integrations/vertimart',
  },
  {
    name: 'Calendly',
    description: 'Seamlessly integrate with Calendly to request feedback after scheduled meetings.',
    icon: '/integrations/calendly-logo.png',
    features: [
      'Meeting sync',
      'Automated follow-ups',
      'Custom templates',
      'Meeting type filtering',
    ],
    status: 'Coming Soon',
    docsUrl: '/docs/integrations/calendly',
  },
  {
    name: 'Acuity Scheduling',
    description: 'Connect your Acuity Scheduling account to automate feedback collection.',
    icon: '/integrations/acuity-logo.png',
    features: [
      'Appointment sync',
      'Service-based templates',
      'Staff filtering',
      'Custom delay settings',
    ],
    status: 'Coming Soon',
    docsUrl: '/docs/integrations/acuity',
  },
  {
    name: 'API Integration',
    description: 'Build your own custom integration using our comprehensive API.',
    icon: '/integrations/api-logo.png',
    features: [
      'RESTful API',
      'Webhook support',
      'Detailed documentation',
      'Developer support',
    ],
    status: 'Available',
    docsUrl: '/docs/api-reference',
  },
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
    transition: { staggerChildren: 0.2 },
  },
};

export default function IntegrationsPage() {
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
              Seamless Integrations
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Connect Raatum with your tools to streamline feedback collection and insights.
            </motion.p>
          </div>
        </motion.section>

        {/* Integrations Grid */}
        <motion.section
          className="py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {integrations.map((integration) => (
                <motion.div key={integration.name} variants={fadeInUp}>
                  <Card className="p-6 h-full hover:shadow-xl transition-shadow border-muted">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg border p-2 bg-white flex-shrink-0">
                        <Image
                          src={integration.icon}
                          alt={`${integration.name} logo`}
                          width={48}
                          height={48}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-semibold text-foreground">{integration.name}</h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              integration.status === 'Coming Soon'
                                ? 'bg-muted text-muted-foreground'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {integration.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{integration.description}</p>
                        <ul className="space-y-2">
                          {integration.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-primary" />
                              <span className="text-sm text-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link href={integration.docsUrl}>
                            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                              View Documentation
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
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
              Need a Custom Integration?
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Don’t see your tool listed? Contact us to explore custom solutions tailored to your needs.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Contact Us
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/docs/api-reference">
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                    View API Docs
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}