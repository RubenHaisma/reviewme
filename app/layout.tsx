import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieConsent } from '@/components/ui/cookie-consent';
import './globals.css';

// Load the Inter font
const inter = Inter({ subsets: ['latin'] });

// Enhanced metadata for better SEO
export const metadata = {
  metadataBase: new URL('https://OpiniFlow.com'),
  title: {
    default: 'OpiniFlow - Smart Review Management Platform | Boost Your Online Reputation',
    template: '%s | OpiniFlow'
  },
  description: 'Transform your customer feedback into growth with OpiniFlow. Our AI-powered review management platform helps businesses collect, analyze, and leverage customer feedback to build trust and drive revenue. Start free with 20 customers.',
  keywords: [
    'review management',
    'customer feedback',
    'reputation management',
    'online reviews',
    'business reviews',
    'customer satisfaction',
    'feedback automation',
    'review collection',
    'customer experience',
    'business reputation',
    'google reviews',
    'review optimization',
    'customer insights',
    'feedback analysis',
    'review automation'
  ],
  authors: [{ name: 'OpiniFlow Team' }],
  creator: 'OpiniFlow',
  publisher: 'OpiniFlow',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://OpiniFlow.com',
    siteName: 'OpiniFlow',
    title: 'OpiniFlow - Transform Your Customer Reviews into Business Growth',
    description: 'Automate your review collection, turn feedback into insights, and boost your online reputation. Start free with 20 customers.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OpiniFlow - Smart Review Management Platform',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpiniFlow - Smart Review Management Platform',
    description: 'Transform customer feedback into business growth. Start free with 20 customers.',
    creator: '@OpiniFlowHQ',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://OpiniFlow.com',
    languages: {
      'en-US': 'https://OpiniFlow.com',
      'de-DE': 'https://OpiniFlow.com/de',
      'es-ES': 'https://OpiniFlow.com/es',
    },
  },
};

// Define viewport separately to resolve the warning
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
};

// Enhanced structured data for better search results
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'OpiniFlow',
  applicationCategory: 'BusinessApplication',
  description: 'OpiniFlow is an AI-powered review management platform that helps businesses collect, analyze, and leverage customer feedback to build trust and drive growth.',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Start free with 20 customers, then choose a plan that grows with your business',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '150',
    bestRating: '5',
    worstRating: '1',
  },
  review: {
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
    author: {
      '@type': 'Person',
      name: 'Sarah Johnson',
    },
    reviewBody: 'OpiniFlow has transformed how we handle customer feedback. The automation and insights are incredible!',
  },
  image: '/logo.png',
  screenshot: '/dashboard-preview.png',
  featureList: [
    'Automated review collection',
    'Smart review routing',
    'Real-time analytics',
    'Integration with popular platforms',
    'Custom branding options',
  ],
  award: 'Best Review Management Platform 2024',
};

// Organization schema for enhanced business information
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OpiniFlow',
  url: 'https://OpiniFlow.com',
  logo: 'https://OpiniFlow.com/logo.png',
  sameAs: [
    'https://twitter.com/OpiniFlowHQ',
    'https://www.linkedin.com/company/OpiniFlow',
    'https://www.facebook.com/OpiniFlowHQ',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-123-4567',
    contactType: 'customer service',
    availableLanguage: ['English', 'Spanish', 'German'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#2563eb',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/logo.png" as="image" />

        {/* Google Analytics Script */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Microsoft Clarity for enhanced analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `,
          }}
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
              Please enable JavaScript to use all features of OpiniFlow - The Smart Review Management Platform
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