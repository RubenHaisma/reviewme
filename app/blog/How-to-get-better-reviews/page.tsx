'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, ThumbsUp, Award, Share2, BookmarkPlus } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function BetterReviewsPage() {
  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: 'The Art of Collecting Better Customer Reviews',
        text: 'Learn how to get more detailed and authentic customer reviews',
        url: window.location.href,
      });
    }
  };

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
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold">The Art of Collecting Better Customer Reviews</h1>
              <div className="flex items-center justify-center gap-4 text-muted-foreground">
                <span>March 7, 2025</span>
                <span>•</span>
                <span>7 min read</span>
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

            <motion.div className="prose prose-lg max-w-none" variants={fadeInUp}>
              <p className="lead">
                Quality matters more than quantity when it comes to customer reviews. 
                Learn how to collect reviews that truly reflect your service excellence.
              </p>

              <Card className="my-8 p-6 bg-primary/5">
                <div className="flex items-start gap-4">
                  <MessageSquare className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">The Power of Detailed Reviews</h3>
                    <p className="text-muted-foreground">
                      Detailed reviews are 3x more likely to influence potential customers 
                      compared to simple star ratings.
                    </p>
                  </div>
                </div>
              </Card>

              <h2>Ask the Right Questions</h2>
              <p>
                Guide your customers to provide meaningful feedback by asking specific questions about their experience:
              </p>

              <ul className="space-y-4 my-6">
                <li className="flex items-start gap-3">
                  <ThumbsUp className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <strong>What stood out?</strong>
                    <p className="text-muted-foreground">
                      Encourage customers to highlight specific aspects of their experience.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ThumbsUp className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <strong>How did we help?</strong>
                    <p className="text-muted-foreground">
                      Ask about specific problems solved or benefits received.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ThumbsUp className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <strong>What could improve?</strong>
                    <p className="text-muted-foreground">
                      Show you value honest feedback and continuous improvement.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="bg-muted p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold mb-4">Review Collection Best Practices</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-background rounded-lg">
                    <h4 className="font-semibold mb-2">Do</h4>
                    <ul className="space-y-2 text-sm">
                      <li>✓ Ask for specific details</li>
                      <li>✓ Make it easy to respond</li>
                      <li>✓ Follow up promptly</li>
                      <li>✓ Show gratitude</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <h4 className="font-semibold mb-2">Don&apos;t</h4>
                    <ul className="space-y-2 text-sm">
                      <li>✗ Pressure customers</li>
                      <li>✗ Ignore negative feedback</li>
                      <li>✗ Ask leading questions</li>
                      <li>✗ Delay responses</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="mt-12 p-8 bg-primary/5 rounded-lg"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold mb-4">Ready to collect better reviews?</h2>
              <p className="text-lg mb-6">
                OpiniFlow helps you gather detailed, authentic customer feedback automatically.
              </p>
              <Link href="/auth/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Free Trial
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