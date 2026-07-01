import type { Metadata } from 'next'

import { PromptOSFooter } from '@/components/marketing/promptos/PromptOSFooter'
import { PricingHero } from '@/components/marketing/promptos/PricingHero'

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
          <PricingHero />
        </div>
      </header>

      <PromptOSFooter downloadHref="/#download" />
    </div>
  )
}
