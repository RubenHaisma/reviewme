import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation isAuthenticated={false
      } />

      {/* Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-blue">
            <h1>Privacy Policy</h1>
            <p>Last updated: March 20, 2024</p>

            <h2>1. Introduction</h2>
            <p>
              Raatum ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our review management platform (the &quot;Service&quot;). Please read this policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Service.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide</h3>
            <ul>
              <li>Account information (name, email address, password)</li>
              <li>Company information (business name, address, phone number)</li>
              <li>Customer contact information (names, email addresses, phone numbers)</li>
              <li>Payment information (credit card details, billing address)</li>
              <li>Communication preferences (notification settings, subscription preferences)</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Log data (access times, pages viewed, error logs)</li>
              <li>Usage information (features used, interactions with the Service)</li>
              <li>Cookies and similar technologies (tracking pixels, local storage)</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send review requests to your customers</li>
              <li>Generate analytics and performance reports</li>
              <li>Communicate with you about your account and updates</li>
              <li>Improve our services and develop new features</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Service providers (hosting, email delivery, customer support)</li>
              <li>Payment processors (to process transactions securely)</li>
              <li>Analytics providers (to understand usage patterns)</li>
              <li>Legal authorities (when required by law or to protect our rights)</li>
              <li>Business partners (with your consent, where applicable)</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your information, including:
            </p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>

            <h2>7. Your Rights and Choices</h2>
            <p>You have the following rights regarding your information:</p>
            <ul>
              <li>Access: Request a copy of your personal data</li>
              <li>Correction: Request correction of inaccurate data</li>
              <li>Deletion: Request deletion of your data</li>
              <li>Opt-out: Unsubscribe from marketing communications</li>
              <li>Data portability: Request transfer of your data</li>
            </ul>
            <p>
              To exercise these rights, please contact us at privacy@Raatum.com.
            </p>

            <h2>8. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can manage your cookie preferences through your browser settings or our cookie consent tool.
            </p>

            <h2>9. Third-Party Links</h2>
            <p>
              Our Service may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites. We encourage you to review their privacy policies before providing any information.
            </p>

            <h2>10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own, including the United States. We ensure appropriate safeguards are in place to protect your data in accordance with applicable laws.
            </p>

            <h2>11. Children’s Privacy</h2>
            <p>
              Our Service is not intended for individuals under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn we have collected such information, we will take steps to delete it.
            </p>

            <h2>12. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the Service after such changes constitutes your acceptance of the updated policy.
            </p>

            <h2>13. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@Raatum.com</li>
              <li>Address: Raatum, 123 Business Street, Suite 100, Tech City, TC 12345</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}