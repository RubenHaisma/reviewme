import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieConsent } from '@/components/ui/cookie-consent';
import './globals.css';

// Load the Inter font
const inter = Inter({ subsets: ['latin'] });

// Define metadata
export const metadata = {
  title: 'Raatum - Optimize Your Business Reviews',
  description: 'Boost your online reputation with Raatum. Our smart review management system helps you collect and manage customer feedback effectively.',
  keywords: 'review management, customer feedback, reputation management, review optimizer',
  openGraph: {
    title: 'Raatum - Smart Review Management',
    description: "Enhance your business's reputation with intelligent review routing technology.",
    type: 'website',
    url: 'https://raatum.com',
    siteName: 'Raatum',
    images: [
      {
        url: '/logo.png', // Use /logo.png for Open Graph
        width: 1200,
        height: 630,
        alt: 'Raatum Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raatum - Maximize Your Reviews',
    description: "Automate review management to boost your business's reputation.",
    images: '/logo.png', // Use /logo.png for Twitter
  },
  robots: 'index, follow',
};

// Define viewport separately to resolve the warning
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Define structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Raatum',
  applicationCategory: 'BusinessApplication',
  description: "Raatum's automated review management platform helps businesses collect and manage customer feedback effectively.",
  offers: {
    '@type': 'Offer',
    price: '30',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '150',
  },
  image: '/logo.png', // Use /logo.png for structured data
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" /> {/* Keep favicon as /favicon.ico */}
        <link rel="apple-touch-icon" href="/logo.png" /> {/* Use /logo.png */}
        <link rel="manifest" href="/manifest.json" /> {/* Assuming manifest uses /logo.png internally */}

        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Google Analytics Script */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M2Q8L0LVQ6"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M2Q8L0LVQ6');
            `,
          }}
        />
        {/* End Google Analytics Script */}

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
          <noscript>
            <div className="bg-yellow-100 p-4 text-center">
              Please enable JavaScript to use all features of Raatum
            </div>
          </noscript>

          {children}
          <Toaster />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}