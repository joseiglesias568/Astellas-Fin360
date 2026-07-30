import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LayoutWrapper from './layout-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://astellas-finance360.vercel.app'),
  title: {
    default: 'Astellas Finance360 - AI-Powered Management Reporting',
    template: '%s | Astellas Finance360'
  },
  description: 'AI-powered management reporting platform for Astellas Pharma Inc. Real-time financial insights, pharmaceutical analytics, and comprehensive enterprise reporting.',
  keywords: [
    'financial reporting',
    'management reporting',
    'business intelligence',
    'financial analytics',
    'Astellas',
    'Astellas Pharma',
    'ALPMY',
    'XTANDI',
    'PADCEV',
    'pharmaceutical finance',
    'FP&A platform',
    'financial planning',
    'business performance',
    'enterprise finance',
    'AI financial insights'
  ],
  authors: [{ name: 'Astellas Pharma Inc.' }],
  creator: 'Astellas Pharma Inc.',
  publisher: 'Astellas Pharma Inc.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Astellas Finance360 - AI-Powered Management Reporting',
    description: 'AI-powered management reporting platform for Astellas Pharma Inc.',
    siteName: 'Astellas Finance360',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Astellas Finance360 Management Reporting Platform'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astellas Finance360 - AI-Powered Management Reporting',
    description: 'AI-powered management reporting platform for Astellas Pharma Inc.',
    images: ['/twitter-image.png'],
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
  icons: {
    icon: [
      { url: '/logo-astellas.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/logo-astellas.svg' }
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Astellas Finance360',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Web',
              description: 'AI-powered management reporting platform for Astellas Pharma Inc. Real-time financial insights, pharmaceutical analytics, and comprehensive enterprise reporting.',
              author: {
                '@type': 'Organization',
                name: 'Astellas Pharma Inc.',
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}
