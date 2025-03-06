import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Star, ChartBar, MessageCircle, Settings } from 'lucide-react';

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
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Automatically collect and manage customer feedback, boost your Google reviews,
              and handle negative feedback professionally.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/auth/register">
                <Button size="lg">Get Started</Button>
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

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to improve your online reputation?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join hundreds of businesses already using our platform to manage their reviews.
            </p>
            <div className="mt-10 flex items-center justify-center">
              <Link href="/auth/register">
                <Button size="lg">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}