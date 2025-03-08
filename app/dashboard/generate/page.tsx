'use client';

import { FeedbackLinkGenerator } from '@/components/dashboard/feedback-link-generator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams hook

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function GenerateFeedbackPage() {
  // Use the useSearchParams hook to access query parameters
  const searchParams = useSearchParams();
  const disabled = searchParams.get('disabled') === 'true';

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="mb-8">
        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Generate Feedback Link</h1>
      </motion.div>

      {/* Feedback Link Generator */}
      <FeedbackLinkGenerator disabled={disabled} />
    </motion.div>
  );
}