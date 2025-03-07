"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  appointmentId: string;
  companyName: string;
  googleReviewLink?: string | null;
}

export function StarRating({
  appointmentId,
  companyName,
  googleReviewLink,
}: StarRatingProps) {
  const router = useRouter();
  const [score, setScore] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (score === 0) return;

    setIsSubmitting(true);

    if (score >= 4 && googleReviewLink) {
      window.location.href = googleReviewLink;
    } else {
      router.push(`/feedback/${appointmentId}/form?score=${score}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-center gap-4">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setScore(value)}
            className="p-2 transition-transform hover:scale-110"
          >
            <Star
              className={cn(
                "h-12 w-12 transition-colors",
                score >= value
                  ? "fill-primary stroke-primary"
                  : "stroke-muted-foreground hover:stroke-primary"
              )}
            />
          </button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-lg font-medium">
          {score === 0
            ? "Select your rating"
            : score >= 4
            ? "Great! We'd love if you shared your experience on Google"
            : "Please tell us how we can improve"}
        </p>
      </div>
      <Button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        disabled={score === 0 || isSubmitting}
        size="lg"
      >
        Continue
      </Button>
    </form>
  );
}