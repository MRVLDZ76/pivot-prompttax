'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Eye, Activity, FolderOpen, FileText, Download, Users, Grid2X2 } from 'lucide-react'
import { Reveal } from './Reveal'
import { HeroMock } from './HeroMock'
import { DownloadSection } from './DownloadSection'
import { PromptOSFooter } from './PromptOSFooter'
import { CAPABILITY_PILLS, PILLARS, TESTIMONIALS } from './data'

type HeroSequenceStage = 0 | 1 | 2 | 3 | 4

function DesktopBrandMark({ size = 22, dim = false }: { size?: number; dim?: boolean }) {
    return (
        <span className={`po-brand-mark ${dim ? 'po-brand-mark-dim' : ''}`} style={{ width: size, height: size }}>
            <Image src="/prompttax-desktop-logo.png" alt="Prompt.tax" width={size} height={size} priority />
        </span>
    )
}

const FINANCIAL_OS_FEATURES = [
    {
        icon: FolderOpen,
        label: 'Document vault',
        color: 'rgba(186,207,247,0.7)',
        svg: (
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        ),
    },
    {
        icon: FileText,
        label: 'K-1 extraction',
        color: 'rgba(186,207,247,0.7)',
        svg: (
            <>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </>
        ),
    },
    {
        icon: Users,
        label: 'Entity mapping',
        color: 'rgba(186,207,247,0.7)',
        svg: (
            <>
                <circle cx="12" cy="5" r="3" />
                <path d="M12 8v8" />
                <circle cx="5" cy="18" r="3" />
                <circle cx="19" cy="18" r="3" />
                <path d="M12 16l-7 2M12 16l7 2" />
            </>
        ),
    },
    {
        icon: Grid2X2,
        label: 'Tax memory',
        color: 'rgba(186,207,247,0.7)',
        svg: (
            <>
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </>
        ),
    },
    {
        icon: Activity,
        label: 'AI copilot',
        color: 'rgba(186,207,247,0.7)',
        svg: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    },
    {
        icon: Eye,
        label: 'Compliance radar',
        color: 'rgba(186,207,247,0.7)',
        svg: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    },
    {
        icon: Download,
        label: 'BOIR filing',
        color: 'rgba(186,207,247,0.7)',
        svg: (
            <>
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
            </>
        ),
    },
    {
        icon: Users,
        label: 'CPA review',
        color: 'rgba(186,207,247,0.7)',
        svg: (
            <>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </>
        ),
    },
] as const

const WATCHER_EVENTS = [
    { dot: 'rgba(186,207,247,0.7)', title: 'New file detected', meta: 'K-1 · ABC Holdings · 2024.pdf', time: 'just now' },
    { dot: 'rgba(140,210,130,0.7)', title: 'Classified → K-1 · ordinary income', meta: 'Entity linked: ABC Holdings LLC', time: '0s' },
    { dot: 'rgba(186,207,247,0.7)', title: 'Memory updated', meta: 'Cross-referenced with 2023 K-1', time: '1s' },
    { dot: 'rgba(220,180,60,0.6)', title: 'Insight generated', meta: 'Income delta +$14,250 vs prior year', time: '2s' },
    { dot: 'rgba(140,210,130,0.7)', title: 'Ready for review', meta: 'No action required · all clear', time: '3s' },
] as const

const ACTION_TABS = {
    k1: {
        label: 'Generate K-1s',
        description:
            'Tell Prompt.tax to generate Schedule K-1s for all 7 partners of ABC Holdings LLC. It reads the partnership return, allocates income, deductions, and credits per ownership percentage, and outputs a complete, IRS-ready K-1 for each partner.',
        command: 'generate k1s --entity "ABC Holdings LLC" --year 2024',
    },
    export: {
        label: 'Export',
        description:
            'Export every partner K-1 as a signed PDF, IRS XML, or structured JSON, ready to send to each partner or attach to the partnership return. Outputs are named, dated, and organized automatically.',
        command: 'export k1s --format pdf --all-partners',
    },
    cpa: {
        label: 'CPA Package',
        description:
            'Compile a complete CPA-ready evidence package: K-1s, source documents, entity map, trust chain citations, and a summary memo. Everything your accountant needs, with nothing extra.',
        command: 'prepare cpa-package --include evidence',
    },
} as const

const ACTION_PARTNERS = [
    { init: 'JR', name: 'James R.', pct: '33.3%' },
    { init: 'SL', name: 'Sarah L.', pct: '25.0%' },
    { init: 'MK', name: 'Michael K.', pct: '20.0%' },
    { init: 'AT', name: 'Anna T.', pct: '12.5%' },
    { init: 'DW', name: 'David W.', pct: '5.1%' },
    { init: 'EC', name: 'Elena C.', pct: '4.1%' },
] as const

const BOOT_CACHE_KEY = 'promptos-boot-v2'
const BOOT_DURATION_MS = 1650
const BOOT_REVEAL_MS = 460
const BOOT_SKIP_DURATION_MS = 120
const BOOT_SKIP_REVEAL_MS = 280
const HERO_SEQUENCE_HOLD_MS = 1300
const HERO_SEQUENCE_TRANSITION_MS = 350

const HERO_SEQUENCE_MESSAGES = [
    'Reading your documents.',
    'Understanding your financial world.',
    'Connecting years, entities and evidence.',
    'Everything. Explained.',
] as const

interface PromptOSLandingProps {
    initialSection?: 'download'
}

export function PromptOSLanding({ initialSection }: PromptOSLandingProps = {}) {
    const [bootState, setBootState] = useState<'booting' | 'revealing' | 'done'>('booting')
    const [heroSequenceStage, setHeroSequenceStage] = useState<HeroSequenceStage>(0)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const hasCachedBoot = window.sessionStorage.getItem(BOOT_CACHE_KEY) === '1'
        const bootDuration = hasCachedBoot ? BOOT_SKIP_DURATION_MS : BOOT_DURATION_MS
        const revealDuration = hasCachedBoot ? BOOT_SKIP_REVEAL_MS : BOOT_REVEAL_MS

        const revealTimer = window.setTimeout(() => {
            setBootState('revealing')
            window.sessionStorage.setItem(BOOT_CACHE_KEY, '1')
        }, bootDuration)

        const doneTimer = window.setTimeout(() => {
            setBootState('done')
        }, bootDuration + revealDuration)

        const scrollTimer =
            initialSection === 'download'
                ? window.setTimeout(() => {
                      document.getElementById('download')?.scrollIntoView({
                          behavior: hasCachedBoot ? 'auto' : 'smooth',
                          block: 'start',
                      })
                  }, bootDuration + 60)
                : null

        return () => {
            window.clearTimeout(revealTimer)
            window.clearTimeout(doneTimer)
            if (scrollTimer !== null) {
                window.clearTimeout(scrollTimer)
            }
        }
    }, [initialSection])

    useEffect(() => {
        if (bootState !== 'done') return

        const timers: number[] = []

        HERO_SEQUENCE_MESSAGES.forEach((_, index) => {
            timers.push(
                window.setTimeout(() => {
                    setHeroSequenceStage(index as HeroSequenceStage)
                }, index * (HERO_SEQUENCE_HOLD_MS + HERO_SEQUENCE_TRANSITION_MS)),
            )
        })

        timers.push(
            window.setTimeout(() => {
                setHeroSequenceStage(4)
            }, HERO_SEQUENCE_MESSAGES.length * (HERO_SEQUENCE_HOLD_MS + HERO_SEQUENCE_TRANSITION_MS)),
        )

        return () => {
            timers.forEach((timer) => window.clearTimeout(timer))
        }
    }, [bootState])

    return (
        <div className={`promptos po-app-shell po-app-shell-${bootState}`}>
            <BootSequence state={bootState} />
            <div className="po-app-content">
            {/* NAV */}
            <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-[var(--po-border)] bg-black/80 px-5 backdrop-blur-xl sm:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3 text-sm font-medium text-white">
                        <DesktopBrandMark />
                        <span className="po-brand-wordmark">Prompt.tax</span>
                    </Link>
                    <div className="hidden gap-6 md:flex">
                        {[
                            { label: 'Product', href: '#product' },
                            { label: 'Download', href: '#download' },
                            { label: 'Terms', href: '/terms' },
                            { label: 'Privacy', href: '/privacy' },
                        ].map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-[13px] text-[var(--po-muted)] transition-colors hover:text-white"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
                <a
                    href="#download"
                    className="flex h-8 items-center gap-1.5 rounded-md bg-white px-3.5 text-[13px] font-medium text-black transition-colors hover:bg-white/88"
                >
                    Download desktop <Download className="h-3.5 w-3.5" />
                </a>
            </nav>

            {/* HERO */}
            <header className="relative overflow-hidden px-6 pb-20 pt-24 text-center">
                <div className="po-hero-vignette" aria-hidden style={{ ['--po-hero-light-shift' as string]: `${heroSequenceStage * 12}px` }} />
                <div className="po-spotlight" aria-hidden style={{ ['--po-hero-light-shift' as string]: `${heroSequenceStage * 12}px` }} />
                <div className="po-grid h-[560px]" aria-hidden />
                <div className="relative mx-auto max-w-3xl">
                    <Reveal>
                        <div className="mx-auto mb-8 flex w-fit flex-col items-center">
                            <div className={`po-hero-logo-wrap ${bootState === 'done' ? 'po-hero-logo-live' : ''}`} style={{ ['--po-hero-logo-intensity' as string]: `${1 + heroSequenceStage * 0.035}` }}>
                                <DesktopBrandMark size={99} />
                            </div>
                            <div className="po-mono mt-5 inline-flex items-center gap-2 text-xs tracking-[0.04em] text-[var(--po-muted)]">
                                <span className="text-white/20">—</span> Introducing Prompt.tax OS
                            </div>
                        </div>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h1 className="mx-auto max-w-[900px] text-balance text-5xl font-bold leading-[0.98] tracking-[-0.05em] sm:text-6xl md:text-[78px]">
                            Your financial world.
                            <br />
                            <span className="po-headline-soft">Understood.</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <UnderstandingSequence stage={heroSequenceStage} />
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="mt-9 flex items-center justify-center gap-2.5">
                            <a
                                href="#download"
                                className="flex h-10 items-center gap-1.5 rounded-lg bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-white/88"
                            >
                                Download desktop <ArrowRight className="h-4 w-4" />
                            </a>
                            <a
                                href="#download"
                                className="flex h-10 items-center rounded-lg border border-[var(--po-border-med)] px-5 text-sm text-[var(--po-muted)] transition-colors hover:border-white/25 hover:text-white"
                            >
                                Explore desktop pilot
                            </a>
                        </div>
                    </Reveal>
                    <Reveal delay={0.21}>
                        <p className="quote mx-auto mt-4 max-w-[720px] text-[12px] leading-relaxed text-white/42 sm:text-[13px]">
                            PromptTax does not silently sync documents, autonomously file, or invent financial facts. Agent activity stays inside explicit product boundaries and every meaningful conclusion stays traceable to evidence.
                        </p>
                    </Reveal>
                </div>

                <Reveal delay={0.2} className="relative mx-auto mt-16 w-full max-w-[1320px] px-0 sm:px-2">
                    <HeroMock />
                    <div className="po-glow -bottom-20 left-1/2 h-[200px] w-[600px] -translate-x-1/2" aria-hidden />
                </Reveal>
            </header>

            {/* CAPABILITY MARQUEE */}
            <div className="po-marquee-wrap overflow-hidden border-y border-[var(--po-border)] py-4">
                <div className="po-marquee">
                    {[...CAPABILITY_PILLS, ...CAPABILITY_PILLS].map((pill, i) => (
                        <div
                            key={`${pill}-${i}`}
                            className="flex h-7 shrink-0 items-center gap-2.5 whitespace-nowrap border-r border-[var(--po-border)] px-8 text-[13px] text-[var(--po-muted)]"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                            {pill}
                        </div>
                    ))}
                </div>
            </div>

            <FeatureSliderSection />
            <WatcherSection />
            <ActionsSection />

            {/* PILLARS */}
            <section className="po-trust-section border-b border-[var(--po-border)] px-6 py-24">
                <div className="po-trust-grid" aria-hidden>
                    <div className="po-trust-grid-mask" />
                </div>
                <div className="po-trust-glow" aria-hidden />
                <div className="po-trust-particles" aria-hidden>
                    <span className="po-trust-particle po-trust-particle-a" />
                    <span className="po-trust-particle po-trust-particle-b" />
                    <span className="po-trust-particle po-trust-particle-c" />
                    <span className="po-trust-particle po-trust-particle-d" />
                </div>
                <div className="mx-auto max-w-6xl">
                    <Reveal className="po-trust-intro mb-14 text-center">
                        <div className="po-section-badge">
                            <span className="po-section-badge-text">Trust by design</span>
                        </div>
                        <h2 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
                            Built to earn your trust.
                        </h2>
                        <p className="po-trust-copy mx-auto mt-5 max-w-3xl text-balance text-[15px] leading-relaxed text-[var(--po-muted)] sm:text-[17px]">
                            Every recommendation is backed by your documents, explained clearly, and always stays under your control.
                        </p>
                    </Reveal>
                    <div className="grid gap-5 md:grid-cols-3">
                        {PILLARS.map((p, i) => {
                            const Icon = p.icon
                            return (
                                <Reveal
                                    key={p.title}
                                    delay={i * 0.06}
                                    className="po-trust-card po-glow-border"
                                >
                                    <div className="po-trust-card-shell" style={{ ['--po-float-duration' as string]: p.floatDuration }}>
                                        <div className="po-trust-beam" />
                                        <div className="po-trust-card-top">
                                            <div className="po-trust-icon-wrap">
                                                <span className="po-trust-status-dot" />
                                                <Icon className="po-trust-icon" strokeWidth={1.5} />
                                            </div>
                                        </div>
                                        <h4 className="po-trust-title">{p.title}</h4>
                                        <p className="po-trust-body">{p.body}</p>
                                    </div>
                                </Reveal>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* DOWNLOAD */}
            <DownloadSection />

            {/* TESTIMONIALS */}
            <section className="border-t border-[var(--po-border)]">
                <Reveal className="border-b border-[var(--po-border)] px-7 py-14 sm:px-10">
                    <div className="po-mono mb-3 text-xs uppercase tracking-[0.06em] text-[var(--po-muted)]">
                        Early users
                    </div>
                    <div className="max-w-xl text-balance text-[28px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[38px]">
                        Built for people who run complex financial lives.
                    </div>
                </Reveal>
                <div className="grid sm:grid-cols-2">
                    {TESTIMONIALS.map((t, i) => (
                        <Reveal
                            key={t.quote}
                            delay={(i % 2) * 0.06}
                            className={`px-7 py-10 sm:px-10 ${
                                i % 2 === 0 ? 'sm:border-r' : ''
                            } ${i < TESTIMONIALS.length - 2 ? 'border-b' : ''} border-[var(--po-border)]`}
                        >
                            <p className="text-[15px] leading-relaxed text-white/80">&ldquo;{t.quote}&rdquo;</p>
                            <div className="mt-6 text-[13px] font-medium">{t.name}</div>
                            <div className="mt-0.5 text-[12px] text-[var(--po-muted)]">{t.role}</div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden border-t border-[var(--po-border)] px-6 py-28 text-center">
                <div
                    className="absolute left-1/2 top-0 h-px w-[800px] -translate-x-1/2 bg-gradient-to-r from-transparent via-[rgba(59,111,245,0.6)] to-transparent"
                    aria-hidden
                />
                <div className="po-glow left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2" aria-hidden />
                <Reveal className="relative">
                    <div className="po-mono mb-5 text-xs uppercase tracking-[0.06em] text-[var(--po-muted)]">
                        Start today
                    </div>
                    <h2 className="mx-auto max-w-2xl text-balance text-4xl font-bold leading-[1.06] tracking-[-0.04em] sm:text-5xl md:text-6xl">
                        Take control of your financial life.
                    </h2>
                    <div className="mt-9 flex items-center justify-center gap-2.5">
                        <a
                            href="#download"
                            className="flex h-11 items-center gap-1.5 rounded-lg bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-white/88"
                        >
                            Download desktop <ArrowRight className="h-4 w-4" />
                        </a>
                        <a
                            href="#download"
                            className="flex h-11 items-center rounded-lg border border-[var(--po-border-med)] px-6 text-sm text-[var(--po-muted)] transition-colors hover:border-white/25 hover:text-white"
                        >
                            Explore desktop pilot
                        </a>
                    </div>
                </Reveal>
            </section>

            {/* FOOTER */}
            <PromptOSFooter downloadHref="#download" />
            </div>
        </div>
    )
}

function UnderstandingSequence({ stage }: { stage: HeroSequenceStage }) {
    return (
        <div className="po-understanding-wrap mx-auto mt-6 max-w-[760px]" aria-live="polite">
            <div className="po-understanding-stage">
                {HERO_SEQUENCE_MESSAGES.map((message, index) => (
                    <div
                        key={message}
                        className={`po-understanding-panel ${stage === index ? 'po-understanding-panel-active' : ''}`}
                        aria-hidden={stage !== index}
                    >
                        <p className="po-understanding-line">{message}</p>
                    </div>
                ))}

                <div
                    className={`po-understanding-panel po-understanding-panel-final ${stage === 4 ? 'po-understanding-panel-active' : ''}`}
                    aria-hidden={stage !== 4}
                >
                    <p className="po-understanding-final-copy">
                        PromptTax reads your documents, remembers what matters across years, and explains every recommendation with evidence.
                    </p>
                </div>
            </div>
        </div>
    )
}

function BootSequence({ state }: { state: 'booting' | 'revealing' | 'done' }) {
    if (state === 'done') {
        return null
    }

    return (
        <div className="po-boot-layer" aria-hidden={state === 'revealing'}>
            <div className="po-boot-ambient" />
            <div className="po-boot-grid" />
            <div className="po-boot-particles">
                <span className="po-boot-particle po-boot-particle-a" />
                <span className="po-boot-particle po-boot-particle-b" />
                <span className="po-boot-particle po-boot-particle-c" />
                <span className="po-boot-particle po-boot-particle-d" />
            </div>
            <div className="po-boot-signature">
                <div className="po-boot-mark-shell">
                    <div className="po-boot-mark-bloom" />
                    <div className="po-boot-reflection" />
                    <div className="po-boot-scan">
                        <span className="po-boot-scan-core" />
                    </div>
                    <DesktopBrandMark size={78} />
                </div>
                <div className="po-boot-wordmark">PromptTax</div>
                <div className="po-boot-tagline">Personal Financial Intelligence</div>
            </div>
        </div>
    )
}

function FeatureSliderSection() {
    return (
        <section id="product" className="po-mid-section po-feature-slider-section border-b border-[var(--po-border)]">
            <Reveal className="mx-auto max-w-5xl px-6 pb-0 pt-24 text-center sm:px-10">
                <div className="po-section-badge"><span className="po-section-badge-text">The complete financial OS</span></div>
                <h2 className="po-mid-heading mx-auto max-w-4xl">
                    Everything your financial
                    <br />
                    <span className="po-mid-heading-soft">life needs, in one place.</span>
                </h2>
                <p className="po-mid-copy mx-auto text-center">
                    From documents to deadlines, entities to K-1s, Prompt.tax covers every surface of your financial world without pushing your source material into someone else&apos;s cloud.
                </p>
            </Reveal>

            <div className="po-feature-slider-wrap">
                <div className="po-feature-slider">
                    {FINANCIAL_OS_FEATURES.map((feature, index) => (
                        <div key={feature.label} className="po-feature-slider-fragment">
                            <div className="po-feature-item" style={{ animationDelay: `${index * 0.08}s` }}>
                                <div className="po-feature-icon-wrap">
                                    <div className="po-feature-icon-box">
                                        <svg
                                            className="po-feature-icon-svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke={feature.color}
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden
                                        >
                                            {feature.svg}
                                        </svg>
                                    </div>
                                    <span className="po-feature-icon-label">{feature.label}</span>
                                </div>
                            </div>
                            {index < FINANCIAL_OS_FEATURES.length - 1 ? (
                                <div className="po-feature-sep po-feature-sep-revealed" aria-hidden />
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>

            <div className="po-stat-row">
                <div className="po-stat-cell">
                    <div className="po-stat-value">8</div>
                    <div className="po-stat-label">Tax years in memory</div>
                </div>
                <div className="po-stat-cell">
                    <div className="po-stat-value">$0</div>
                    <div className="po-stat-label">Cloud storage required</div>
                </div>
                <div className="po-stat-cell po-stat-cell-last">
                    <div className="po-stat-value">100%</div>
                    <div className="po-stat-label">Local and encrypted</div>
                </div>
            </div>
        </section>
    )
}

function WatcherSection() {
    return (
        <section className="po-mid-section border-b border-[var(--po-border)] px-6 py-24 sm:px-10">
            <div className="mx-auto grid max-w-6xl items-center gap-14 xl:grid-cols-[1.1fr_0.9fr] xl:gap-20">
                <Reveal className="po-watcher-visual-wrap order-2 xl:order-1">
                    <div className="po-watcher-visual">
                        <div className="po-ring-container" aria-hidden>
                            {[100, 148, 196, 244, 292].map((radius, index) => (
                                <div key={`ring-${radius}`} className="po-ring-shell" style={{ width: radius * 2, height: radius * 2 }}>
                                    <div className="po-ring" />
                                    {index % 2 === 0 ? (
                                        <div className="po-ring-sweep" style={{ animationDuration: `${6 + index * 2}s` }} />
                                    ) : null}
                                </div>
                            ))}
                        </div>

                        <div className="po-vault-center">
                            <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden>
                                <g stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10 30L10 16L16 10L24 10L30 16L30 26Q30 31 25 31L13 31Q10 31 10 30" />
                                    <path d="M15 28L15 15Q15 13 17 13L23 13Q27 13 27 18Q27 23 23 23L17 23Q15 23 15 21" />
                                </g>
                            </svg>
                        </div>

                        <div className="po-doc-fly po-doc-fly-a">
                            <MiniDocIcon stroke="rgba(186,207,247,0.5)" />
                            K-1 · ABC Holdings
                        </div>
                        <div className="po-doc-fly po-doc-fly-b">
                            <MiniDocIcon stroke="rgba(220,180,60,0.5)" />
                            Bank · Chase Apr 2025
                        </div>
                        <div className="po-doc-fly po-doc-fly-c">
                            <MiniDocIcon stroke="rgba(140,210,130,0.5)" />
                            BOIR · 2024
                        </div>
                        <div className="po-doc-fly po-doc-fly-d">
                            <MiniDocIcon stroke="rgba(186,207,247,0.5)" />
                            Invoice · Consulting
                        </div>

                        <div className="po-event-log">
                            <div className="po-event-head">
                                <span className="po-event-head-dot" aria-hidden />
                                vault watcher · active
                            </div>
                            {WATCHER_EVENTS.map((event, index) => (
                                <div key={`${event.title}-${index}`} className="po-event-row" style={{ animationDelay: `${0.8 + index * 0.9}s` }}>
                                    <div className="po-event-dot" style={{ background: event.dot }} />
                                    <div className="po-event-body">
                                        <div className="po-event-title">{event.title}</div>
                                        <div className="po-event-meta">{event.meta}</div>
                                    </div>
                                    <div className="po-event-time">{event.time}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <Reveal className="order-1 xl:order-2" delay={0.08}>
                    <div className="po-section-badge po-section-badge-left"><span className="po-section-badge-text">Proactive intelligence</span></div>
                    <h2 className="po-mid-heading po-mid-heading-left">
                        It already
                        <br />
                        knows.
                    </h2>
                    <p className="po-mid-copy po-mid-copy-left po-mid-copy-spaced">
                        You do not have to tell Prompt.tax when a new document arrives. It watches your folders continuously, reading, classifying, and updating your financial memory the moment anything changes.
                    </p>
                    <p className="po-mid-copy po-mid-copy-left">
                       PromptTax quietly watches your financial world, remembers what matters, explains every recommendation with evidence, and prepares your taxes when needed.
                    </p>

                    <div className="po-benefit-list">
                        <BenefitItem
                            icon={<Eye className="h-3.5 w-3.5 text-[var(--po-accent-2)]" strokeWidth={1.6} />}
                            title="Always watching"
                            body="Monitors your vault folder in real time and detects additions, changes, and deletions automatically."
                        />
                        <BenefitItem
                            icon={<Activity className="h-3.5 w-3.5 text-[var(--po-accent-2)]" strokeWidth={1.6} />}
                            title="Instant classification"
                            body="Every new document is read, typed, and linked to its entities before you open the app."
                        />
                        <BenefitItem
                            icon={<FolderOpen className="h-3.5 w-3.5 text-[var(--po-accent-2)]" strokeWidth={1.6} />}
                            title="Zero manual work"
                            body="Drop a file in a folder. Prompt.tax does the rest, without import flows or cloud upload rituals."
                        />
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

function ActionsSection() {
    const [activeTab, setActiveTab] = useState<keyof typeof ACTION_TABS>('k1')
    const activeEntry = ACTION_TABS[activeTab]

    return (
        <section className="po-mid-section border-b border-[var(--po-border)] px-6 py-24 sm:px-10">
            <div className="mx-auto max-w-6xl">
                <Reveal className="max-w-3xl">
                    <div className="po-section-badge po-section-badge-left"><span className="po-section-badge-text">From answers to actions</span></div>
                    <h2 className="po-mid-heading po-mid-heading-left">
                        Not just answers.
                        <br />
                        <span className="po-mid-heading-soft">It acts.</span>
                    </h2>
                    <p className="po-mid-copy po-mid-copy-left">
                        Prompt.tax does not stop at insights. Ask it to generate every partner&apos;s Schedule K-1, produce a CPA-ready package, or draft your BOIR filing, then watch it execute line by line.
                    </p>
                </Reveal>

                <div className="mt-14 grid gap-12 xl:grid-cols-[0.9fr_1.1fr] xl:items-start xl:gap-20">
                    <Reveal>
                        <div className="po-action-tabs" role="tablist" aria-label="Action demos">
                            {(Object.keys(ACTION_TABS) as Array<keyof typeof ACTION_TABS>).map((key) => (
                                <button
                                    key={key}
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === key}
                                    className={`po-action-tab ${activeTab === key ? 'po-action-tab-on' : ''}`}
                                    onClick={() => setActiveTab(key)}
                                >
                                    {ACTION_TABS[key].label}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.26, ease: 'easeOut' }}
                            >
                                <p className="po-mid-copy po-mid-copy-left mt-8">{activeEntry.description}</p>
                            </motion.div>
                        </AnimatePresence>

                        <div className="po-action-benefits">
                            {[
                                'Respects partnership agreement allocations',
                                'Applies §199A QBI treatment per partner',
                                'Links each output to source documents',
                                'CPA-reviewable with full audit trail',
                                'Export as PDF, XML, or structured JSON',
                            ].map((item) => (
                                <div key={item} className="po-action-benefit-row">
                                    <div className="po-action-benefit-dot" aria-hidden />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <ActionPanel activeTab={activeTab} command={activeEntry.command} />
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

function ActionPanel({ activeTab, command }: { activeTab: keyof typeof ACTION_TABS; command: string }) {
    const [completedCount, setCompletedCount] = useState(0)

    useEffect(() => {
        setCompletedCount(0)
        const steps = ACTION_PARTNERS.map((_, index) =>
            window.setTimeout(() => {
                setCompletedCount((current) => Math.min(ACTION_PARTNERS.length, Math.max(current, index + 1)))
            }, 500 + index * 1600 + 1400),
        )

        return () => {
            steps.forEach((timer) => window.clearTimeout(timer))
        }
    }, [activeTab])

    const progress = (completedCount / ACTION_PARTNERS.length) * 100
    const isComplete = completedCount >= ACTION_PARTNERS.length

    return (
        <>
            <div className="po-action-panel">
                <div className="po-action-panel-head">
                    <span className="po-action-panel-title">action / generate-k1s · ABC Holdings LLC</span>
                    <span className={`po-action-status ${isComplete ? 'po-action-status-done' : ''}`}>
                        <span className="po-action-status-dot" aria-hidden />
                        {isComplete ? 'done' : 'running'}
                    </span>
                </div>

                <div className="po-partner-list">
                    {ACTION_PARTNERS.map((partner, index) => {
                        const isGenerating = completedCount === index
                        const isDone = completedCount > index

                        return (
                            <div
                                key={partner.name}
                                className={`po-partner-row ${completedCount >= index ? 'po-partner-row-filling' : ''}`}
                                style={{ ['--fill-delay' as string]: `${index * 1.6 + 0.5}s` }}
                            >
                                <div className="po-partner-avatar">{partner.init}</div>
                                <span className="po-partner-name">{partner.name}</span>
                                <span className="po-partner-pct po-mono">{partner.pct}</span>
                                <span
                                    className={`po-partner-badge ${
                                        isDone ? 'po-partner-badge-done' : isGenerating ? 'po-partner-badge-gen' : 'po-partner-badge-pending'
                                    }`}
                                >
                                    {isDone ? 'done ✓' : isGenerating ? 'generating' : 'pending'}
                                </span>
                            </div>
                        )
                    })}
                </div>

                <div className="po-gen-progress" aria-hidden>
                    <div className="po-gen-progress-fill" style={{ width: `${progress}%` }} />
                </div>

                <div className="po-output-preview">
                    <div className="po-output-preview-head">// Schedule K-1 (Form 1065) · Partner: James R.</div>
                    <div><span>ordinary_income</span>  $47,250.00</div>
                    <div><span>cap_gains_long</span>    $12,400.00</div>
                    <div><span>qbi_deduction</span>     $9,450.00</div>
                    <div><span>self_emp_tax</span>      $3,218.50</div>
                    <div>
                        <span>status</span>            <span className="po-output-preview-ok">{isComplete ? 'generated ✓' : 'running…'}</span>
                    </div>
                </div>

                <div className="po-action-cmd">
                    <span className="po-cmd-prompt po-mono">›</span>
                    <span className="po-cmd-text po-mono">{command}</span>
                    <button type="button" className={`po-cmd-run ${isComplete ? 'po-cmd-run-done' : 'po-cmd-run-running'}`}>
                        {isComplete ? 'completed' : 'running…'}
                    </button>
                </div>
            </div>

            <div className="po-secondary-actions">
                <SecondaryActionRow icon={<Download className="h-3.5 w-3.5" strokeWidth={1.6} />} text="export k1s --format pdf --all-partners" />
                <SecondaryActionRow icon={<Users className="h-3.5 w-3.5" strokeWidth={1.6} />} text="prepare cpa-package --include evidence" />
                <SecondaryActionRow icon={<Grid2X2 className="h-3.5 w-3.5" strokeWidth={1.6} />} text={'file boir --entity "XYZ Ventures LP"'} />
            </div>
        </>
    )
}

function BenefitItem({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
    return (
        <div className="po-benefit-item">
            <div className="po-benefit-icon">{icon}</div>
            <div>
                <div className="po-benefit-title">{title}</div>
                <div className="po-benefit-body">{body}</div>
            </div>
        </div>
    )
}

function SecondaryActionRow({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="po-secondary-action-row">
            <span className="po-secondary-action-icon">{icon}</span>
            <span className="po-secondary-action-text">{text}</span>
            <span className="po-secondary-action-enter">↵</span>
        </div>
    )
}

function MiniDocIcon({ stroke }: { stroke: string }) {
    return (
        <svg width="12" height="12" fill="none" stroke={stroke} strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    )
}
