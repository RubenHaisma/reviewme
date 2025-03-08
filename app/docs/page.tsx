'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

// Static documentation data
const docs = [
  {
    category: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/introduction', keywords: ['overview', 'welcome'] },
      { title: 'Quick Start Guide', href: '/docs/quick-start', keywords: ['begin', 'tutorial'] },
      { title: 'Installation', href: '/docs/installation', keywords: ['setup', 'install'] },
      { title: 'Configuration', href: '/docs/configuration', keywords: ['settings', 'config'] },
    ],
  },
  {
    category: 'Core Concepts',
    items: [
      { title: 'Review Collection', href: '/docs/review-collection', keywords: ['reviews', 'collect'] },
      { title: 'Feedback Management', href: '/docs/feedback-management', keywords: ['feedback', 'manage'] },
      { title: 'Analytics', href: '/docs/analytics', keywords: ['stats', 'data'] },
      { title: 'Automation', href: '/docs/automation', keywords: ['auto', 'workflow'] },
    ],
  },
  {
    category: 'Integrations',
    items: [
      { title: 'VertiMart Integration', href: '/docs/integrations/vertimart', keywords: ['vertimart', 'connect'] },
      { title: 'API Reference', href: '/docs/api-reference', keywords: ['api', 'endpoint'] },
      { title: 'Webhooks', href: '/docs/webhooks', keywords: ['webhook', 'events'] },
      { title: 'Custom Integration Guide', href: '/docs/custom-integration', keywords: ['custom', 'integrate'] },
    ],
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
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4 },
};

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter docs based on search query
  const filteredDocs = docs.map((section) => ({
    ...section,
    items: section.items.filter(
      (doc) =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
  })).filter((section) => section.items.length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isAuthenticated={false} />

      <main className="py-20 bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search Section */}
            <motion.div
              className="max-w-2xl mx-auto mb-16"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
                Documentation
              </h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search documentation..."
                  className="pl-10 border-muted focus:ring-primary focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>

            {/* Documentation Grid */}
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {(searchQuery ? filteredDocs : docs).map((section) => (
                <motion.div
                  key={section.category}
                  variants={item}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-semibold text-foreground">{section.category}</h2>
                  <ul className="space-y-2">
                    {section.items.map((doc) => (
                      <motion.li
                        key={doc.title}
                        variants={item}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-foreground hover:bg-muted hover:text-primary"
                          asChild
                        >
                          <Link href={doc.href}>{doc.title}</Link>
                        </Button>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Help Section */}
            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Need Help?</h2>
              <p className="text-muted-foreground mb-6">
                Can’t find what you’re looking for? Our support team is here to assist.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}