'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    ArrowRight,
    Download,
    Check,
    Plus,
    Building2,
    Briefcase,
    Users,
    Home,
    Coins,
    Landmark,
    ClipboardCheck,
    Scale,
    Calculator,
    User,
    Layers,
    type LucideIcon,
} from 'lucide-react'

import { useI18n } from '@/i18n/I18nProvider'
import { LanguageSwitcher } from './LanguageSwitcher'

type Verdict = 'ready' | 'limited'

interface Persona {
    id: string
    name: string
    short: string
    icon: LucideIcon
    verdict: Verdict
    tagline: string
    workflow: string
    delivers: string[]
    planned: string[]
}

/**
 * Single source of truth for the Use Cases page. Adding a persona is a
 * one-object change — the tabs, detail panel, and CTAs all render from here.
 * Content mirrors the product audit (2026-07-04) so the page never oversells:
 * "delivers" is shipped and tested; "planned" is what lands next on the roadmap.
 */
const PERSONAS: Persona[] = [
    {
        id: 'multi-entity',
        name: 'Multi-Entity Entrepreneur',
        short: 'Entrepreneur',
        icon: Layers,
        verdict: 'ready',
        tagline: 'Several LLCs, partnerships, an S-corp, real estate, brokerage and crypto — and multiple advisors.',
        workflow: 'Keep one coherent picture of a sprawling financial world all year, not just at tax time.',
        delivers: [
            'Cross-entity consolidation with real subtotals',
            'Partner basis, depreciation, crypto 8949 and a live federal estimate',
            'Financial Map of who owns what and what generates which form',
            'Bank, broker & QuickBooks CSV import, columns auto-detected',
            'Multi-year memory and "why did this change?"',
            'Filing-ready package a CPA — yours or one from our marketplace — files for you',
        ],
        planned: [
            'Live bank, broker & QuickBooks auto-sync',
        ],
    },
    {
        id: 'partnership',
        name: 'Partnership Member',
        short: 'Partnership',
        icon: Users,
        verdict: 'ready',
        tagline: 'Receives multiple K-1s, owns several LLCs, needs basis and entity clarity.',
        workflow: 'Track partner basis across entities and understand how ownership flows into the return.',
        delivers: [
            'Partner outside-basis roll-forward (§705 / §731 / §704(d))',
            'Basis auto-filled from your K-1 boxes',
            'Entity ownership graph and multi-year comparison',
            'Deterministic federal estimate and CPA-ready review',
            'Filing-ready package a CPA — yours or one from our marketplace — files for you',
        ],
        planned: [
            'At-risk & passive-loss limitation tracking',
        ],
    },
    {
        id: 'small-business',
        name: 'Small Business Owner',
        short: 'Business owner',
        icon: Building2,
        verdict: 'limited',
        tagline: 'Runs an LLC, pays contractors and vendors, must issue 1099s, works with one CPA.',
        workflow: 'Keep the books clean, catch missing W-9s, and hand a complete package to the CPA.',
        delivers: [
            'Auto-categorized Schedule C ledger, duplicate-proof',
            'Bank statement & CSV import, columns auto-detected',
            '1099-NEC prep: $600 threshold, missing-W-9 detection, vendor memory',
            'Deterministic tax estimate and deadline warnings',
            'Filing-ready package a CPA — yours or one from our marketplace — files for you',
        ],
        planned: [
            'Live bank feed (Plaid) & receipt OCR',
            'Generated 1099-NEC & W-9 PDFs',
        ],
    },
    {
        id: 'real-estate',
        name: 'Real Estate Investor',
        short: 'Real estate',
        icon: Home,
        verdict: 'limited',
        tagline: 'Owns rentals and short-term stays with depreciation, mortgages, insurance and repairs.',
        workflow: 'Depreciate property correctly and organize expenses toward Schedule E.',
        delivers: [
            'MACRS + straight-line depreciation, verified against IRS Pub. 946',
            'Land excluded automatically; full year-by-year schedule',
            'Schedule E routing and an expense ledger',
        ],
        planned: [
            'Auto-detect assets from closing documents',
            'Per-property P&L & cash-flow comparison',
        ],
    },
    {
        id: 'freelancer',
        name: 'Freelancer',
        short: 'Freelancer',
        icon: Briefcase,
        verdict: 'limited',
        tagline: 'Tracks payments and expenses, files quarterly estimates, needs light bookkeeping.',
        workflow: 'Categorize expenses, estimate quarterly taxes, and prepare a clean Schedule C.',
        delivers: [
            'Auto-categorized Schedule C ledger',
            'Bank statement & CSV import, columns auto-detected',
            'Deterministic quarterly and annual federal estimate',
            'CPA-ready review package',
        ],
        planned: [
            'Invoicing & payment tracking',
            'Mileage workspace',
        ],
    },
    {
        id: 'crypto',
        name: 'Crypto Investor',
        short: 'Crypto',
        icon: Coins,
        verdict: 'limited',
        tagline: 'Holds assets across wallets and exchanges — Coinbase, Kraken, Ledger, DeFi.',
        workflow: 'Turn dispositions into an accurate Form 8949 and Schedule D total.',
        delivers: [
            'Deterministic Form 8949 → Schedule D gains (short / long / net)',
            'Imports from CSV or connected 8949 lots',
            'Every figure explained, never a language model',
        ],
        planned: [
            'Wash-sale detection view',
            'Live wallet & exchange sync',
        ],
    },
    {
        id: 'family-office',
        name: 'Family Office',
        short: 'Family office',
        icon: Landmark,
        verdict: 'limited',
        tagline: 'Coordinates parents, children, trusts, LLCs and investments.',
        workflow: 'Separate entities cleanly, keep historical memory, and coordinate advisors.',
        delivers: [
            'Family vault with clean multi-entity separation',
            'Consolidation and durable multi-year memory',
            'Advisor coordination via review notes',
        ],
        planned: [
            'Role-scoped member permissions',
            'Generated CPA packages',
        ],
    },
    {
        id: 'cpa',
        name: 'CPA',
        short: 'CPA',
        icon: ClipboardCheck,
        verdict: 'limited',
        tagline: 'Manages many clients and needs review, audit trail, evidence and explanations.',
        workflow: 'Review a client vault, inspect evidence, request documents, and communicate.',
        delivers: [
            'Review & advisor notes with open items first',
            'Evidence Explorer for every recommendation',
            'Expert-review readiness and blockers',
        ],
        planned: [
            'Per-client financial workspaces',
            'Generated workpaper exports',
        ],
    },
    {
        id: 'estate-attorney',
        name: 'Estate Planning Attorney',
        short: 'Attorney',
        icon: Scale,
        verdict: 'limited',
        tagline: 'Works with trusts, LLCs, ownership structures and beneficiaries.',
        workflow: 'Understand and visualize ownership, and check it for inconsistencies.',
        delivers: [
            'Financial Map of ownership and the forms each entity generates',
            'Entity modeling with an inspectable evidence trail',
        ],
        planned: [
            'Generated report & evidence exports',
            'Deep ownership-chain consistency checks',
        ],
    },
    {
        id: 'bookkeeper',
        name: 'Bookkeeper',
        short: 'Bookkeeper',
        icon: Calculator,
        verdict: 'limited',
        tagline: 'Handles daily reconciliation, invoices, bills and expenses.',
        workflow: 'Categorize transactions, avoid duplicates, and prepare a monthly package.',
        delivers: [
            'Ledger with deterministic categorization',
            'Duplicate-expense prevention',
            'Schedule C roll-up by category',
        ],
        planned: [
            'Live bank-feed reconciliation',
            'Receipt requests & monthly-close package',
        ],
    },
    {
        id: 'individual',
        name: 'Individual Taxpayer',
        short: 'Individual',
        icon: User,
        verdict: 'limited',
        tagline: 'Simple W-2, a 1099, mortgage interest and charity.',
        workflow: 'Organize documents, understand the return, and estimate the refund.',
        delivers: [
            'Deterministic federal 1040 estimate (AGI → taxable → tax → refund)',
            'Document organization and plain-language explanation with IRS citations',
            'Filing-ready package a CPA — yours or one from our marketplace — files for you',
        ],
        planned: [
            'Full return preparation',
            'State returns',
        ],
    },
]

const VERDICT_META: Record<Verdict, { label: string; className: string }> = {
    ready: { label: 'Available today', className: 'po-uc-badge-ready' },
    limited: { label: 'Core ready — more coming', className: 'po-uc-badge-soon' },
}

function DesktopBrandMark({ size = 22, dim = false }: { size?: number; dim?: boolean }) {
    return (
        <span className={`po-brand-mark ${dim ? 'po-brand-mark-dim' : ''}`} style={{ width: size, height: size }}>
            <Image src="/prompttax-desktop-logo.png" alt="Prompt.tax" width={size} height={size} priority />
        </span>
    )
}

export function PersonaShowcase() {
    const { t } = useI18n()
    const [activeId, setActiveId] = useState(PERSONAS[0].id)
    const active = PERSONAS.find((p) => p.id === activeId) ?? PERSONAS[0]
    const ActiveIcon = active.icon
    const verdict = VERDICT_META[active.verdict]

    return (
        <div className="promptos min-h-screen bg-black text-white">
            {/* NAV */}
            <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-[var(--po-border)] bg-black/80 px-5 backdrop-blur-xl sm:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3 text-sm font-medium text-white">
                        <DesktopBrandMark />
                        <span className="po-brand-wordmark">Prompt.tax</span>
                        <span className="po-beta-badge">Beta</span>
                    </Link>
                    <div className="hidden gap-6 md:flex">
                        <a href="/#product" className="text-[13px] text-[var(--po-muted)] transition-colors hover:text-white">
                            {t('nav.product')}
                        </a>
                        <span className="text-[13px] text-white">{t('nav.useCases')}</span>
                        <a href="/#download" className="text-[13px] text-[var(--po-muted)] transition-colors hover:text-white">
                            {t('nav.download')}
                        </a>
                    </div>
                </div>
                <div className="flex items-center gap-2.5">
                    <LanguageSwitcher />
                    <a
                        href="/download"
                        className="flex h-8 items-center gap-1.5 rounded-md bg-white px-2.5 text-[12px] font-medium text-black transition-colors hover:bg-white/88 sm:px-3.5 sm:text-[13px]"
                    >
                        <span className="hidden sm:inline">{t('nav.cta')}</span>
                        <Download className="h-3.5 w-3.5" />
                    </a>
                </div>
            </nav>

            {/* HERO */}
            <header className="relative overflow-hidden px-6 pb-10 pt-20 text-center">
                <div className="po-hero-vignette" aria-hidden />
                <div className="relative mx-auto max-w-3xl">
                    <div className="po-mono mb-5 inline-flex items-center gap-2 text-xs tracking-[0.08em] text-[var(--po-muted)]">
                        <span className="text-white/20">—</span> USE CASES
                    </div>
                    <h1 className="mx-auto max-w-[820px] text-balance text-4xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                        Built for complex financial lives.
                    </h1>
                    <p className="mx-auto mt-5 max-w-[640px] text-[15px] leading-relaxed text-[var(--po-muted)]">
                        Pick who you are. See exactly what PromptTax does for you today—and what&apos;s landing next.
                        Everything below is real, deterministic, and evidence-backed, and the tool gets better every week.
                    </p>
                    <div className="mt-7 flex items-center justify-center gap-2.5">
                        <a href="/download" className="flex h-10 items-center gap-1.5 rounded-lg bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-white/88">
                            {t('hero.ctaPrimary')} <ArrowRight className="h-4 w-4" />
                        </a>
                        <a href="/#product" className="flex h-10 items-center rounded-lg border border-[var(--po-border-med)] px-5 text-sm text-[var(--po-muted)] transition-colors hover:border-white/25 hover:text-white">
                            {t('hero.ctaSecondary')}
                        </a>
                    </div>
                </div>
            </header>

            {/* TABS */}
            <div className="mx-auto max-w-6xl px-4">
                <div className="po-uc-tabs" role="tablist" aria-label="Personas">
                    {PERSONAS.map((p) => {
                        const Icon = p.icon
                        const isActive = p.id === activeId
                        return (
                            <button
                                key={p.id}
                                role="tab"
                                aria-selected={isActive}
                                className={`po-uc-tab ${isActive ? 'po-uc-tab-active' : ''}`}
                                onClick={() => setActiveId(p.id)}
                            >
                                <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                                <span>{p.short}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* DETAIL PANEL */}
            <section className="mx-auto max-w-6xl px-4 pb-16 pt-8" aria-live="polite">
                <article className="po-uc-panel">
                    <div className="po-uc-panel-head">
                        <div className="po-uc-panel-icon">
                            <ActiveIcon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                        </div>
                        <div className="po-uc-panel-heading">
                            <div className="flex flex-wrap items-center gap-3">
                                <h2 className="text-2xl font-semibold tracking-[-0.02em]">{active.name}</h2>
                                <span className={`po-uc-badge ${verdict.className}`}>{verdict.label}</span>
                            </div>
                            <p className="mt-1.5 text-[14px] text-[var(--po-muted)]">{active.tagline}</p>
                        </div>
                    </div>

                    <div className="po-uc-workflow">
                        <span className="po-uc-workflow-label">The daily job</span>
                        <p className="po-uc-workflow-text">{active.workflow}</p>
                    </div>

                    <div className="po-uc-grid">
                        <div className="po-uc-col">
                            <h3 className="po-uc-col-title po-uc-col-title-ready">What PromptTax does today</h3>
                            <ul className="po-uc-list">
                                {active.delivers.map((item) => (
                                    <li key={item} className="po-uc-li">
                                        <Check className="po-uc-li-icon po-uc-li-icon-ready" strokeWidth={2.25} aria-hidden />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="po-uc-col">
                            <h3 className="po-uc-col-title po-uc-col-title-soon">Coming soon</h3>
                            <ul className="po-uc-list">
                                {active.planned.map((item) => (
                                    <li key={item} className="po-uc-li">
                                        <Plus className="po-uc-li-icon po-uc-li-icon-soon" strokeWidth={2.25} aria-hidden />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="po-uc-cta">
                        <a href="/download" className="flex h-10 items-center gap-1.5 rounded-lg bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-white/88">
                            {t('hero.ctaPrimary')} <ArrowRight className="h-4 w-4" />
                        </a>
                        <a href="/#product" className="flex h-10 items-center rounded-lg border border-[var(--po-border-med)] px-5 text-sm text-[var(--po-muted)] transition-colors hover:border-white/25 hover:text-white">
                            {t('hero.ctaSecondary')}
                        </a>
                    </div>
                </article>
            </section>

            {/* CLOSING CTA */}
            <section className="px-6 pb-24">
                <div className="po-uc-closing mx-auto max-w-4xl">
                    <h2 className="text-balance text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                        Take control of your financial life.
                    </h2>
                    <p className="mx-auto mt-4 max-w-[560px] text-[15px] text-[var(--po-muted)]">
                        Local-first, evidence-backed, and deterministic. Your data never leaves your machine.
                    </p>
                    <div className="mt-7 flex items-center justify-center gap-2.5">
                        <a href="/download" className="flex h-11 items-center gap-1.5 rounded-lg bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-white/88">
                            {t('hero.ctaPrimary')} <Download className="h-4 w-4" />
                        </a>
                        <a href="/pricing" className="flex h-11 items-center rounded-lg border border-[var(--po-border-med)] px-6 text-sm text-[var(--po-muted)] transition-colors hover:border-white/25 hover:text-white">
                            See pricing
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
