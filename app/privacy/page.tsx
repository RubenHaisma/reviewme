import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <Navigation isAuthenticated={false} />

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Privacy Policy
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            Last Updated: <Badge variant="secondary">March 08, 2025</Badge>
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            At Raatum.com, your privacy is our priority. Dive into how we protect your data with transparency and style.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Section 1 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">1. Introduction</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Welcome to <span className="font-semibold text-purple-400">Raatum.com</span> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). Based in the Netherlands, we’re committed to safeguarding your privacy under the General Data Protection Regulation (GDPR) and Dutch law. This policy explains how we collect, use, and protect your data when you use our cutting-edge platform (the &quot;Service&quot;). Don’t agree? No worries—just don’t use the Service.
                </p>
              </CardContent>
            </Card>

            {/* Section 2 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">2. Data Controller</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Raatum.com, registered at [INSERT REGISTERED ADDRESS], Netherlands, is the data controller. Reach out to us anytime:
                </p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-purple-400" /> [INSERT EMAIL ADDRESS]
                  </li>
                  <li className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-purple-400" /> [INSERT POSTAL ADDRESS]
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 3 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">3. What We Collect</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <h3 className="text-lg font-semibold text-purple-400">3.1 Your Input</h3>
                <ul className="list-disc ml-5 mt-2">
                  <li>Name, email, and shiny passwords</li>
                  <li>Company details (name, address, phone)</li>
                  <li>Customer contacts (names, emails, numbers)</li>
                  <li>Payment info (securely handled by pros)</li>
                </ul>
                <h3 className="text-lg font-semibold text-purple-400 mt-4">3.2 Auto-Magic Data</h3>
                <ul className="list-disc ml-5 mt-2">
                  <li>Device vibes (IP, browser, OS)</li>
                  <li>Logs (times, clicks, oopsies)</li>
                  <li>Cookies (tasty tracking bits—see our Cookie Policy)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 4 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">4. How We Use It</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>We’re all about making your experience awesome:</p>
                <ul className="list-disc ml-5 mt-2">
                  <li>Power the Service and keep it running</li>
                  <li>Handle payments like a boss</li>
                  <li>Send review requests with flair</li>
                  <li>Crunch numbers for cool insights</li>
                  <li>Keep you in the loop (with consent!)</li>
                  <li>Fight fraud and stay compliant</li>
                </ul>
                <p className="mt-2">Legal bases? GDPR’s got us covered: consent, contracts, and legit interests.</p>
              </CardContent>
            </Card>

            {/* Section 5 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">5. Sharing Vibes</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>We share with trusted crew:</p>
                <ul className="list-disc ml-5 mt-2">
                  <li>Service wizards (hosting, payments, analytics)</li>
                  <li>Legal eagles (if the law knocks)</li>
                  <li>Partners (only with your thumbs-up)</li>
                </ul>
                <p className="mt-2 font-semibold text-purple-400">No selling your data—ever.</p>
              </CardContent>
            </Card>

            {/* Section 6 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">6. Fort Knox Security</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>We lock it down with:</p>
                <ul className="list-disc ml-5 mt-2">
                  <li>Encryption everywhere</li>
                  <li>Regular security checkups</li>
                  <li>Access only for the cool kids</li>
                </ul>
                <p className="mt-2">No system’s perfect, but we’re damn close.</p>
              </CardContent>
            </Card>

            {/* Section 7 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">7. Your Superpowers</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>Under GDPR, you can:</p>
                <ul className="list-disc ml-5 mt-2">
                  <li>Peek at your data</li>
                  <li>Fix mistakes</li>
                  <li>Wipe it out (mostly)</li>
                  <li>Grab it and go</li>
                  <li>Say “no” to marketing</li>
                </ul>
                <p className="mt-2">
                  Hit us up at <span className="text-purple-400">[INSERT EMAIL]</span> or complain to the Dutch Data Protection Authority if we mess up.
                </p>
              </CardContent>
            </Card>

            {/* Section 8 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">8. Cookie Party</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Cookies make things smooth. Manage them via our fancy consent tool or your browser. Details in our <Link href="/cookies" className="text-purple-400 hover:underline">Cookie Policy</Link>.
                </p>
              </CardContent>
            </Card>

            {/* Section 9 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">9. Global Adventures</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Data might travel beyond the EEA. We use GDPR-approved safeguards like Standard Contractual Clauses to keep it safe.
                </p>
              </CardContent>
            </Card>

            {/* Section 10 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">10. Updates</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  We tweak this policy sometimes. Big changes? We’ll ping you. Keep using the Service, and you’re in.
                </p>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">11. Holler at Us</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>Questions? We’re here:</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-purple-400" /> [INSERT EMAIL ADDRESS]
                  </li>
                  <li className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-purple-400" /> [INSERT POSTAL ADDRESS]
                  </li>
                </ul>
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Contact Us</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}