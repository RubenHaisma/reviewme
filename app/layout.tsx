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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raatum - Maximize Your Reviews',
    description: "Automate review management to boost your business's reputation.",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Google Tag Manager Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','G-M2Q8L0LVQ6');
            `,
          }}
        />
        {/* End Google Tag Manager Script */}

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

        {/* Google Tag Manager NoScript Fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=G-M2Q8L0LVQ6"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager NoScript Fallback */}
      </body>
    </html>
  );
}