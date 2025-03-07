"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { ColorPicker } from "@/components/ui/color-picker";
import { FileUpload } from "@/components/ui/file-upload";

interface WebhookUrl {
  id: string;
  provider: string;
  url: string;
}

interface FeedbackTheme {
  primaryColor: string;
  accentColor: string;
  logo: string | null;
  customCss: string | null;
}

interface SettingsFormProps {
  company: {
    id: string;
    name: string;
    googleReviewLink: string | null;
    notifyEmail: string | null;
    notifyOnNegative: boolean;
    emailTemplate: string | null;
    emailSubject: string | null;
    webhookUrls: WebhookUrl[];
    feedbackTheme: FeedbackTheme | null;
  };
}

export function SettingsForm({ company }: SettingsFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ensure all fields have proper fallbacks
  const [formData, setFormData] = useState({
    googleReviewLink: company.googleReviewLink || "",
    notifyEmail: company.notifyEmail || "",
    notifyOnNegative: company.notifyOnNegative ?? false,
    emailTemplate: company.emailTemplate || "",
    emailSubject: company.emailSubject || "",
    // Handle multiple webhook URLs properly
    webhookUrl: company.webhookUrls.length > 0 ? company.webhookUrls[0].url : "",
  });

  const [themeData, setThemeData] = useState({
    primaryColor: company.feedbackTheme?.primaryColor || "#2563eb",
    accentColor: company.feedbackTheme?.accentColor || "#1d4ed8",
    logo: company.feedbackTheme?.logo || "",
    customCss: company.feedbackTheme?.customCss || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        googleReviewLink: formData.googleReviewLink || null,
        notifyEmail: formData.notifyEmail || null,
        notifyOnNegative: formData.notifyOnNegative,
        emailTemplate: formData.emailTemplate || null,
        emailSubject: formData.emailSubject || null,
        webhookUrls: formData.webhookUrl
          ? [{
              id: company.webhookUrls[0]?.id || undefined,
              provider: company.webhookUrls[0]?.provider || "default",
              url: formData.webhookUrl
            }]
          : [],
        feedbackTheme: {
          primaryColor: themeData.primaryColor,
          accentColor: themeData.accentColor,
          logo: themeData.logo || null,
          customCss: themeData.customCss || null,
        },
      };

      const response = await fetch(`/api/settings?companyId=${company.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update settings");
      }

      toast.success("Settings updated successfully");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update settings"
      );
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

          <div>
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input
              id="webhookUrl"
              type="url"
              value={formData.webhookUrl}
              onChange={(e) =>
                setFormData({ ...formData, webhookUrl: e.target.value })
              }
              placeholder="https://your-webhook-endpoint.com"
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      {/* Rest of the form remains largely the same */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Email Template Settings</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="emailSubject">Email Subject</Label>
            <Input
              id="emailSubject"
              value={formData.emailSubject}
              onChange={(e) =>
                setFormData({ ...formData, emailSubject: e.target.value })
              }
              placeholder="How was your experience with ${companyName}?"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="emailTemplate">Email Template</Label>
            <Textarea
              id="emailTemplate"
              value={formData.emailTemplate}
              onChange={(e) =>
                setFormData({ ...formData, emailTemplate: e.target.value })
              }
              placeholder="Dear ${customerName},\n\nThank you for choosing ${companyName}..."
              className="mt-1 min-h-[200px] font-mono"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Feedback Page Theme</h2>
        <div className="space-y-4">
          <div>
            <Label>Primary Color</Label>
            <ColorPicker
              color={themeData.primaryColor}
              onChange={(color) =>
                setThemeData({ ...themeData, primaryColor: color })
              }
            />
          </div>

          <div>
            <Label>Accent Color</Label>
            <ColorPicker
              color={themeData.accentColor}
              onChange={(color) =>
                setThemeData({ ...themeData, accentColor: color })
              }
            />
          </div>

          <div>
            <Label>Company Logo</Label>
            <FileUpload
              value={themeData.logo}
              onChange={(url) => {
                setThemeData({ ...themeData, logo: url });
              }}
              accept="image/*"
            />
          </div>

          <div>
            <Label htmlFor="customCss">Custom CSS</Label>
            <Textarea
              id="customCss"
              value={themeData.customCss}
              onChange={(e) =>
                setThemeData({ ...themeData, customCss: e.target.value })
              }
              placeholder=".feedback-form { /* your styles */ }"
              className="font-mono"
            />
          </div>
        </div>
      </Card>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}