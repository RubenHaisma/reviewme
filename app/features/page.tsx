'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { CheckCircle } from 'lucide-react';

const features = [
  {
    title: "Smart Review Routing",
    description: "Automatically direct positive reviews to Google while managing negative feedback privately.",
    items: [
      "Intelligent feedback filtering",
      "Automated Google review redirection",
      "Private feedback management",
      "Custom review thresholds"
    ]
  },
  {
    title: "Automated Workflows",
    description: "Streamline your review collection process with powerful automation tools.",
    items: [
      "Scheduled review requests",
      "Custom email templates",
      "Multi-channel integration",
      "Follow-up automation"
    ]
  },
  {
    title: "Advanced Analytics",
    description: "Gain valuable insights from your customer feedback with detailed analytics.",
    items: [
      "Real-time dashboard",
      "Sentiment analysis",
      "Trend reporting",
      "Custom reports"
    ]
  },
  {
    title: "Integration Hub",
    description: "Connect with your favorite tools and platforms seamlessly.",
    items: [
      "API access",
      "Webhook support",
      "CRM integration",
      "Custom integrations"
    ]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={false} />

      <main>
        {/* Hero Section */}
        <motion.section 
          className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/10 to-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Powerful Features for
              <br />
              <span className="text-primary">Better Reviews</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Everything you need to collect, manage, and leverage customer feedback effectively
            </motion.p>
          </div>
        </motion.section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={item}
                  className="relative p-8 rounded-xl bg-card hover:bg-accent/50 transition-colors border"
                >
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}