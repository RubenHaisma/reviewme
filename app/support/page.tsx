'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { LifeBuoy, MessageCircle, FileText, BookOpen, Search, ArrowRight, Send, CheckCircle, Clock } from 'lucide-react';

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

type SubmitStatus = {
  type: 'success' | 'error';
  message: string;
} | null;

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    orderId: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      setSubmitStatus({
        type: 'success',
        message: `Support request submitted successfully! Ticket ID: ${data.ticketId}`,
      });

      setContactForm({
        name: '',
        email: '',
        orderId: '',
        subject: '',
        message: '',
      });

      toast.success('Your support request has been submitted! Check your email for confirmation.');
    } catch (error) {
      const err = error as Error;
      setSubmitStatus({
        type: 'error',
        message: err.message || 'An error occurred while submitting your request',
      });
      toast.error(err.message || 'Failed to submit support request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isAuthenticated={false} />

      <main>
        {/* Hero Section */}
        <motion.section
          className="relative py-20 bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 bg-primary/20 text-primary">Support Hub</Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                Raatum Support Center
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                We’re here to assist you with any questions or issues. Explore our resources or contact us directly.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search support articles, FAQs, or topics..."
                  className="pl-10 h-12 border-muted focus:ring-primary focus:border-primary"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="#contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Contact Support <MessageCircle className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#documentation">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                  Browse Docs <FileText className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Support Options */}
        <motion.section
          className="container mx-auto px-4 py-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Support Options
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
              Choose the best way to get help with Raatum.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-muted hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>Personalized assistance from our team.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Reach out to us at <strong>support@raatum.com</strong>. We respond within 24 hours during business days.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#contact" className="w-full">
                    <Button variant="outline" className="w-full">
                      Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-muted hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>Detailed guides and tutorials.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Explore our comprehensive documentation for setup, usage, and customization help.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#documentation" className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Browse Docs <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-muted hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <LifeBuoy className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>FAQs</CardTitle>
                  <CardDescription>Quick answers to common questions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Find solutions to frequent issues in our FAQ section below.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#faq" className="w-full">
                    <Button variant="outline" className="w-full">
                      View FAQs <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Documentation Section */}
        <motion.section
          id="documentation"
          className="container mx-auto px-4 py-16 bg-muted/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Documentation
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
              Get started and master Raatum with our detailed guides.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="getting-started">
              <AccordionTrigger>Getting Started</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Follow our step-by-step guide to set up Raatum and start collecting feedback.
                </p>
                <Link href="/docs" className="mt-2 inline-block text-primary hover:underline">
                  Read Full Guide
                </Link>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="integrations">
              <AccordionTrigger>Integrations</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Learn how to connect Raatum with tools like VertiMart and Calendly.
                </p>
                <Link href="/integrations" className="mt-2 inline-block text-primary hover:underline">
                  Explore Integrations
                </Link>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="api">
              <AccordionTrigger>API Reference</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Build custom solutions with our RESTful API and webhooks.
                </p>
                <Link href="/docs/api-reference" className="mt-2 inline-block text-primary hover:underline">
                  View API Docs
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          id="faq"
          className="container mx-auto px-4 py-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
              Quick answers to help you get unstuck.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="setup">
              <AccordionTrigger>How do I set up Raatum?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Sign up, configure your company settings, and integrate with your scheduling tool. See our{' '}
                  <Link href="/docs" className="text-primary hover:underline">
                    Getting Started Guide
                  </Link>{' '}
                  for details.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="response-time">
              <AccordionTrigger>How quickly do you respond to support requests?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We aim to respond within 24 hours during business days (Monday-Friday, 9 AM-5 PM CET).
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="customization">
              <AccordionTrigger>Can I customize the feedback form?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Yes, you can customize questions and branding via the dashboard or API.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.section>

        {/* Contact Form Section */}
        <motion.section
          id="contact"
          className="container mx-auto px-4 py-16 bg-muted/50"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Contact Support
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
              Submit a request and we’ll get back to you soon.
            </p>
          </motion.div>

          <Card className="max-w-2xl mx-auto border-muted">
            <CardHeader>
              <CardTitle>Support Request</CardTitle>
              <CardDescription>We’ll respond within 24 hours during business days.</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.form
                onSubmit={handleContactSubmit}
                className="space-y-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.div className="grid gap-4 md:grid-cols-2" variants={fadeInUp}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      required
                      className="border-muted focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      required
                      className="border-muted focus:ring-primary focus:border-primary"
                    />
                  </div>
                </motion.div>

                <motion.div className="grid gap-4 md:grid-cols-2" variants={fadeInUp}>
                  <div className="space-y-2">
                    <Label htmlFor="orderId">Order ID (Optional)</Label>
                    <Input
                      id="orderId"
                      name="orderId"
                      placeholder="e.g., purchase_123"
                      value={contactForm.orderId}
                      onChange={handleContactChange}
                      className="border-muted focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="e.g., Installation Help"
                      value={contactForm.subject}
                      onChange={handleContactChange}
                      required
                      className="border-muted focus:ring-primary focus:border-primary"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Describe your issue or question..."
                    rows={6}
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                    className="border-muted focus:ring-primary focus:border-primary"
                  />
                </motion.div>

                {submitStatus && (
                  <motion.div
                    variants={fadeInUp}
                    className={`p-4 rounded-lg text-sm ${
                      submitStatus.type === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}

                <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 font-semibold py-3 shadow-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Submit Request <Send className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}