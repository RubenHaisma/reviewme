'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail } from 'lucide-react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function PrivacyPolicyPage() {
  const isAuthenticated = false;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navigation isAuthenticated={isAuthenticated} />

      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background pt-32 pb-20"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center max-w-3xl mx-auto" variants={fadeInUp}>
            <motion.h1
              className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-6"
              variants={fadeInUp}
            >
              Privacy Policy
            </motion.h1>
            <motion.p className="text-lg text-muted-foreground" variants={fadeInUp}>
              Last Updated: <Badge variant="secondary">March 08, 2025</Badge>
            </motion.p>
            <motion.p className="mt-4 text-muted-foreground" variants={fadeInUp}>
              At OpiniFlow.com, we prioritize your privacy. Learn how we collect, use, and protect your data with transparency and care.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.section
        className="py-24 bg-muted/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto space-y-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Section 1: Introduction */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">1. Introduction</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    Welcome to OpiniFlow.com (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We’re a Netherlands-based company committed to protecting your privacy under the General Data Protection Regulation (GDPR) and Dutch law. This Privacy Policy outlines how we collect, process, and safeguard your personal data when you use our platform (the &quot;Service&quot;). By using the Service, you agree to this policy. If you don’t agree, please refrain from using it.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 2: Data Controller */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">2. Data Controller</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    OpiniFlow.com, located at Utrecht, Netherlands, is the data controller responsible for your personal data. Contact us at:
                  </p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-primary" /> info@OpiniFlow.com
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 3: Data We Collect */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">3. Data We Collect</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <h3 className="text-lg font-semibold text-primary">3.1 Information You Provide</h3>
                  <ul className="list-disc ml-5 mt-2">
                    <li>Personal details: name, email address, and password</li>
                    <li>Business information: company name, address, and phone number</li>
                    <li>Customer data: names, emails, and phone numbers of your customers</li>
                    <li>Payment details: processed securely via third-party providers</li>
                  </ul>
                  <h3 className="text-lg font-semibold text-primary mt-4">3.2 Automatically Collected Data</h3>
                  <ul className="list-disc ml-5 mt-2">
                    <li>Device information: IP address, browser type, operating system</li>
                    <li>Usage data: timestamps, interactions, and error logs</li>
                    <li>Cookies and trackers: see our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link></li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 4: How We Use Your Data */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">4. How We Use Your Data</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>We process your data to enhance your experience and operate the Service:</p>
                  <ul className="list-disc ml-5 mt-2">
                    <li>Provide and maintain the Service</li>
                    <li>Process payments securely</li>
                    <li>Send automated review requests</li>
                    <li>Generate analytics and insights</li>
                    <li>Communicate with you (with your consent where required)</li>
                    <li>Ensure security and comply with legal obligations</li>
                  </ul>
                  <p className="mt-2">
                    Our legal bases under GDPR include your consent, contractual necessity, and legitimate interests (e.g., improving the Service).
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 5: Data Sharing */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">5. Data Sharing</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>We share your data only with trusted parties:</p>
                  <ul className="list-disc ml-5 mt-2">
                    <li>Service providers: hosting, payment processing, and analytics</li>
                    <li>Authorities: when legally required</li>
                    <li>Partners: with your explicit consent</li>
                  </ul>
                  <p className="mt-2 font-semibold">We never sell your personal data.</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 6: Security Measures */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">6. Security Measures</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>We protect your data with industry-standard measures:</p>
                  <ul className="list-disc ml-5 mt-2">
                    <li>Encryption in transit and at rest</li>
                    <li>Regular security audits</li>
                    <li>Restricted access to authorized personnel only</li>
                  </ul>
                  <p className="mt-2">While we strive for top security, no system is infallible.</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 7: Your Rights */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">7. Your Rights</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>Under GDPR, you have the following rights:</p>
                  <ul className="list-disc ml-5 mt-2">
                    <li>Access: Request a copy of your data</li>
                    <li>Rectification: Correct inaccurate data</li>
                    <li>Erasure: Delete your data (subject to legal exceptions)</li>
                    <li>Portability: Receive your data in a transferable format</li>
                    <li>Object: Opt out of marketing or certain processing</li>
                  </ul>
                  <p className="mt-2">
                    Exercise your rights by emailing <span className="text-primary">info@OpiniFlow.com</span>. You may also contact the Dutch Data Protection Authority (Autoriteit Persoonsgegevens) with complaints.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 8: Cookies */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">8. Cookies</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    We use cookies to optimize your experience. Manage preferences through our consent tool or browser settings. See our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link> for details.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 9: International Transfers */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">9. International Transfers</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    Your data may be transferred outside the European Economic Area (EEA). We ensure GDPR-compliant safeguards, such as Standard Contractual Clauses, are in place.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 10: Policy Updates */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">10. Policy Updates</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    We may update this Privacy Policy periodically. Significant changes will be communicated to you. Continued use of the Service after updates implies acceptance.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 11: Contact Us */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">11. Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>Have questions? Reach out to us:</p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-primary" /> info@OpiniFlow.com
                    </li>
                  </ul>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4">
                    <Button className="bg-primary hover:bg-primary/90">Contact Us</Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}