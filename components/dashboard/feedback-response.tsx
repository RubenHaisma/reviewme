"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface FeedbackResponseProps {
  feedback: {
    id: string;
    response: string | null;
  };
}

export function FeedbackResponse({ feedback }: FeedbackResponseProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [response, setResponse] = useState(feedback.response || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/feedback/${feedback.id}/response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response }),
      });

      if (!res.ok) throw new Error("Failed to save response");

      toast.success("Response saved successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to save response");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isEditing && !feedback.response) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">No response yet</p>
        <Button onClick={() => setIsEditing(true)}>Add Response</Button>
      </div>
    );
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Enter your response..."
          className="min-h-[150px]"
        />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Response"}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="space-y-4">
      <p>{feedback.response}</p>
      <Button variant="outline" onClick={() => setIsEditing(true)}>
        Edit Response
      </Button>
    </div>
  );
}