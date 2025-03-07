"use client";

import { useState, useEffect } from "react";
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

interface SettingsFormProps {
  company: {
    id: string;
    name: string;
    googleReviewLink: string | null;
    notifyEmail: string | null;
    notifyOnNegative: boolean;
    emailTemplate: string | null;
    emailSubject: string | null;
    webhookUrls: Array<{
      id: string;
      provider: string;
      url: string;
    }>;
    feedbackTheme?: {
      primaryColor: string;
      accentColor: string;
      logo: string | null;
      customCss: string | null;
    } | null;
  };
}

export function SettingsForm({ company }: SettingsFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    googleReviewLink: "",
    notifyEmail: "",
    notifyOnNegative: false,
    emailTemplate: "",
    emailSubject: "",
    webhookUrl: "",
  });

  const [themeData, setThemeData] = useState({
    primaryColor: "#2563eb",
    accentColor: "#1d4ed8",
    logo: "",
    customCss: "",
  });

  // Initialize form data from company props
  useEffect(() => {
    setFormData({
      googleReviewLink: company.googleReviewLink || "",
      notifyEmail: company.notifyEmail || "",
      notifyOnNegative: company.notifyOnNegative,
      emailTemplate: company.emailTemplate || "",
      emailSubject: company.emailSubject || "",
      webhookUrl: company.webhookUrls[0]?.url || "",
    });

    setThemeData({
      primaryColor: company.feedbackTheme?.primaryColor || "#2563eb",
      accentColor: company.feedbackTheme?.accentColor || "#1d4ed8",
      logo: company.feedbackTheme?.logo || "",
      customCss: company.feedbackTheme?.customCss || "",
    });
  }, [company]);

  // Preview section to show how the theme will look
  const PreviewSection = () => (
    <div className="mt-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Theme Preview</h3>
      <div
        className="p-4 rounded-lg"
        style={{
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {themeData.logo && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Current Logo:</p>
            <img
              src={themeData.logo}
              alt="Logo Preview"
              className="h-12 object-contain"
            />
          </div>
        )}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Primary Color:</p>
            <div
              className="h-10 rounded-md"
              style={{ backgroundColor: themeData.primaryColor }}
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Accent Color:</p>
            <div
              className="h-10 rounded-md"
              style={{ backgroundColor: themeData.accentColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        theme: { ...themeData }, // Always send the full theme object
      };

      console.log("Submitting data:", JSON.stringify(payload, null, 2));

      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("API response error:", error);
        throw new Error(error.error || "Failed to update settings");
      }

      const updatedCompany = await response.json();
      console.log("Updated company data:", updatedCompany);

      // Update local state with the server's response to ensure consistency
      setThemeData({
        primaryColor: updatedCompany.feedbackTheme?.primaryColor || "#2563eb",
        accentColor: updatedCompany.feedbackTheme?.accentColor || "#1d4ed8",
        logo: updatedCompany.feedbackTheme?.logo || "",
        customCss: updatedCompany.feedbackTheme?.customCss || "",
      });

      toast.success("Settings updated successfully");
      router.refresh(); // Refresh to get the latest server data
    } catch (error) {
      console.error("Settings form error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update settings");
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
            <p className="text-sm text-muted-foreground mt-1">
              Available variables: ${"{customerName}"}, ${"{companyName}"}
            </p>
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
            <p className="text-sm text-muted-foreground mt-1">
              Available variables: ${"{customerName}"}, ${"{companyName}"}, ${"{feedbackUrl}"}
            </p>
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
            <p className="text-sm text-muted-foreground mt-1">
              Recommended size: 200x50px
            </p>
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
            <p className="text-sm text-muted-foreground mt-1">
              Add custom CSS to style your feedback page
            </p>
          </div>

          <PreviewSection />
        </div>
      </Card>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}