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

export default function TermsAndConditionsPage() {
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
              Terms & Conditions
            </motion.h1>
            <motion.p className="text-lg text-muted-foreground" variants={fadeInUp}>
              Last Updated: <Badge variant="secondary">March 08, 2025</Badge>
            </motion.p>
            <motion.p className="mt-4 text-muted-foreground" variants={fadeInUp}>
              Please read these terms carefully before using OpiniFlow.com. Your use of our service is governed by the
              following conditions.
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
            {/* Section 1: Acceptance of Terms */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">1. Acceptance of Terms</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    By accessing or using OpiniFlow.com (the &quot;Service&quot;), you agree to be bound by these Terms and Conditions
                    (&quot;Terms&quot;) and our{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    . These Terms are governed by Dutch law. If you do not agree, please discontinue use of the Service.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 2: Eligibility */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">2. Eligibility</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    You must be at least 16 years old to use the Service, in compliance with the General Data Protection
                    Regulation (GDPR). By using the Service, you represent that you meet this requirement and have the
                    legal capacity to enter into this agreement.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 3: Use of Service */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">3. Use of the Service</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>You agree to use the Service in accordance with these Terms and applicable laws. Prohibited actions include:</p>
                  <ul className="list-disc ml-5 mt-2">
                    <li>Engaging in fraudulent, illegal, or unauthorized activities;</li>
                    <li>Distributing spam, malware, or harmful content;</li>
                    <li>Attempting to reverse-engineer, copy, or interfere with the Service.</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 4: Accounts */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">4. Accounts</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    To access certain features, you must create an account with accurate information. You are responsible for
                    maintaining the confidentiality of your account credentials and for all activities under your account. We
                    reserve the right to suspend or terminate accounts that violate these Terms.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 5: Intellectual Property */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">5. Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    All content, trademarks, and technology on the Service are owned by OpiniFlow.com or its licensors. You are
                    granted a non-exclusive, non-transferable license to use the Service for personal or business purposes as
                    intended. You may not reproduce, distribute, or create derivative works without our permission.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 6: User Content */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">6. User Content</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    You retain ownership of content you submit to the Service. By posting, you grant us a worldwide,
                    royalty-free, perpetual license to use, display, and distribute your content in connection with the
                    Service. You confirm that your content is lawful and does not infringe on third-party rights.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 7: Payments */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">7. Payments</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    Payments are processed securely through third-party providers. Fees are non-refundable except as outlined
                    in our{' '}
                    <Link href="/refunds" className="text-primary hover:underline">
                      Refund Policy
                    </Link>{' '}
                    or required by Dutch law. All prices include applicable taxes unless stated otherwise.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 8: Disclaimer of Warranties */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">8. Disclaimer of Warranties</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    The Service is provided &quot;as is&quot; and &quot;as available.&quot; We do not guarantee uninterrupted access or
                    error-free operation. Dutch consumer protection laws may provide additional rights that cannot be
                    excluded.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 9: Limitation of Liability */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">9. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    To the fullest extent permitted by law, our liability for damages (e.g., lost profits, data loss) is
                    limited to the greater of the amount you paid us in the past 12 months or €100. This does not affect
                    statutory rights under Dutch law.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 10: Termination */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">10. Termination</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    We may terminate or suspend your access to the Service at our discretion, with or without cause,
                    particularly for violations of these Terms. Sections such as Intellectual Property, User Content,
                    Limitation of Liability, and Governing Law will survive termination.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 11: Governing Law */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">11. Governing Law</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>
                    These Terms are governed by Dutch law. Disputes will be resolved in the courts of [INSERT CITY],
                    Netherlands, unless EU consumer laws grant you alternative dispute resolution options. Contact us first
                    to resolve issues amicably.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section 12: Contact Us */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-background border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">12. Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>For questions or concerns about these Terms, reach out to us at:</p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-primary" /> info@OpiniFlow.com
                    </li>
                  </ul>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4">
                    <Button className="bg-primary hover:bg-primary/90">Get in Touch</Button>
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