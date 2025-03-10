'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Share2, BookmarkPlus } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function FiveStarReviewsPage() {
  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: 'How to Get More 5-Star Reviews',
        text: 'Learn proven strategies to increase your positive reviews',
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
              <div className="flex items-center justify-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current" />
                ))}
              </div>
              <h1 className="text-4xl font-bold">How to Get More 5-Star Reviews</h1>
              <div className="flex items-center justify-center gap-4 text-muted-foreground">
                <span>March 8, 2025</span>
                <span>•</span>
                <span>5 min read</span>
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
                In today&apos;s digital landscape, positive reviews are more valuable than ever. 
                Here&apos;s your comprehensive guide to earning more 5-star reviews naturally and ethically.
              </p>

              <h2>1. Deliver Exceptional Service</h2>
              <p>
                The foundation of getting 5-star reviews is providing service that truly deserves them. 
                Focus on exceeding customer expectations at every touchpoint.
              </p>

              <h2>2. Perfect Your Timing</h2>
              <p>
                Timing is crucial when asking for reviews. Request feedback when customers are most likely 
                to be satisfied - usually right after a successful interaction or positive outcome.
              </p>

              <Card className="my-8 p-6 bg-primary/5 border-primary">
                <h3 className="text-xl font-semibold mb-4">Pro Tip: The Perfect Moment</h3>
                <p className="text-muted-foreground">
                  Studies show that asking for reviews within 2-3 hours of service completion 
                  can increase positive response rates by up to 70%.
                </p>
              </Card>

              <h2>3. Make It Easy</h2>
              <p>
                The easier you make it for customers to leave reviews, the more likely they are to do so. 
                Use tools like OpiniFlow to streamline the process.
              </p>

              <div className="my-8 bg-muted p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Quick Checklist</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Provide exceptional service
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Time your requests strategically
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Make the process simple
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Follow up appropriately
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Respond to all reviews
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="mt-12 p-8 bg-primary/5 rounded-lg"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold mb-4">Ready to boost your reviews?</h2>
              <p className="text-lg mb-6">
                Start collecting more 5-star reviews automatically with OpiniFlow.
              </p>
              <Link href="/auth/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Try OpiniFlow Free
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