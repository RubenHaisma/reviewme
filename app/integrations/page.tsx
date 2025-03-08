import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const integrations = [
  {
    name: "VertiMart",
    description: "Automatically collect feedback after appointments from your VertiMart booking system.",
    icon: "/integrations/vertimart-logo.png",
    features: [
      "Real-time appointment sync",
      "Automated feedback requests",
      "Custom timing settings",
      "Detailed analytics",
    ],
    status: "Available",
    docsUrl: "/docs/integrations/vertimart",
  },
  {
    name: "Calendly",
    description: "Seamlessly integrate with Calendly to request feedback after scheduled meetings.",
    icon: "/integrations/calendly-logo.png",
    features: [
      "Meeting sync",
      "Automated follow-ups",
      "Custom templates",
      "Meeting type filtering",
    ],
    status: "Coming Soon",
    docsUrl: "/docs/integrations/calendly",
  },
  {
    name: "Acuity Scheduling",
    description: "Connect your Acuity Scheduling account to automate feedback collection.",
    icon: "/integrations/acuity-logo.png",
    features: [
      "Appointment sync",
      "Service-based templates",
      "Staff filtering",
      "Custom delay settings",
    ],
    status: "Coming Soon",
    docsUrl: "/docs/integrations/acuity",
  },
  {
    name: "API Integration",
    description: "Build your own custom integration using our comprehensive API.",
    icon: "/integrations/api-logo.png",
    features: [
      "RESTful API",
      "Webhook support",
      "Detailed documentation",
      "Developer support",
    ],
    status: "Available",
    docsUrl: "/docs/api-reference",
  },
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

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={false} />

      <main>
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
              Powerful Integrations
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Connect Raatum with your favorite tools and automate your feedback collection
            </motion.p>
          </div>
        </motion.section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {integrations.map((integration) => (
                <motion.div key={integration.name} variants={item}>
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg border p-2 bg-white">
                        <img
                          src={integration.icon}
                          alt={`${integration.name} logo`}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{integration.name}</h3>
                          {integration.status === "Coming Soon" ? (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-muted">
                              Coming Soon
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                              Available
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {integration.description}
                        </p>
                        <ul className="space-y-2 mb-6">
                          {integration.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-primary" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Link href={integration.docsUrl}>
                          <Button variant="outline" className="w-full">
                            View Documentation
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Need a Custom Integration?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don&apos;t see the integration you need? Our team can help you build a custom solution 
              that fits your specific requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg">Contact Us</Button>
              </Link>
              <Link href="/docs/api-reference">
                <Button variant="outline" size="lg">View API Docs</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}