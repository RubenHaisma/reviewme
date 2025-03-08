import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
  viewport: 'width=device-width, initial-scale=1',
};

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

          {process.env.NODE_ENV === 'production' && (
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}