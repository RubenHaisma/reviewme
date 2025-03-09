// app/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, ChartBar, MessageCircle, CheckCircle, ArrowRight, Award, TrendingUp, Shield } from 'lucide-react';
import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';
import Image from 'next/image';
import { CountUp } from '@/components/ui/count-up'; // Import the new component

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const isAuthenticated = false;

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp Inc.',
      image: '/testimonials/sarah.jpg',
      quote: 'Raatum has transformed how we handle customer feedback. Our Google reviews increased by 150% in just 3 months!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Business Owner',
      company: 'Zen Spa & Wellness',
      image: '/testimonials/michael.jpg',
      quote: 'The automated review collection saves us hours every week. Our customer satisfaction has never been higher.',
      rating: 5,
    },
    {
      name: 'Emma Davis',
      role: 'Customer Success Manager',
      company: 'ServicePro Solutions',
      image: '/testimonials/emma.jpg',
      quote: 'The insights we get from Raatum have helped us improve our service quality significantly. It’s a game-changer!',
      rating: 5,
    },
  ];

  const stats = [
    { label: 'Happy Customers', value: '100+' },
    { label: 'Reviews Collected', value: '5,000+' },
    { label: 'Average Rating Increase', value: '69%' },
    { label: 'Time Saved Weekly', value: '12 hrs' },
  ];

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
          <motion.div className="text-center max-w-4xl mx-auto" variants={fadeInUp}>
            <motion.div className="mb-6 flex justify-center gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                <Award className="mr-1 h-4 w-4" />
                #1 Review Management Platform
              </span>
            </motion.div>
            <motion.h1
              className="text-5xl font-bold tracking-tight text-primary sm:text-7xl mb-6"
              variants={fadeInUp}
            >
              Transform Your Customer Reviews Into Business Growth
            </motion.h1>
            <motion.p
              className="text-xl leading-8 text-muted-foreground mb-10"
              variants={fadeInUp}
            >
              Automate your review collection, turn feedback into insights, and boost your online
              reputation. Start free with 20 customers, then scale as you grow.
            </motion.p>
            <motion.div className="flex flex-wrap items-center justify-center gap-4" variants={fadeInUp}>
              <Link href="/auth/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  See How It Works
                </Button>
              </Link>
            </motion.div>
            <motion.p className="mt-4 text-sm text-muted-foreground">
              No credit card required • 2-minute setup
            </motion.p>
          </motion.div>
        </div>
      </motion.header>

      {/* Social Proof Section */}
      <motion.section
        className="py-12 bg-muted/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-2">Trusted by 100+ businesses worldwide</p>
        </div>
      </motion.section>

      {/* Features Section */}
          <motion.section
            className="py-24 bg-background"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="container mx-auto px-4">
              <motion.div className="text-center mb-16" variants={fadeInUp}>
                <h2 className="text-3xl font-bold mb-4">Everything You Need to Excel at Review Management</h2>
                <p className="text-xl text-muted-foreground">
                  Powerful features designed to help you collect, manage, and leverage customer feedback
                  effectively.
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
                    icon: Star,
                    title: 'Smart Review Routing',
                    description:
                      'Automatically direct happy customers to Google while managing negative feedback privately.',
                  },
                  {
                    icon: ChartBar,
                    title: 'Advanced Analytics',
                    description:
                      'Get actionable insights from your feedback with detailed analytics and trend reports.',
                  },
                  {
                    icon: MessageCircle,
                    title: 'Automated Collection',
                    description:
                      'Collect reviews automatically after customer interactions with smart timing.',
                  },
                  {
                    icon: Shield,
                    title: 'Review Monitoring',
                    description: 'Monitor and respond to reviews across all platforms from one dashboard.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Reputation Growth',
                    description:
                      'Build and maintain a stellar online reputation with strategic review management.',
                  },
                  {
                    icon: CheckCircle,
                    title: 'Easy Integration',
                    description: 'Connect with your existing tools and automate your workflow seamlessly.',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg"
                    variants={{
                      initial: { opacity: 0, y: 30, scale: 0.95 },
                      animate: { opacity: 1, y: 0, scale: 1 }
                    }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15, delay: index * 0.1 }}
                    whileHover={{ y: -5, rotate: 1, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)' }}
                  >
                    <motion.div
                      className="rounded-full bg-primary/10 p-3 mb-4"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 10, delay: index * 0.1 + 0.2 }}
                    >
                      <feature.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <motion.h3
                      className="text-xl font-semibold mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p
                      className="text-muted-foreground"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    >
                      {feature.description}
                    </motion.p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-24 bg-primary text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} className="text-center" variants={fadeInUp}>
                <div className="text-4xl font-bold mb-2">
                  <CountUp value={stat.value} delay={index * 0.2} />
                </div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-24 bg-muted/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-4">Loved by Businesses Worldwide</h2>
            <p className="text-xl text-muted-foreground">
              See how Raatum has helped businesses transform their customer feedback into growth.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg"
                variants={fadeInUp}
                custom={index}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg mb-4">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center">
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-24 bg-primary text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 className="text-4xl font-bold mb-6" variants={fadeInUp}>
            Ready to Transform Your Customer Reviews?
          </motion.h2>
          <motion.p className="text-xl mb-8 text-primary-foreground/90" variants={fadeInUp}>
            Join thousands of businesses using Raatum to boost their online reputation.
          </motion.p>
          <motion.div className="flex flex-wrap justify-center gap-4" variants={fadeInUp}>
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="text-primary font-semibold">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-black/80 border-white hover:bg-white/10"
              >
                Contact Sales
              </Button>
            </Link>
          </motion.div>
          <motion.p className="mt-4 text-primary-foreground/80" variants={fadeInUp}>
            No credit card required • Free 20 customer trial • Cancel anytime
          </motion.p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}