'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CheckCircle, Copy } from 'lucide-react';

interface SetupGuideProps {
  provider: string;
  webhookUrl?: string;
  onComplete: () => void;
}

const guides = {
  acuity: {
    title: 'Acuity Scheduling Setup',
    steps: [
      'Log in to your Acuity account',
      'Go to Settings → Integrations → API',
      'Copy your API credentials',
      'Configure webhook URL in Acuity',
      'Test the integration',
    ],
    fields: ['User ID', 'API Key'],
  },
  calendly: {
    title: 'Calendly Setup',
    steps: [
      'Log in to Calendly',
      'Navigate to Integrations',
      'Generate API token',
      'Set up webhook endpoint',
      'Verify connection',
    ],
    fields: ['API Token', 'Webhook Signing Key'],
  },
  simplybook: {
    title: 'SimplyBook.me Setup',
    steps: [
      'Access SimplyBook.me admin',
      'Go to API settings',
      'Get API credentials',
      'Configure webhook',
      'Test booking flow',
    ],
    fields: ['Company ID', 'API Key'],
  },
  square: {
    title: 'Square Appointments Setup',
    steps: [
      'Open Square Dashboard',
      'Create application',
      'Generate access token',
      'Set up webhook',
      'Test appointment flow',
    ],
    fields: ['Access Token', 'Location ID'],
  },
};

export function SetupGuide({ provider, webhookUrl, onComplete }: SetupGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const guide = guides[provider as keyof typeof guides];

  const copyWebhookUrl = () => {
    if (webhookUrl) {
      navigator.clipboard.writeText(webhookUrl);
      toast.success('Webhook URL copied to clipboard');
    }
  };

  const handleCredentialChange = (field: string, value: string) => {
    setCredentials((prev) => ({
      ...prev,
      [field.toLowerCase().replace(' ', '_')]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/integrations/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          credentials,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect integration');
      }

      toast.success('Integration connected successfully');
      onComplete();
    } catch (error) {
      toast.error('Failed to connect integration');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{guide.title}</CardTitle>
        <CardDescription>
          Follow these steps to connect your {guide.title} account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Steps */}
          <div className="space-y-4">
            {guide.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 p-4 rounded-lg ${
                  currentStep === index
                    ? 'bg-primary/10 border border-primary'
                    : 'bg-muted'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted-foreground/20'
                  }`}
                >
                  {currentStep > index ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={
                    currentStep === index ? 'font-medium text-primary' : ''
                  }
                >
                  {step}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Webhook URL */}
          {webhookUrl && (
            <div className="space-y-2">
              <Label>Webhook URL</Label>
              <div className="flex gap-2">
                <Input value={webhookUrl} readOnly />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyWebhookUrl}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Credentials Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">API Credentials</h3>
            {guide.fields.map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>{field}</Label>
                <Input
                  id={field}
                  type="password"
                  value={credentials[field.toLowerCase().replace(' ', '_')] || ''}
                  onChange={(e) => handleCredentialChange(field, e.target.value)}
                  placeholder={`Enter your ${field}`}
                />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() =>
                setCurrentStep((prev) =>
                  prev > 0 ? prev - 1 : prev
                )
              }
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            {currentStep < guide.steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep((prev) => prev + 1)}
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Complete Setup
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}