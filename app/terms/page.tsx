import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { Navigation } from '@/components/layout/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin } from 'lucide-react';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <Navigation isAuthenticated={false} />

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Terms & Conditions
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            Last Updated: <Badge variant="secondary">March 08, 2025</Badge>
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            The rules of the road for using Raatum.com. Let’s keep it smooth and legal.
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
                <CardTitle className="text-2xl font-bold text-blue-400">1. Welcome Aboard</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  These Terms govern your use of <span className="font-semibold text-purple-400">Raatum.com</span> (the &quot;Service&quot;). By jumping in, you agree to play by Dutch law. Don’t vibe with this? No hard feelings—just step off.
                </p>
              </CardContent>
            </Card>

            {/* Section 2 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">2. Who Can Join</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  You’ve got to be 16+ (GDPR says so). Using the Service means you’re legit and ready to roll.
                </p>
              </CardContent>
            </Card>

            {/* Section 3 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">3. Rules of the Game</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>Use it right:</p>
                <ul className="list-disc ml-5 mt-2">
                  <li>No shady stuff (fraud, spam, hacks)</li>
                  <li>Keep it legal and chill</li>
                  <li>Don’t copy or mess with our stuff</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 4 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">4. Your Account</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Sign up with real info, guard your keys, and own what happens. We can boot you if you break the rules.
                </p>
              </CardContent>
            </Card>

            {/* Section 5 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">5. Our Stuff</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  All the cool content? Ours (or our pals’). You get a personal pass to use it—don’t sell or steal it.
                </p>
              </CardContent>
            </Card>

            {/* Section 6 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">6. Your Stuff</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Post something? We can use it forever, worldwide, for the Service. Make sure it’s yours and legal.
                </p>
              </CardContent>
            </Card>

            {/* Section 7 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">7. Cash Flow</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Pay what’s due via our secure partners. Refunds? Check our <Link href="/refunds" className="text-purple-400 hover:underline">policy</Link> or Dutch law.
                </p>
              </CardContent>
            </Card>

            {/* Section 8 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">8. No Guarantees</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  It’s “as is.” We try hard, but no promises it’s perfect. Dutch consumer law might give you extra rights.
                </p>
              </CardContent>
            </Card>

            {/* Section 9 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">9. Liability Cap</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  We’re not on the hook for big losses (think profits or data). Max payout? What you paid us last year, or €100—whichever’s bigger.
                </p>
              </CardContent>
            </Card>

            {/* Section 10 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">10. Game Over</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  We can cut you off anytime for breaking rules. Some terms (like this one) stick around.
                </p>
              </CardContent>
            </Card>

            {/* Section 11 */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">11. Law & Order</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Dutch law rules. Got beef? Let’s talk. If not, [INSERT CITY] courts settle it. EU folks might get extra options.
                </p>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">12. Say Hi</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>Need clarity? Hit us up:</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-purple-400" /> [INSERT EMAIL ADDRESS]
                  </li>
                  <li className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-purple-400" /> [INSERT POSTAL ADDRESS]
                  </li>
                </ul>
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Get in Touch</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}