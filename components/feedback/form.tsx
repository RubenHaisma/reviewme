// feedback/form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';

interface FeedbackFormProps {
  appointmentId: string;
  companyName: string;
  initialScore: number;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function FeedbackForm({ appointmentId, companyName, initialScore }: FeedbackFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    comment: '',
    recommendation: '',
    serviceQuality: '',
    staffExperience: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointmentId,
          score: initialScore,
          comment: formData.comment.trim(),
          recommendation: formData.recommendation.trim(),
          serviceQuality: formData.serviceQuality.trim(),
          staffExperience: formData.staffExperience.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit feedback');
      }

      toast.success('Thank you for your detailed feedback!');
      router.push('/feedback/thank-you');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      toast.error(message);
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Score Display */}
      <motion.div variants={fadeInUp} className="text-center">
        <Label className="block text-lg font-medium text-foreground mb-2">
          Your Rating: {initialScore}/5
        </Label>
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-8 h-8 ${
                star <= initialScore ? 'text-primary fill-primary' : 'text-muted-foreground'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Overall Comment */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <Label htmlFor="comment" className="block text-sm font-medium text-foreground">
          What did you think of your experience with {companyName}?
        </Label>
        <Textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Share your overall thoughts..."
          rows={6}
          required
          className="w-full border-muted focus:ring-primary focus:border-primary"
        />
      </motion.div>

      {/* Recommendation */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <Label htmlFor="recommendation" className="block text-sm font-medium text-foreground">
          Would you recommend us to others? Why or why not?
        </Label>
        <Textarea
          id="recommendation"
          name="recommendation"
          value={formData.recommendation}
          onChange={handleChange}
          placeholder="Tell us about your recommendation..."
          rows={4}
          className="w-full border-muted focus:ring-primary focus:border-primary"
        />
      </motion.div>

      {/* Service Quality */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <Label htmlFor="serviceQuality" className="block text-sm font-medium text-foreground">
          How would you rate the quality of our service?
        </Label>
        <Input
          id="serviceQuality"
          name="serviceQuality"
          value={formData.serviceQuality}
          onChange={handleChange}
          placeholder="e.g., Excellent, Good, Needs Improvement"
          className="w-full border-muted focus:ring-primary focus:border-primary"
        />
      </motion.div>

      {/* Staff Experience */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <Label htmlFor="staffExperience" className="block text-sm font-medium text-foreground">
          How was your experience with our staff?
        </Label>
        <Textarea
          id="staffExperience"
          name="staffExperience"
          value={formData.staffExperience}
          onChange={handleChange}
          placeholder="Share your thoughts on our team..."
          rows={4}
          className="w-full border-muted focus:ring-primary focus:border-primary"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition-all"
          disabled={isSubmitting || !formData.comment.trim()}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </motion.div>
    </motion.form>
  );
}