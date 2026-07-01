// Content for the PromptOS landing page. Kept as typed data so copy lives in
// one place and the section components stay presentational.

import type { LucideIcon } from 'lucide-react'
import { Brain, Database, FileSearch, Lock, ShieldCheck } from 'lucide-react'

export type FeatureBullet = string

export interface Feature {
    eyebrow: string
    title: string
    titleAccent: string
    body: string
    bullets: FeatureBullet[]
    icon: LucideIcon
}

export interface DownloadTarget {
    os: 'macos' | 'windows' | 'linux'
    label: string
    sublabel: string
    artifactName: string
    /** Matches asset names in the GitHub release for OS detection. */
    matchers: RegExp[]
}

export interface Testimonial {
    quote: string
    name: string
    role: string
}

export interface FooterLink {
    label: string
    href: string
    external?: boolean
}

// The marquee of real capabilities (no fluff, all shipped or on the roadmap).
export const CAPABILITY_PILLS: string[] = [
    'Schedule K-1 extraction',
    'Form 1065 partnerships',
    'Entity relationship mapping',
    'BOIR / FinCEN tracking',
    'QBI deduction discovery',
    'Multi-year tax memory',
    'Crypto cost basis',
    '1040 schedules',
    'Document fingerprinting',
    'Deadline awareness',
    'Local folder watching',
    'Evidence-linked answers',
]

export const FEATURES: Feature[] = [
    {
        eyebrow: 'Document intelligence',
        title: 'Drop it in.',
        titleAccent: 'It understands.',
        body: 'K-1s, agreements, statements, and compliance docs are classified and attached to the right entity the moment they land in your vault.',
        bullets: [
            'Automatic entity classification',
            'Cross-year document linking',
            'Deterministic fingerprinting',
        ],
        icon: FileSearch,
    },
    {
        eyebrow: 'Reasoning, not autocomplete',
        title: 'Ask in plain English.',
        titleAccent: 'Get cited answers.',
        body: 'PromptTax remembers every year, every entity, and every document — then answers with traceable evidence instead of confident guesses.',
        bullets: [
            'Cross-year income analysis',
            'Entity relationship reasoning',
            'Source-linked answers',
        ],
        icon: Brain,
    },
    {
        eyebrow: 'Morning briefing',
        title: 'Wake up to',
        titleAccent: 'a calm summary.',
        body: 'The OS greets you, tells you what changed, what needs attention, and what stayed quiet — before you even ask.',
        bullets: [
            'Good morning briefing',
            'Only meaningful changes',
            'Clear next action',
        ],
        icon: Lock,
    },
]

export const PILLARS: { icon: LucideIcon; title: string; body: string; floatDuration: string }[] = [
    {
        icon: Database,
        title: 'Your financial life, remembered',
        body: 'PromptTax organizes your documents, entities, tax years, and important events into one private Financial Vault so you never lose context from year to year.',
        floatDuration: '6s',
    },
    {
        icon: ShieldCheck,
        title: 'You stay in control',
        body: 'PromptTax prepares, explains, and recommends. You decide what gets sent, filed, shared, or approved.',
        floatDuration: '7.5s',
    },
    {
        icon: FileSearch,
        title: 'Every recommendation is explained',
        body: 'Click Why? to see the document, calculation, IRS guidance, and reasoning behind every suggestion.',
        floatDuration: '8.2s',
    },
]

export const DOWNLOADS: DownloadTarget[] = [
    {
        os: 'windows',
        label: 'Windows',
        sublabel: 'Windows 10 & 11',
        artifactName: 'latest.msi',
        matchers: [/latest\.msi$/i, /\.msi$/i, /\.exe$/i],
    },
    {
        os: 'macos',
        label: 'macOS',
        sublabel: 'Apple Silicon & Intel',
        artifactName: 'latest.dmg',
        matchers: [/latest\.dmg$/i, /\.dmg$/i],
    },
    {
        os: 'linux',
        label: 'Linux',
        sublabel: 'Universal AppImage',
        artifactName: 'latest.AppImage',
        matchers: [/latest\.appimage$/i, /\.appimage$/i, /\.deb$/i],
    },
]

export const FOOTER_VALUES: string[] = [
    'Privacy First',
    'Runs Locally',
    'Deterministic Tax Engine',
    'Evidence Backed',
]

export const FOOTER_NAV: FooterLink[] = [
    { label: 'Download', href: '/download' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Documentation', href: '/#product' },
    { label: 'Support', href: 'mailto:hi@prompt.tax', external: true },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
]

// Honest, outcome-focused statements. Replace names with real pilot users
// (and their consent) before launch — placeholders are intentionally generic.
export const TESTIMONIALS: Testimonial[] = [
    {
        quote: 'I run a dozen entities. Tax season used to start with three weeks of sorting PDFs. Now my vault is organized before I finish my coffee.',
        name: 'Pilot user',
        role: 'Multi-entity operator',
    },
    {
        quote: 'It cross-referenced every K-1 and showed me exactly why my income moved year over year — with the source page for each number.',
        name: 'Pilot user',
        role: 'Fund LP investor',
    },
    {
        quote: 'Local-first was non-negotiable for me. My financial data never leaves my machine, and the answers still cite their evidence.',
        name: 'Pilot user',
        role: 'Privacy-focused founder',
    },
    {
        quote: 'The thing I trust most is that it tells me when it does not know. No invented deductions, no guessed totals.',
        name: 'Pilot user',
        role: 'Real estate investor',
    },
]

// Configure these for the desktop release repository.
export const GITHUB_OWNER = 'prompttax'
export const GITHUB_REPO = 'prompttax'
export const RELEASES_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases`
export const LATEST_RELEASE_API = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`
