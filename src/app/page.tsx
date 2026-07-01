import { PromptOSLanding } from '@/components/marketing/promptos/PromptOSLanding'

const softwareApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Prompt.tax',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Windows, macOS, Linux',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Desktop-first tax and financial workflow app that organizes documents, understands tax-relevant information, and helps you take control of complex financial lives.',
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <PromptOSLanding />
    </>
  )
}
