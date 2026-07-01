import type { Metadata } from 'next'
import Link from 'next/link'

import { PromptOSFooter } from '@/components/marketing/promptos/PromptOSFooter'
import { Reveal } from '@/components/marketing/promptos/Reveal'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Prompt.tax pricing — start free on desktop.',
}

export default function PricingPage() {
  return (
    <div className="promptos po-legal-page">
      <div className="po-legal-backdrop" aria-hidden />

      <header className="po-pricing-hero relative overflow-hidden border-b border-[var(--po-border)] px-6 pb-16 pt-24 sm:px-10">
        <div className="po-spotlight" aria-hidden />
        <div className="po-grid h-[520px]" aria-hidden />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <div className="po-section-badge"><span className="po-section-badge-text">Pricing</span></div>
            <h1 className="po-legal-title">Start free on desktop.</h1>
            <p className="po-legal-description">
              Prompt.tax is desktop-first and free to get started. Download the app, connect your
              documents, and take control of your financial life. Hosted cloud plans are coming soon.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/#download" className="po-legal-download-link">
                Download desktop
              </Link>
            </div>
          </Reveal>
        </div>
      </header>

      <PromptOSFooter downloadHref="/#download" />
    </div>
  )
}
