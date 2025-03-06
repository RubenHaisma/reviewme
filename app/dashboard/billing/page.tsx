"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { PLANS } from "@/lib/stripe";
import { Check } from "lucide-react";

export default function BillingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Show success/error message based on URL params
  if (searchParams.get("success") === "true") {
    toast.success("Subscription updated successfully!");
  } else if (searchParams.get("success") === "false") {
    toast.error("Failed to update subscription");
  }

  async function createCheckoutSession(priceId: string) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/billing/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      window.location.href = data.url;
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          <Card key={key} className="p-6">
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="text-3xl font-bold mt-4">
              ${plan.price}
              <span className="text-base font-normal text-muted-foreground">
                /month
              </span>
            </p>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className="w-full mt-8"
              onClick={() => createCheckoutSession(plan.priceId!)}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Subscribe"}
            </Button>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" onClick={redirectToPortal} disabled={isLoading}>
          Manage Subscription
        </Button>
      </div>
    </div>
  );
}