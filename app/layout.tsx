import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// Enhanced metadata with multiple review platforms
export const metadata = {
  title: 'Raatum - Optimize Your Business Reviews Across Google, Yelp & More',
  description: 'Boost your online reputation with Raatum. Our smart review management system directs 5-star reviews to Google, Yelp, Trustpilot, and Facebook, while channeling feedback for improvement to your private site.',
  keywords: 'review management, google reviews, yelp reviews, trustpilot, facebook reviews, reputation management, review optimizer, customer feedback',
  openGraph: {
    title: 'Raatum - Smart Review Optimization for Google, Yelp, and Beyond',
    description: 'Enhance your business’s star ratings across major platforms with our intelligent review routing technology.',
    type: 'website',
    url: 'https://yourwebsite.com', // Replace with your actual domain
    siteName: 'Raatum',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raatum - Maximize Your Reviews on Google, Yelp, and Trustpilot',
    description: 'Automate review management to boost your business’s reputation across top review platforms.',
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Expanded structured data including multiple review platforms
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Raatum',
    applicationCategory: 'BusinessApplication',
    featureList: [
      'Review Management',
      'Google Review Optimization',
      'Yelp Review Management',
      'Trustpilot Integration',
      'Facebook Review Routing',
      'Feedback Filtering',
    ],
    description: 'Raatum’s automated review management platform optimizes your online reputation by directing positive reviews to Google, Yelp, Trustpilot, and Facebook while collecting constructive feedback internally.',
    offers: {
      '@type': 'Offer',
      price: 'Contact for pricing', // Update with actual pricing if applicable
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8', // Example value, update as needed
      reviewCount: '150', // Example value, update as needed
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon and manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preload font */}
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Noscript fallback */}
          <noscript>
            <div className="bg-yellow-100 p-4 text-center">
              Please enable JavaScript to use all features of Raatum Review Management
            </div>
          </noscript>

          {children}
          <Toaster />

          {/* Analytics loading */}
          {process.env.NODE_ENV === 'production' && (
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=G-M2Q8L0LVQ6`} // Replace with your GA ID
            />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}