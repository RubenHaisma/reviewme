'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
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
    transition: { staggerChildren: 0.1 },
  },
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navigation isAuthenticated={false} />

      {/* Main Content */}
      <main className="py-20 bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Hero Section */}
            <motion.div
              className="text-center mb-16"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h1
                className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6"
                variants={fadeInUp}
              >
                Cookie Policy
              </motion.h1>
              <motion.p
                className="text-lg text-muted-foreground"
                variants={fadeInUp}
              >
                Learn how we use cookies to enhance your experience on OpiniFlow.com.
              </motion.p>
            </motion.div>

            {/* Cookies Information */}
            <motion.div
              className="space-y-12"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* What Are Cookies */}
              <motion.section variants={fadeInUp}>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  What Are Cookies?
                </h2>
                <p className="text-muted-foreground">
                  Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, improve site functionality, and analyze how you use our service. At OpiniFlow.com, we use cookies to ensure a seamless and personalized experience.
                </p>
              </motion.section>

              {/* How We Use Cookies */}
              <motion.section variants={fadeInUp}>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  How We Use Cookies
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>
                      <strong>Essential Cookies:</strong> These are necessary for the site to function, like keeping you logged in or enabling core features.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>
                      <strong>Performance Cookies:</strong> These help us understand how you interact with our site, allowing us to optimize performance and fix issues.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>
                      <strong>Analytics Cookies:</strong> We use these to gather insights about site usage, such as page views and time spent, to improve our content and services.
                    </span>
                  </li>
                </ul>
              </motion.section>

              {/* Managing Cookies */}
              <motion.section variants={fadeInUp}>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Managing Cookies
                </h2>
                <p className="text-muted-foreground">
                  You can control cookies through our consent tool, which appears when you first visit OpiniFlow.com. Additionally, you can manage or delete cookies via your browser settings. Note that disabling essential cookies may affect site functionality.
                </p>
              </motion.section>

              {/* Contact Us */}
              <motion.section variants={fadeInUp}>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Questions?
                </h2>
                <p className="text-muted-foreground mb-6">
                  If you have any questions about our use of cookies or data practices, feel free to reach out.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex justify-center"
                >
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </motion.div>
              </motion.section>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}