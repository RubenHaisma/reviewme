import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Footer } from '@/components/layout/footer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
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
            <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">support@Raatum.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold">Office</h3>
                    <p className="text-muted-foreground">
                      123 Business Street<br />
                      Suite 456<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={6}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold mb-2">What are your support hours?</h3>
              <p className="text-muted-foreground">
                Our support team is available Monday through Friday, 9am to 5pm PST.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How quickly do you respond?</h3>
              <p className="text-muted-foreground">
                We aim to respond to all inquiries within 24 business hours.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you offer phone support?</h3>
              <p className="text-muted-foreground">
                Phone support is available for Pro plan customers during business hours.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Need technical help?</h3>
              <p className="text-muted-foreground">
                Check out our <Link href="/docs" className="text-primary hover:underline">documentation</Link> for technical questions and guides.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}