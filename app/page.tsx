import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Star, ChartBar, MessageCircle, Settings, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-background pt-16 pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
              Transform Your Customer Reviews
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Start collecting and managing customer feedback today. Get your first 20 customers completely free, 
              then choose a plan that grows with your business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/auth/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90">Get Started Free</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="lg">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-primary p-3 text-primary-foreground">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Automated Review Collection</h3>
              <p className="mt-2 text-muted-foreground">
                Automatically send review requests after customer appointments
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-primary p-3 text-primary-foreground">
                <ChartBar className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Analytics Dashboard</h3>
              <p className="mt-2 text-muted-foreground">
                Track your review performance with detailed analytics
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-primary p-3 text-primary-foreground">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Feedback Management</h3>
              <p className="mt-2 text-muted-foreground">
                Handle negative feedback internally and improve customer satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tier Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">Start Free, Scale As You Grow</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get started with no upfront costs
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg border border-muted p-8">
              <h3 className="text-2xl font-bold mb-6">Free Starter Package</h3>
              <ul className="space-y-4">
                {[
                  'First 20 customers completely free',
                  'Full access to all features',
                  'Automated review collection',
                  'Basic analytics dashboard',
                  'Email notifications',
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/auth/register">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}