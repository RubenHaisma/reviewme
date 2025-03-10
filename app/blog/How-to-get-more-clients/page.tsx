'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, TrendingUp, BarChart, Share2, BookmarkPlus } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function MoreClientsPage() {
  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Leveraging Reviews to Attract More Clients',
        text: 'Learn how to use customer reviews to grow your business',
        url: window.location.href,
      });
    }
  };

  const stats = [
    { value: '92%', label: 'of customers read reviews before making a purchase' },
    { value: '88%', label: 'trust online reviews as much as personal recommendations' },
    { value: '72%', label: 'say positive reviews make them trust businesses more' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={false} />

      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.article
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <motion.header className="text-center space-y-4" variants={fadeInUp}>
              <div className="flex items-center justify-center gap-2">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold">Leveraging Reviews to Attract More Clients</h1>
              <div className="flex items-center justify-center gap-4 text-muted-foreground">
                <span>March 6, 2025</span>
                <span>•</span>
                <span>6 min read</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" onClick={shareArticle}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </motion.header>

            <motion.div variants={fadeInUp} className="grid gap-6 md:grid-cols-3">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              ))}
            </motion.div>

            <motion.div className="prose prose-lg max-w-none" variants={fadeInUp}>
              <h2>Turn Reviews into Revenue</h2>
              <p>
                Customer reviews are more than just feedback—they&apos;re a powerful marketing tool 
                that can significantly impact your business growth. Here&apos;s how to leverage them effectively.
              </p>

              <div className="my-8 grid gap-6 md:grid-cols-2">
                <Card className="p-6">
                  <TrendingUp className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Showcase Success</h3>
                  <p className="text-muted-foreground">
                    Display your best reviews prominently on your website and marketing materials 
                    to build trust with potential clients.
                  </p>
                </Card>
                <Card className="p-6">
                  <BarChart className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Track Growth</h3>
                  <p className="text-muted-foreground">
                    Monitor review metrics to understand trends and identify opportunities 
                    for business improvement.
                  </p>
                </Card>
              </div>

              <h2>Strategic Review Management</h2>
              <ul className="space-y-4 my-6">
                <li className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <div className="font-semibold text-2xl text-primary">1</div>
                  <div>
                    <h3 className="font-semibold">Automate Collection</h3>
                    <p className="text-muted-foreground">
                      Use tools like OpiniFlow to automatically request reviews at the perfect moment.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <div className="font-semibold text-2xl text-primary">2</div>
                  <div>
                    <h3 className="font-semibold">Respond Promptly</h3>
                    <p className="text-muted-foreground">
                      Show potential clients that you value customer feedback by responding quickly 
                      and professionally to all reviews.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <div className="font-semibold text-2xl text-primary">3</div>
                  <div>
                    <h3 className="font-semibold">Leverage Social Proof</h3>
                    <p className="text-muted-foreground">
                      Share positive reviews across social media and marketing channels to 
                      amplify their impact.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="bg-primary/5 p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold mb-4">Pro Tips for Maximum Impact</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Highlight industry-specific reviews for targeted audiences</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Use review snippets in email marketing campaigns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Create case studies from detailed positive reviews</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Include review highlights in sales presentations</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="mt-12 p-8 bg-primary/5 rounded-lg"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold mb-4">Ready to grow your business?</h2>
              <p className="text-lg mb-6">
                Start turning customer feedback into a powerful growth engine with OpiniFlow.
              </p>
              <Link href="/auth/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started Free
                </Button>
              </Link>
            </motion.div>
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
}