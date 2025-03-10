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
    { name: 'Sarah J.', role: 'Marketing Lead', quote: 'Tripled our Google reviews in 3 months!', rating: 5 },
    { name: 'Mike C.', role: 'Freelancer', quote: 'Saves me hours—clients love it.', rating: 5 },
    { name: 'Emma D.', role: 'Success Manager', quote: 'Insights that win us 5-stars.', rating: 5 },
  ];

  const stats = [
    { label: 'Happy Pros', value: '100+', icon: Users },
    { label: 'Reviews Nabbed', value: '5,000+', icon: Star },
    { label: 'Rating Boost', value: '69% (nice!)', icon: TrendingUp },
    { label: 'Hours Saved', value: '12+', icon: Clock },
  ];

  const workflowSteps = [
    { icon: Users, title: 'Client Visit', description: 'They finish their service.' },
    { icon: Mail, title: 'Auto-Nudge', description: 'We ping them for you.' },
    { icon: Star, title: 'Quick Rate', description: 'They star you fast.' },
    { icon: TrendingUp, title: 'Smart Routing', description: '5-stars to Google, rest to you.' },
    { icon: ChartBar, title: 'Real Wins', description: 'Track trends, grow easy.' },
  ];

  const features = [
    {
      icon: Star,
      title: 'Smart Review Routing',
      description: 'Get +50% more 5-star Google reviews instantly—others stay private.',
      isHero: true, // Star feature
    },
    { icon: ChartBar, title: 'Advanced Analytics', description: 'Boost satisfaction 20% with instant insights.' },
    { icon: MessageCircle, title: 'Automated Collection', description: 'Cut feedback time 50% with smart timing.' },
    { icon: Shield, title: 'Review Monitoring', description: 'See every review in one chill dashboard.' },
    { icon: TrendingUp, title: 'Reputation Growth', description: 'Turn feedback into Google gold.' },
    { icon: CheckCircle, title: 'Easy Integration', description: 'Plug in, kick back—no fuss.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation isAuthenticated={isAuthenticated} />

      {/* Hero Section */}
      <motion.header
        className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-28"
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
      >
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
                5,000+ Pros Agree
              </motion.div>
              
              <motion.h1
                className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Stop Losing Clients to Bad Reviews
              </motion.h1>
              
              <motion.p
                className="text-2xl md:text-3xl font-semibold text-blue-600 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                Get better Google reviews, instantly
              </motion.p>
              
              <motion.p
                className="text-xl leading-8 text-gray-600 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Small businesses auto-collect 5-stars with Raatum. Free to start, 20 clients included.
              </motion.p>
              
              <motion.p
                className="text-sm text-gray-500 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <Link href="/pricing" className="text-blue-600 hover:underline">Plans</Link> from $29/month—cheaper than a latte.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Link href="/auth/register">
                  <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white text-xl px-8 py-6 rounded-md shadow-lg hover:shadow-xl transition-all">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline" size="lg" className="text-lg px-6 py-6 border-2 border-blue-200 text-gray-700 rounded-md hover:bg-blue-50 transition-all">
                    Book a Demo
                  </Button>
                </Link>
              </motion.div>
              
              <motion.p 
                className="text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                No card needed • 2-min setup • Built for service pros
              </motion.p>
            </motion.div>
            
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
                      <h3 className="font-bold text-gray-800">Your Google Reviews</h3>
                      <p className="text-sm text-gray-500">Last 7 days</p>
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
                      { label: 'Google Stars', value: '4.9', icon: Star, color: 'bg-yellow-50 text-yellow-600' },
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
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-500 font-medium">100+ pros boosted reviews with us</p>
            {['Dentists', 'Barbers', 'Gyms', 'Salons'].map((industry, i) => (
              <motion.div 
                key={i} 
                className="text-gray-400 font-semibold text-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                {industry}
              </motion.div>
            ))}
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
              Instant Process
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How You Win Google Reviews</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We nab every 5-star for you, no stress
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
              Your Edge
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Tools to Crush It</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Instant Google review wins, made simple
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                variants={{ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } }}
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
                <h3 className="text-xl font-semibold mb-1 text-gray-900">
                  {feature.title}
                  {feature.isHero && (
                    <span className="ml-2 inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                      Most Loved
                    </span>
                  )}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">{feature.description}</p>
                <Link href={`/features/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span className="text-blue-600 font-medium flex items-center text-sm hover:underline">
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
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
              Real Wins
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Pros Love Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Instant Google review boosts, straight from users
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
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
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
            <motion.div 
              className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-400 opacity-20 blur-3xl"
              animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            ></motion.div>
            <motion.div 
              className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white opacity-10 blur-3xl"
              animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            ></motion.div>
            
            <motion.p 
              className="text-sm text-blue-100 mb-4 relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Join 5,000+ pros seeing instant Google review wins
            </motion.p>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Ready for Better Google Reviews?
            </motion.h2>
            
            <motion.p 
              className="text-xl mb-8 text-blue-100 max-w-xl mx-auto relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Start free and watch 5-stars roll in instantly
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-6 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-6 shadow-lg hover:shadow-xl transition-all text-xl">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white px-6 py-6 border-2 hover:bg-blue-600/10 transition-all"
                >
                  Book a Demo
                </Button>
              </Link>
            </motion.div>
            
            <motion.p 
              className="text-blue-100 relative z-10 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              No card • Free 20 clients • <Link href="/pricing" className="underline hover:text-white">Plans</Link> from $29/month
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}