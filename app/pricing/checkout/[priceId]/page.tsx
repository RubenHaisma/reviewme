'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PLANS } from '@/lib/stripe';
import { Loader2 } from 'lucide-react';

export default function CheckoutPage({
  params,
}: {
  params: { priceId: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = Object.values(PLANS).find(p => p.priceId === params.priceId);

  useEffect(() => {
    if (!plan) {
      router.push('/pricing');
    }
  }, [plan, router]);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/billing/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: params.priceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  if (!plan) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">Subscribe to {plan.name}</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <p className="font-medium">{plan.name}</p>
              <p className="text-sm text-muted-foreground">Monthly subscription</p>
            </div>
            <p className="text-2xl font-bold">${plan.price}</p>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Includes:</p>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-sm">
                  <span className="mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Button
            onClick={handleCheckout}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Subscribe for $${plan.price}/month`
            )}
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push('/pricing')}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
          You can cancel anytime.
        </p>
      </Card>
    </div>
  );
}