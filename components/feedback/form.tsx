"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface FeedbackFormProps {
  appointmentId: string;
  companyName: string;
  initialScore: number;
}

export function FeedbackForm({
  appointmentId,
  companyName,
  initialScore,
}: FeedbackFormProps) {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId,
          score: initialScore,
          comment,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit feedback");

      toast.success("Thank you for your feedback!");
      router.push("/feedback/thank-you");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="comment"
          className="block text-sm font-medium"
        >
          How can we improve our service?
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={`Tell us about your experience with ${companyName}...`}
          rows={6}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  );
}