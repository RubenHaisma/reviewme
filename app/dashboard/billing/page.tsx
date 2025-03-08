'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { PLANS } from "@/lib/plans";
import { Check, Loader2 } from "lucide-react";

export default function BillingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Show success/error message based on URL params
  if (searchParams.get("success") === "true") {
    toast.success("Subscription updated successfully!");
  } else if (searchParams.get("success") === "false") {
    toast.error("Failed to update subscription");
  }

  async function redirectToPortal() {
    setIsLoading(true);

    try {
      const response = await fetch("/api/billing/portal", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to access billing portal");
      }

      window.location.href = data.url;
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubscribe = async (priceId: string) => {
    setSelectedPlan(priceId);
    router.push(`/pricing/checkout/${priceId}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
        <p className="text-muted-foreground mt-2">
          Choose the perfect plan for your business
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {Object.entries(PLANS).map(([key, plan]) => (
          <Card key={key} className="p-6 relative overflow-hidden">
            {key === 'PRO' && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm">
                Most Popular
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <p className="text-3xl font-bold mt-4">
                  ${plan.price}
                  <span className="text-base font-normal text-muted-foreground">
                    /month
                  </span>
                </p>
              </div>

              <ul className="space-y-3 min-h-[200px]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                onClick={() => handleSubscribe(plan.priceId!)}
                disabled={isLoading || selectedPlan === plan.priceId}
              >
                {isLoading && selectedPlan === plan.priceId ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-4">
        <Button variant="outline" onClick={redirectToPortal} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Manage Subscription'
          )}
        </Button>
        
        <p className="text-sm text-muted-foreground">
          Manage your subscription, payment methods, and billing information.
        </p>
      </div>
    </div>
  );
}