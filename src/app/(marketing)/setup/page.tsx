import type { Metadata } from 'next'

import { SetupGuide } from '@/components/marketing/promptos/SetupGuide'

export const metadata: Metadata = {
    title: 'Setup guide',
    description:
        'Install PromptTax on Windows, create your local Financial Vault, configure your settings, and choose how AI runs — locally with Ollama or with your own API key.',
}

export default function SetupPage() {
    return <SetupGuide />
}
