"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

interface SettingsFormProps {
  company: {
    id: string;
    name: string;
    googleReviewLink: string | null;
    notifyEmail: string | null;
    notifyOnNegative: boolean;
    webhookUrls: Array<{
      id: string;
      provider: string;
      url: string;
    }>;
  };
}

export function SettingsForm({ company }: SettingsFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    googleReviewLink: company.googleReviewLink || "",
    notifyEmail: company.notifyEmail || "",
    notifyOnNegative: company.notifyOnNegative,
    webhookUrl: company.webhookUrls[0]?.url || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update settings");

      toast.success("Settings updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Review Settings</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="googleReviewLink">Google Review Link</Label>
            <Input
              id="googleReviewLink"
              type="url"
              value={formData.googleReviewLink}
              onChange={(e) =>
                setFormData({ ...formData, googleReviewLink: e.target.value })
              }
              placeholder="https://g.page/r/..."
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Customers with positive feedback will be redirected to this link
            </p>
          </div>

          <div>
            <Label htmlFor="notifyEmail">Notification Email</Label>
            <Input
              id="notifyEmail"
              type="email"
              value={formData.notifyEmail}
              onChange={(e) =>
                setFormData({ ...formData, notifyEmail: e.target.value })
              }
              placeholder="notifications@yourcompany.com"
              className="mt-1"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notify on Negative Feedback</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for reviews under 4 stars
              </p>
            </div>
            <Switch
              checked={formData.notifyOnNegative}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, notifyOnNegative: checked })
              }
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Integration Settings</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="webhookUrl">Booking System Webhook URL</Label>
            <Input
              id="webhookUrl"
              type="url"
              value={formData.webhookUrl}
              onChange={(e) =>
                setFormData({ ...formData, webhookUrl: e.target.value })
              }
              placeholder="https://api.yourbookingsystem.com/webhooks"
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Configure your booking system to send appointment data to this URL
            </p>
          </div>
        </div>
      </Card>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}