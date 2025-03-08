'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const docs = [
  {
    category: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Quick Start Guide", href: "/docs/quick-start" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Configuration", href: "/docs/configuration" }
    ]
  },
  {
    category: "Core Concepts",
    items: [
      { title: "Review Collection", href: "/docs/review-collection" },
      { title: "Feedback Management", href: "/docs/feedback-management" },
      { title: "Analytics", href: "/docs/analytics" },
      { title: "Automation", href: "/docs/automation" }
    ]
  },
  {
    category: "Integrations",
    items: [
      { title: "VertiMart Integration", href: "/docs/integrations/vertimart" },
      { title: "API Reference", href: "/docs/api-reference" },
      { title: "Webhooks", href: "/docs/webhooks" },
      { title: "Custom Integration Guide", href: "/docs/custom-integration" }
    ]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={false} />

      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search */}
            <motion.div 
              className="max-w-2xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-center mb-8">Documentation</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search documentation..." 
                  className="pl-10"
                />
              </div>
            </motion.div>

            {/* Documentation Grid */}
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {docs.map((section) => (
                <motion.div
                  key={section.category}
                  variants={item}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-semibold">{section.category}</h2>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start hover:bg-muted"
                          asChild
                        >
                          <a href={item.href}>{item.title}</a>
                        </Button>
                      </li>
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
            >
              <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
              <p className="text-muted-foreground mb-6">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild>
                  <a href="/contact">Contact Support</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}