import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { CheckCircle } from 'lucide-react';
import { PLANS } from '@/lib/stripe';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">ReviewFlow</Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground">
              Start free with 20 customers, then choose a plan that grows with your business
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="border bg-background rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-2">Free Trial</h3>
              <p className="text-muted-foreground mb-4">Perfect for getting started</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>20 customers included</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>Email notifications</span>
                </li>
              </ul>
              <Link href="/auth/register">
                <Button className="w-full">Start Free Trial</Button>
              </Link>
            </div>

            {/* Basic Plan */}
            <div className="border bg-background rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-2">{PLANS.BASIC.name}</h3>
              <p className="text-muted-foreground mb-4">For growing businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">${PLANS.BASIC.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {PLANS.BASIC.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/register">
                <Button className="w-full">Choose Basic</Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="border bg-background rounded-lg p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{PLANS.PRO.name}</h3>
              <p className="text-muted-foreground mb-4">For serious businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">${PLANS.PRO.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {PLANS.PRO.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/register">
                <Button className="w-full">Choose Pro</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold mb-2">What happens after the free trial?</h3>
              <p className="text-muted-foreground">
                After using your 20 free customers, you can choose to upgrade to either our Basic or Pro plan to continue using ReviewFlow.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I switch plans later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                We offer a 30-day money-back guarantee if you&apos;re not satisfied with our service.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards through our secure payment processor, Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}