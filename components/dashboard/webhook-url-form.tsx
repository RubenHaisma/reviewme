"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy } from "lucide-react";

interface WebhookUrlFormProps {
  provider: string;
  initialUrl?: string;
}

export function WebhookUrlForm({ provider, initialUrl }: WebhookUrlFormProps) {
  const [url, setUrl] = useState(initialUrl || "");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          webhookUrl: url,
          provider,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update webhook URL");
      }

      toast.success("Webhook URL updated successfully");
    } catch (error) {
      toast.error("Failed to update webhook URL");
    } finally {
      setIsLoading(false);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(url);
    toast.success("Webhook URL copied to clipboard");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Webhook URL</Label>
        <div className="flex gap-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-webhook-url.com"
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Use this URL in your {provider} settings to receive appointment notifications.
        </p>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Webhook URL"}
      </Button>
    </form>
  );
}