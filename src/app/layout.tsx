import type { Metadata, Viewport } from 'next'

import './globals.css'
import './promptos.css'
import { I18nProvider } from '@/i18n/I18nProvider'

const siteUrl = 'https://prompt.tax'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Prompt.tax — Your financial world. Understood.',
    template: '%s · Prompt.tax',
  },
  description:
    'Prompt.tax is a desktop-first tax and financial workflow app that organizes your documents, understands tax-relevant information, and helps you take control of complex financial lives.',
  applicationName: 'Prompt.tax',
  keywords: ['tax', 'K-1', 'financial documents', 'desktop', 'CPA', 'tax preparation'],
  authors: [{ name: 'Red Pill Software, LLC' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Prompt.tax',
    title: 'Prompt.tax — Your financial world. Understood.',
    description:
      'Organize your documents, understand tax-relevant information, and take control of complex financial lives.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt.tax — Your financial world. Understood.',
    description:
      'Organize your documents, understand tax-relevant information, and take control of complex financial lives.',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Prompt.tax',
  url: siteUrl,
  legalName: 'Red Pill Software, LLC',
  email: 'hi@prompt.tax',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7901 4th St N, Ste 300',
    addressLocality: 'St. Petersburg',
    addressRegion: 'FL',
    postalCode: '33702',
    addressCountry: 'US',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Prompt.tax',
  url: siteUrl,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
