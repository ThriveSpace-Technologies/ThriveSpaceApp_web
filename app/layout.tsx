import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://thrivespace.com'),
  title: {
    default: 'ThriveSpace - Wellness works better together',
    template: '%s | ThriveSpace'
  },
  description: 'Most people struggle with health goals alone. ThriveSpace connects you with others on similar journeys, turning individual challenges into shared victories through community accountability and genuine support.',
  keywords: [
    'wellness community',
    'health accountability',
    'fitness support group',
    'wellness habits',
    'community wellness',
    'health goals support',
    'wellness journey',
    'fitness motivation',
    'health tracking',
    'wellness app',
    'fitness community',
    'healthy habits tracker'
  ],
  authors: [{ name: 'ThriveSpace Team' }],
  creator: 'ThriveSpace',
  publisher: 'ThriveSpace',
  category: 'Health & Fitness',
  classification: 'Wellness Community Platform',

  openGraph: {
    title: 'ThriveSpace - Wellness works better together',
    description: 'Most people struggle with health goals alone. ThriveSpace connects you with others on similar journeys, turning individual challenges into shared victories through community accountability and genuine support.',
    type: 'website',
    locale: 'en_US',
    url: 'https://thrivespace.com',
    siteName: 'ThriveSpace',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ThriveSpace - Community-powered wellness platform'
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    site: '@thrivespace',
    creator: '@thrivespace',
    title: 'ThriveSpace - Wellness works better together',
    description: 'Most people struggle with health goals alone. ThriveSpace connects you with others on similar journeys, turning individual challenges into shared victories.',
    images: ['/twitter-card.png']
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
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },

  alternates: {
    canonical: 'https://thrivespace.com',
    languages: {
      'en-US': 'https://thrivespace.com',
    }
  },

  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'ThriveSpace',
    'application-name': 'ThriveSpace',
    'theme-color': '#0062FF',
    'color-scheme': 'light'
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}