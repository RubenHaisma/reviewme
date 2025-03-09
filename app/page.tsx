'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  ChartBar, 
  MessageCircle, 
  CheckCircle, 
  ArrowRight, 
  ArrowDown,
  Award, 
  TrendingUp, 
  Shield, 
  Mail, 
  Users,
  Zap,
  Clock,
  Sparkles
} from 'lucide-react';
import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';
import { CountUp } from '@/components/ui/count-up';
import { WorkflowAnimation } from '@/components/workflow-animation';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -30]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.98]);

  const isAuthenticated = false;

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      image: '/testimonials/sarah.jpg',
      quote: 'Raatum has transformed how we handle customer feedback. Our Google reviews increased by 150% in just 3 months!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Self employed',
      image: '/testimonials/michael.jpg',
      quote: 'The automated review collection saves us hours every week. Our customer satisfaction has never been higher.',
      rating: 5,
    },
    {
      name: 'Emma Davis',
      role: 'Customer Success Manager',
      image: '/testimonials/emma.jpg',
      quote: "The insights we get from Raatum have helped us improve our service quality significantly. It's a game-changer!",
      rating: 5,
    },
  ];

  const stats = [
    { label: 'Happy Customers', value: '100+', icon: Users },
    { label: 'Reviews Collected', value: '5,000+', icon: Star },
    { label: 'Rating Increase', value: '69%', icon: TrendingUp },
    { label: 'Time Saved Weekly', value: '12 hrs', icon: Clock },
  ];

  const workflowSteps = [
    {
      icon: Users,
      title: 'Customer Visit',
      description: 'Customer completes their appointment or service',
    },
    {
      icon: Mail,
      title: 'Automated Request',
      description: 'System sends personalized review request',
    },
    {
      icon: Star,
      title: 'Easy Feedback',
      description: 'Customer provides rating and feedback',
    },
    {
      icon: TrendingUp,
      title: 'Smart Routing',
      description: 'Positive reviews go to Google, negative ones stay private',
    },
    {
      icon: ChartBar,
      title: 'Insights & Analytics',
      description: 'Track performance and identify trends',
    },
  ];

  const features = [
    {
      icon: Star,
      title: 'Smart Review Routing',
      description: 'Automatically direct happy customers to Google while managing negative feedback privately.',
    },
    {
      icon: ChartBar,
      title: 'Advanced Analytics',
      description: 'Get actionable insights from your feedback with detailed analytics and trend reports.',
    },
    {
      icon: MessageCircle,
      title: 'Automated Collection',
      description: 'Collect reviews automatically after customer interactions with smart timing.',
    },
    {
      icon: Shield,
      title: 'Review Monitoring',
      description: 'Monitor and respond to reviews across all platforms from one dashboard.',
    },
    {
      icon: TrendingUp,
      title: 'Reputation Growth',
      description: 'Build and maintain a stellar online reputation with strategic review management.',
    },
    {
      icon: CheckCircle,
      title: 'Easy Integration',
      description: 'Connect with your existing tools and automate your workflow seamlessly.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation isAuthenticated={isAuthenticated} />

      {/* Hero Section */}
      <motion.header
        className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-28"
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100 opacity-70 blur-3xl"></div>
          <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-blue-50 opacity-80 blur-3xl"></div>
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          ></motion.div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div 
                className="mb-6 inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-sm font-semibold text-blue-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Award className="mr-1 h-4 w-4" />
                #1 Review Management Platform
              </motion.div>
              
              <motion.h1
                className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Transform</span> Your Customer Reviews Into Business Growth
              </motion.h1>
              
              <motion.p
                className="text-xl leading-8 text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Automate your review collection, turn feedback into insights, and boost your online
                reputation. Start free with 20 customers, then scale as you grow.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Link href="/auth/register">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-6 rounded-md shadow-lg hover:shadow-xl transition-all">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button variant="outline" size="lg" className="text-lg px-6 py-6 border-2 border-blue-200 text-gray-700 rounded-md hover:bg-blue-50 transition-all">
                    See How It Works
                  </Button>
                </Link>
              </motion.div>
              
              <motion.p 
                className="text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                No credit card required • 2-minute setup
              </motion.p>
            </motion.div>
            
            {/* Hero Image/Graphic */}
            <motion.div 
              className="flex-1 flex justify-center md:justify-end"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-blue-600 rounded-lg blur-xl opacity-10 scale-110"></div>
                <div className="relative bg-white border border-blue-100 rounded-xl shadow-xl p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-gray-800">Review Dashboard</h3>
                      <p className="text-sm text-gray-500">Latest performance</p>
                    </div>
                    <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">+69%</div>
                  </div>
                  
                  <div className="h-40 mb-6 flex items-end gap-2">
                    {[65, 45, 75, 50, 80, 60, 90].map((height, i) => (
                      <motion.div
                        key={i}
                        className="h-full flex-1"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.6 + (i * 0.1), duration: 0.5, ease: "backOut" }}
                      >
                        <div 
                          style={{ height: `${height}%` }}
                          className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md"
                        ></div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { label: 'Google Rating', value: '4.9', icon: Star, color: 'bg-yellow-50 text-yellow-600' },
                      { label: 'Responses', value: '94', icon: MessageCircle, color: 'bg-green-50 text-green-600' },
                    ].map((stat, i) => (
                      <motion.div 
                        key={i}
                        className="bg-gray-50 rounded-lg p-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + (i * 0.1), duration: 0.5 }}
                      >
                        <div className={`${stat.color} w-8 h-8 rounded-full flex items-center justify-center mb-2`}>
                          <stat.icon className="w-4 h-4" />
                        </div>
                        <div className="text-xl font-bold">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center">
                    <motion.button 
                      className="text-sm text-blue-600 flex items-center gap-1 hover:underline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      View full dashboard <ArrowRight className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden md:block"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 0.7, y: 10 }}
            transition={{ delay: 1.2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
            <ArrowDown className="w-6 h-6 text-blue-500" />
          </motion.div>
        </div>
      </motion.header>

      {/* Social Proof Section */}
      <section className="py-10 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* <p className="text-gray-500 font-medium">Trusted by 100+ businesses worldwide</p>
            {['TechCorp', 'ServicePro', 'ZenWellness', 'BestRetail', 'FitnessPro'].map((company, i) => (
              <motion.div 
                key={i} 
                className="text-gray-400 font-semibold text-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                {company}
              </motion.div>
            ))} */}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <motion.div 
                  className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5, type: "spring" }}
                >
                  <stat.icon className="h-8 w-8 text-blue-500" />
                </motion.div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  <CountUp value={stat.value} delay={index * 0.2} />
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Workflow Animation Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center mb-4 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="mr-1 h-4 w-4" />
              Seamless Process
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How Raatum Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A streamlined workflow that transforms customer experiences into sustainable growth
            </p>
          </motion.div>
          
          <WorkflowAnimation steps={workflowSteps} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center mb-4 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="mr-1 h-4 w-4" />
              Powerful Features
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Everything You Need to Excel</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you collect, manage, and leverage customer feedback effectively
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 }
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <motion.div
                  className="rounded-full bg-blue-50 p-3 mb-5 w-14 h-14 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10, delay: index * 0.05 }}
                >
                  <feature.icon className="h-7 w-7 text-blue-600" />
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-4 flex-grow">
                  {feature.description}
                </p>
                
                <Link href={`/features/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span className="text-blue-600 font-medium flex items-center text-sm hover:underline">
                    Learn more <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center mb-4 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Star className="mr-1 h-4 w-4" />
              Success Stories
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Loved by Businesses Worldwide</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how Raatum has helped businesses transform their customer feedback into growth
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative"
                initial={{ opacity: 0, y: 30, rotateY: 30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                {/* Quotation mark */}
                <div className="absolute -top-4 -left-2 text-6xl text-blue-100 font-serif"></div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-lg mb-6 text-gray-700 relative z-10">{testimonial.quote}</p>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full mr-3 flex items-center justify-center text-blue-700 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-12 text-center text-white shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Background Elements */}
            <motion.div 
              className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-400 opacity-20 blur-3xl"
              animate={{ 
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            ></motion.div>
            <motion.div 
              className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white opacity-10 blur-3xl"
              animate={{ 
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            ></motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Ready to Transform Your Customer Reviews?
            </motion.h2>
            
            <motion.p 
              className="text-xl mb-8 text-blue-100 max-w-xl mx-auto relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Join thousands of businesses using Raatum to boost their online reputation
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-6 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-6 shadow-lg hover:shadow-xl transition-all">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-black/80 border-white  px-6 py-6 border-2 transition-all"
                >
                  Contact Sales
                </Button>
              </Link>
            </motion.div>
            
            <motion.p 
              className="text-blue-100 relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              No credit card required • Free 20 customer trial • Cancel anytime
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}