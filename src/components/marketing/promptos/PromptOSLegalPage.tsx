'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'

import { Reveal } from './Reveal'
import { PromptOSFooter } from './PromptOSFooter'

interface LegalNavItem {
    id: string
    label: string
}

interface PromptOSLegalPageProps {
    title: string
    eyebrow: string
    description: string
    lastUpdated: string
    navItems: LegalNavItem[]
    children: React.ReactNode
}

function DesktopBrandMark({ size = 22 }: { size?: number }) {
    return (
        <span className="po-brand-mark" style={{ width: size, height: size }}>
            <Image src="/prompttax-desktop-logo.png" alt="Prompt.tax" width={size} height={size} priority />
        </span>
    )
}

export function PromptOSLegalPage({
    title,
    eyebrow,
    description,
    lastUpdated,
    navItems,
    children,
}: PromptOSLegalPageProps) {
    return (
        <div className="promptos po-legal-page">
            <div className="po-legal-backdrop" aria-hidden />

            <nav className="po-legal-nav sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--po-border)] bg-black/80 px-5 backdrop-blur-xl sm:px-8">
                <div className="flex items-center gap-3 text-sm font-medium text-white">
                    <Link href="/" className="flex items-center gap-3 text-sm font-medium text-white">
                        <DesktopBrandMark />
                        <span className="po-brand-wordmark">Prompt.tax</span>
                    </Link>
                </div>
                <div className="flex items-center gap-2.5">
                    <Link href="/" className="po-legal-nav-link">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                    <Link href="/#download" className="po-legal-download-link">
                        <Download className="h-4 w-4" />
                        Download desktop
                    </Link>
                </div>
            </nav>

            <header className="relative overflow-hidden border-b border-[var(--po-border)] px-6 pb-16 pt-24 sm:px-10">
                <div className="po-spotlight" aria-hidden />
                <div className="po-grid h-[520px]" aria-hidden />
                <div className="relative mx-auto grid max-w-6xl gap-10 xl:grid-cols-[1fr_0.8fr] xl:items-start">
                    <Reveal>
                        <div className="po-section-badge po-section-badge-left"><span className="po-section-badge-text">{eyebrow}</span></div>
                        <h1 className="po-legal-title">{title}</h1>
                        <p className="po-legal-description">{description}</p>
                        <div className="po-legal-meta">Last updated: {lastUpdated}</div>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <div className="po-legal-aside po-glow-border po-hairline">
                            <div className="po-legal-aside-label">On this page</div>
                            <div className="po-legal-toc">
                                {navItems.map((item, index) => (
                                    <a key={item.id} href={`#${item.id}`} className="po-legal-toc-link">
                                        <span className="po-legal-toc-index">{String(index + 1).padStart(2, '0')}</span>
                                        <span>{item.label}</span>
                                    </a>
                                ))}
                            </div>

                            <div className="po-legal-company-card">
                                <div className="po-legal-company-label">Company</div>
                                <div className="po-legal-company-name">RED PILL SOFTWARE, LLC</div>
                                <div className="po-legal-company-address">
                                    7901 4TH ST N, STE 300
                                    <br />
                                    ST. PETERSBURG, FL 33702 - USA
                                </div>
                                <Link href="mailto:hi@prompt.tax" className="po-footer-link mt-4 inline-flex text-sm">
                                    hi@prompt.tax
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </header>

            <main className="px-6 py-16 sm:px-10">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-6">{children}</div>
                </div>
            </main>

            <PromptOSFooter downloadHref="/#download" />
        </div>
    )
}