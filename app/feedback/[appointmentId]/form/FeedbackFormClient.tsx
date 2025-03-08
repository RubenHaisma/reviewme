// feedback/[appointmentId]/form/FeedbackFormClient.tsx
'use client';

import { motion } from 'framer-motion';
import { FeedbackForm } from '@/components/feedback/form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface FeedbackTheme {
  primaryColor?: string;
  accentColor?: string;
  logo?: string;
  customCss?: string;
}

interface FeedbackFormClientProps {
  appointmentId: string;
  companyName: string;
  initialScore: number;
  theme: FeedbackTheme | null;
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function FeedbackFormClient({
  appointmentId,
  companyName,
  initialScore,
  theme,
}: FeedbackFormClientProps) {
  return (
    <div
      className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
      style={{
        '--primary': theme?.primaryColor || '#2563eb',
        '--accent': theme?.accentColor || '#1d4ed8',
      } as React.CSSProperties}
    >
      <motion.div
        className="max-w-2xl w-full space-y-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {theme?.logo && (
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <img
              src={theme.logo}
              alt={companyName}
              className="h-16 mx-auto rounded-md"
            />
          </motion.div>
        )}

        <motion.div variants={fadeInUp} className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            We Value Your Feedback
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Tell us about your experience with {companyName} to help us improve.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="bg-background border rounded-lg shadow-lg p-8"
        >
          <FeedbackForm
            appointmentId={appointmentId}
            companyName={companyName}
            initialScore={initialScore}
          />
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center">
          <Link href="/">
            <Button variant="outline" className="text-muted-foreground">
              Back to {companyName}
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {theme?.customCss && (
        <style dangerouslySetInnerHTML={{ __html: theme.customCss }} />
      )}
    </div>
  );
}