import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';

export default function TermsPage() {
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

      {/* Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-blue">
            <h1>Terms of Service</h1>
            <p>Last updated: March 20, 2024</p>

            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using ReviewFlow&apos;s services, you agree to be bound by these Terms of Service and our Privacy Policy. If you disagree with any part of these terms, you may not access our services.
            </p>

            <h2>2. Description of Services</h2>
            <p>
              ReviewFlow provides a review management platform that allows businesses to collect, manage, and respond to customer reviews. Our services include:
            </p>
            <ul>
              <li>Automated review collection</li>
              <li>Review management dashboard</li>
              <li>Analytics and reporting</li>
              <li>Integration with third-party services</li>
            </ul>

            <h2>3. Account Terms</h2>
            <h3>3.1 Account Creation</h3>
            <p>
              You must:
            </p>
            <ul>
              <li>Be 18 years or older</li>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Notify us of any unauthorized access</li>
            </ul>

            <h3>3.2 Account Responsibilities</h3>
            <p>
              You are responsible for:
            </p>
            <ul>
              <li>All activities under your account</li>
              <li>Maintaining confidentiality of credentials</li>
              <li>Compliance with applicable laws</li>
              <li>Content submitted through our services</li>
            </ul>

            <h2>4. Payment Terms</h2>
            <h3>4.1 Pricing</h3>
            <p>
              Our pricing is based on subscription plans. You agree to pay all fees according to your selected plan. Fees are non-refundable except as required by law or as explicitly stated in these terms.
            </p>

            <h3>4.2 Billing</h3>
            <p>
              We use Stripe for payment processing. By providing payment information, you:
            </p>
            <ul>
              <li>Represent that you are authorized to use the payment method</li>
              <li>Agree to automatic renewal billing</li>
              <li>Authorize us to charge your payment method</li>
            </ul>

            <h2>5. User Content</h2>
            <p>
              You retain ownership of content you submit but grant us a license to use, modify, and distribute it in connection with our services.
            </p>

            <h2>6. Acceptable Use</h2>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Infringe on others&apos; rights</li>
              <li>Submit false or misleading information</li>
              <li>Attempt to circumvent any security features</li>
              <li>Use the services for unauthorized purposes</li>
            </ul>

            <h2>7. Termination</h2>
            <p>
              We may terminate or suspend your account for any reason, including:
            </p>
            <ul>
              <li>Violation of these terms</li>
              <li>Non-payment</li>
              <li>Fraudulent activity</li>
              <li>Abusive behavior</li>
            </ul>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, ReviewFlow shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>

            <h2>9. Disclaimer of Warranties</h2>
            <p>
              Our services are provided &quot;as is&quot; without any warranty of any kind, either express or implied.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify you of material changes through our platform or via email.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These terms shall be governed by the laws of the State of California, without regard to its conflict of law provisions.
            </p>

            <h2>12. Contact Information</h2>
            <p>
              For questions about these terms, please contact us at:
            </p>
            <p>
              Email: legal@reviewflow.com<br />
              Address: 123 Business Street, Suite 456, San Francisco, CA 94105<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}