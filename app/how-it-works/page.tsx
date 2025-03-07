import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { 
  CheckCircle, 
  Star, 
  Mail, 
  MessageSquare, 
  BarChart, 
  Settings 
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">Raatum</Link>
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
            <h1 className="text-4xl font-bold mb-6">How Raatum Works</h1>
            <p className="text-lg text-muted-foreground mb-12">
              A simple, automated way to collect and manage customer reviews
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-4">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Easy Setup</h3>
              <p className="text-muted-foreground">
                Create your account and connect your booking system in minutes
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Automated Requests</h3>
              <p className="text-muted-foreground">
                Customers automatically receive review requests after their appointments
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Collect Reviews</h3>
              <p className="text-muted-foreground">
                Happy customers are directed to Google, others provide private feedback
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4. Manage Feedback</h3>
              <p className="text-muted-foreground">
                Respond to feedback and address concerns before they become public
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-4">
                <BarChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">5. Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your review performance with detailed analytics
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">6. Grow Your Business</h3>
              <p className="text-muted-foreground">
                Build trust and attract more customers with positive reviews
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Smart Review Routing</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>Automatically direct happy customers to Google</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>Collect private feedback from dissatisfied customers</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>Prevent negative reviews before they go public</span>
                </li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Automated Workflow</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>Seamless integration with your booking system</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>Customizable email templates</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>Perfect timing for review requests</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of businesses using Raatum to manage their online reputation
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg">Start Free Trial</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg">View Pricing</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}