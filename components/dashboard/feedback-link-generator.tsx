"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Link } from "lucide-react";

export function FeedbackLinkGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackUrl, setFeedbackUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      customerName: formData.get("customerName") as string,
      customerEmail: formData.get("customerEmail") as string,
    };

    try {
      const response = await fetch("/api/feedback-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate feedback link");
      }

      setFeedbackUrl(result.feedbackUrl);
      toast.success("Feedback link generated successfully");
    } catch (error) {
      toast.error("Failed to generate feedback link");
    } finally {
      setIsLoading(false);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard");
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Generate Feedback Link</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            name="customerName"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerEmail">Customer Email</Label>
          <Input
            id="customerEmail"
            name="customerEmail"
            type="email"
            placeholder="john@example.com"
            required
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Link"}
        </Button>
      </form>

      {feedbackUrl && (
        <div className="mt-6 space-y-2">
          <Label>Feedback Link</Label>
          <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
            <Link className="h-4 w-4 text-muted-foreground" />
            <code className="flex-1 text-sm">{feedbackUrl}</code>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => copyToClipboard(feedbackUrl)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Share this link with your customer to collect their feedback.
          </p>
        </div>
      )}
    </Card>
  );
}