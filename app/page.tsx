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
  Sparkles,
  Rocket
} from 'lucide-react';
import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';
import { CountUp } from '@/components/ui/count-up';
import { WorkflowAnimation } from '@/components/workflow-animation';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const isAuthenticated = false;

  const testimonials = [
    { name: 'Sarah J.', role: 'Marketing Lead', quote: 'Our 5-star reviews doubled overnight.', rating: 5 },
    { name: 'Mike C.', role: 'Freelancer', quote: 'Clients rave, I relax—game changer.', rating: 5 },
    { name: 'Emma D.', role: 'Success Manager', quote: "Data so good, I'm obsessed.", rating: 5 },
  ];

  const stats = [
    { label: 'Pros Thriving', value: '150+', icon: Users },
    { label: '5-Stars Captured', value: '1000+', icon: Star },
    { label: 'Growth Surge', value: '82%', icon: TrendingUp },
    { label: 'Time Saved', value: '15+', icon: Clock },
  ];

  const workflowSteps = [
    { icon: Users, title: 'Client Wraps Up', description: 'Service done, vibes high.' },
    { icon: Zap, title: 'Instant Ping', description: 'Smart nudge hits their phone.' },
    { icon: Star, title: 'Rate in Seconds', description: 'Tap, star, done.' },
    { icon: Rocket, title: 'Star Sorting', description: '5s to Google, rest to you.' },
    { icon: ChartBar, title: 'Win Insights', description: 'Grow with zero guesswork.' },
  ];

  const features = [
    {
      icon: Rocket,
      title: '5-Star Rocket',
      description: 'Skyrockets 5-star Google reviews by 60%—low stars stay private.',
      isHero: true,
    },
    { icon: ChartBar, title: 'Killer Insights', description: 'Real-time data to boost satisfaction 25%.' },
    { icon: MessageCircle, title: 'Feedback Autopilot', description: '60% faster reviews with zero hassle.' },
    { icon: Shield, title: 'Reputation Shield', description: 'Monitor every review, stay untouchable.' },
    { icon: TrendingUp, title: 'Growth Engine', description: 'Turn stars into revenue fuel.' },
    { icon: CheckCircle, title: 'Plug & Play', description: "Setup so easy, you'll laugh." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <Navigation isAuthenticated={isAuthenticated} />

      {/* Hero Section */}
      <motion.header
        className="relative pt-16 pb-16 md:pt-36 md:pb-32"
      >
        <div className="absolute inset-0">
          <motion.div 
            className="absolute -top-20 -left-20 w-56 md:w-72 h-56 md:h-72 bg-gradient-to-br from-blue-400 to-purple-300 opacity-20 blur-3xl rounded-full"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-40 right-0 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-tl from-blue-500 to-cyan-300 opacity-15 blur-3xl rounded-full"
            animate={{ scale: [1, 1.05, 1], x: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div 
              className="max-w-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.span
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-700 font-medium text-xs sm:text-sm mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Rocket className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Trusted by 100+ Pros
              </motion.span>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Turn Clients into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">5-Star Google Reviews</span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Auto-capture glowing Google reviews while you focus on what you do best. Free to start, no fluff.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Link href="/auth/register" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 transition-all"
                  >
                    Start Free Now
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
                <Link href="/demo" className="w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto px-5 sm:px-6 py-5 sm:py-6 text-base sm:text-lg border-2 border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition-all"
                  >
                    See the Magic
                  </Button>
                </Link>
              </motion.div>

              <motion.p
                className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                No card • 2-min setup • <Link href="/pricing" className="text-blue-600 hover:underline">Plans</Link> from $29/mo
              </motion.p>
            </motion.div>

            <motion.div
              className="relative mt-8 md:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-5 sm:p-8 border border-gray-100 max-w-md mx-auto">
                <motion.div 
                  className="absolute -inset-4 bg-gradient-to-br from-blue-500 to-cyan-400 opacity-20 blur-xl rounded-2xl"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="relative">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">Your Review Surge</h3>
                      <p className="text-xs sm:text-sm text-gray-500">Last 30 days</p>
                    </div>
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">+82%</span>
                  </div>
                  <div className="h-32 sm:h-48 flex items-end gap-1 sm:gap-2">
                    {[40, 60, 55, 70, 85, 90, 100].map((height, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg"
                        style={{ height: `${height}%` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                    {[
                      { label: 'Avg. Rating', value: '4.9', icon: Star, color: 'text-yellow-500' },
                      { label: 'Reviews', value: '127', icon: MessageCircle, color: 'text-blue-500' },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        className="bg-gray-50 p-3 sm:p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                      >
                        <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color} mb-1 sm:mb-2`} />
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-500" />
          </motion.div>
        </div>
      </motion.header>

      {/* Social Proof */}
      <section className="py-8 sm:py-12 bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="font-semibold text-sm sm:text-base">Loved by Pros in:</span>
            {['Dentists', 'Barbers', 'Gyms', 'Salons'].map((industry, i) => (
              <motion.span
                key={i}
                className="text-base sm:text-lg font-bold"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {industry}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-5 sm:gap-10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-blue-500 to-cyan-400 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.2, type: 'spring' }}
                >
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
                <p className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-1 sm:mb-2">
                  <CountUp value={stat.value} delay={i * 0.2} />
                </p>
                <p className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-700 font-medium text-xs sm:text-sm mb-3 sm:mb-4">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Seamless Flow
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">5-Star Magic, Step by Step</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">Effortless review wins, every time.</p>
          </motion.div>
          <WorkflowAnimation steps={workflowSteps} />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-700 font-medium text-xs sm:text-sm mb-3 sm:mb-4">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Your Superpowers
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">Built to Boost You</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">Tools that turn feedback into gold.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="bg-gradient-to-br from-blue-500 to-cyan-400 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                  {feature.isHero && (
                    <span className="ml-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 px-2 py-0.5 rounded-full">Top Pick</span>
                  )}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-700 font-medium text-xs sm:text-sm mb-3 sm:mb-4">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Real Talk
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">Users Can&apos;t Stop Raving</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">See why pros swear by us.</p>
          </motion.div>
          <div className="grid gap-4 sm:gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-bl from-blue-500 to-cyan-400 opacity-10 blur-xl rounded-full" />
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">&quot;{t.quote}&quot;</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="relative bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center text-white shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="absolute -top-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-white opacity-10 blur-3xl rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-blue-400 opacity-20 blur-3xl rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 7, repeat: Infinity }}
            />
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-white font-medium text-xs sm:text-sm mb-4 sm:mb-6">
              <Rocket className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              100+ Pros Onboard
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-6">Launch Your Review Revolution</h2>
            <p className="text-base sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">Start free, see 5-stars flood in—zero risk.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link href="/auth/register" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-white text-blue-600 px-5 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full font-semibold hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto px-5 sm:px-6 py-5 sm:py-6 text-base sm:text-lg text-black/80 border-2 border-white rounded-full hover:bg-white/10 transition-all"
                >
                  Book a Demo
                </Button>
              </Link>
            </div>
            <p className="text-xs sm:text-sm mt-4 sm:mt-6">No card • Free 20 clients • <Link href="/pricing" className="underline hover:text-gray-200">Plans</Link> from $29/mo</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
