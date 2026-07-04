import type { Metadata } from 'next'

import { PersonaShowcase } from '@/components/marketing/promptos/PersonaShowcase'
import { PromptOSFooter } from '@/components/marketing/promptos/PromptOSFooter'

export const metadata: Metadata = {
    title: 'Use cases — PromptTax',
    description:
        'See exactly what PromptTax does for entrepreneurs, partnerships, small businesses, real estate, crypto, CPAs and more—today, with honest limitations. Local-first, deterministic, evidence-backed.',
}

export default function UseCasesPage() {
    return (
        <div className="promptos">
            <PersonaShowcase />
            <PromptOSFooter />
        </div>
    )
}
