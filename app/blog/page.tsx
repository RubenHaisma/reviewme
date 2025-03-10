'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const blogPosts = [
  {
    slug: '5-stars-reviews',
    title: 'How to Get More 5-Star Reviews',
    excerpt: 'Learn proven strategies to increase your positive reviews and boost your online reputation.',
    date: '2025-03-08',
    readTime: '5 min read',
    category: 'Marketing',
    image: '/blog/5-star-reviews.jpg'
  },
  {
    slug: 'How-to-get-better-reviews',
    title: 'The Art of Collecting Better Customer Reviews',
    excerpt: 'Discover techniques to encourage detailed, authentic reviews that build trust.',
    date: '2025-03-07',
    readTime: '7 min read',
    category: 'Customer Service',
    image: '/blog/better-reviews.jpg'
  },
  {
    slug: 'How-to-get-more-clients',
    title: 'Leveraging Reviews to Attract More Clients',
    excerpt: 'Turn your customer feedback into a powerful marketing tool for business growth.',
    date: '2025-03-06',
    readTime: '6 min read',
    category: 'Growth',
    image: '/blog/more-clients.jpg'
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={false} />

      <main>
        {/* Hero Section */}
        <motion.section
          className="py-20 bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.div className="max-w-2xl mx-auto text-center" variants={fadeInUp}>
              <h1 className="text-4xl font-bold mb-6">OpiniFlow Blog</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Expert insights on review management and customer feedback
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Blog Posts Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-muted" />
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-sm text-primary font-medium">{post.category}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{post.readTime}</span>
                        </div>
                        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h2>
                        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      </div>
                    </Card>
                  </Link>
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