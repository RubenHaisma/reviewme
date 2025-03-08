import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { formatDistanceToNow } from 'date-fns';

const posts = [
  {
    title: "Maximizing Customer Feedback for Business Growth",
    excerpt: "Learn how to leverage customer feedback effectively to drive business growth and improve customer satisfaction.",
    author: "John Doe",
    date: new Date('2024-03-01'),
    category: "Business Growth",
    readTime: "5 min read",
    image: "/blog/post-1.jpg"
  },
  {
    title: "The Impact of Online Reviews on Local Businesses",
    excerpt: "Discover how online reviews influence customer decisions and what it means for your local business.",
    author: "Jane Smith",
    date: new Date('2024-02-28'),
    category: "Local Business",
    readTime: "4 min read",
    image: "/blog/post-2.jpg"
  },
  {
    title: "Building a Strong Online Reputation in 2024",
    excerpt: "Essential strategies for maintaining and improving your business's online reputation in the digital age.",
    author: "Mike Johnson",
    date: new Date('2024-02-25'),
    category: "Reputation Management",
    readTime: "6 min read",
    image: "/blog/post-3.jpg"
  },
  // Add more posts as needed
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

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={false} />

      <main>
        {/* Hero Section */}
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
              Latest Insights
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Expert advice and insights on customer feedback and business growth
            </motion.p>
          </div>
        </motion.section>

        {/* Blog Posts Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {posts.map((post, index) => (
                <motion.article
                  key={index}
                  variants={item}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-4">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{post.author}</span>
                      <span>•</span>
                      <span className="text-muted-foreground">
                        {formatDistanceToNow(post.date, { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}