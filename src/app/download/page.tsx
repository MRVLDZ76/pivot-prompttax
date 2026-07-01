import type { Metadata } from 'next'

import { PromptOSLanding } from '@/components/marketing/promptos/PromptOSLanding'

export const metadata: Metadata = {
  title: 'Download',
  description: 'Download the Prompt.tax desktop app for Windows, macOS, and Linux.',
}

export default function DownloadPage() {
  return <PromptOSLanding initialSection="download" />
}
