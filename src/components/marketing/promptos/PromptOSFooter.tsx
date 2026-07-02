'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useI18n } from '@/i18n/I18nProvider'
import { LanguageSwitcher } from './LanguageSwitcher'

function DesktopBrandMark({ size = 18 }: { size?: number }) {
    return (
        <span className="po-brand-mark po-brand-mark-dim" style={{ width: size, height: size }}>
            <Image src="/prompttax-desktop-logo.png" alt="Prompt.tax" width={size} height={size} priority />
        </span>
    )
}

export function PromptOSFooter({ downloadHref = '/#download' }: { downloadHref?: string }) {
    const { t, tx } = useI18n()
    const values = tx<string[]>('footer.values')
    const nav: { label: string; href: string; external?: boolean }[] = [
        { label: t('footer.nav.download'), href: '/download' },
        { label: t('footer.nav.pricing'), href: '/pricing' },
        { label: t('footer.nav.documentation'), href: '/setup' },
        { label: t('footer.nav.support'), href: 'mailto:hi@prompt.tax', external: true },
        { label: t('footer.nav.privacy'), href: '/privacy' },
        { label: t('footer.nav.terms'), href: '/terms' },
    ]

    return (
        <footer className="po-footer-shell border-t border-[var(--po-border)] px-7 py-20 text-[var(--po-muted)]">
            <div className="po-footer-depth" aria-hidden>
                <div className="po-footer-radial" />
                <div className="po-footer-grid" />
                <div className="po-footer-light" />
                <div className="po-footer-particles">
                    <span className="po-footer-particle po-footer-particle-a" />
                    <span className="po-footer-particle po-footer-particle-b" />
                    <span className="po-footer-particle po-footer-particle-c" />
                </div>
            </div>

            <div className="po-footer-signature mx-auto max-w-4xl">
                <Link href={downloadHref} className="po-footer-brand" aria-label="Go to download section">
                    <DesktopBrandMark size={34} />
                    <span className="po-brand-wordmark text-[18px]">PromptTax</span>
                </Link>

                <div className="po-footer-kicker">{t('footer.kicker')}</div>
                <div className="po-footer-manifesto">{t('footer.manifestoTop')}<br />{t('footer.manifestoAccent')}</div>

                <div className="po-footer-values">
                    {values.map((value) => (
                        <div key={value} className="po-footer-value">
                            {value}
                        </div>
                    ))}
                </div>

                <nav className="po-footer-nav" aria-label="Footer">
                    {nav.map((item) => {
                        if (item.external) {
                            return (
                                <a key={item.label} href={item.href} className="po-footer-link" target="_blank" rel="noreferrer">
                                    {item.label}
                                </a>
                            )
                        }

                        return (
                            <Link key={item.label} href={item.href} className="po-footer-link">
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="po-footer-lang">
                    <LanguageSwitcher variant="compact" />
                </div>

                <div className="po-footer-closing">{t('footer.closing')}</div>
                <div className="po-footer-note">{t('footer.note1')}</div>
                <div className="po-footer-note">{t('footer.note2')}</div>
                <div className="po-footer-note">Contact: hi@prompt.tax<br />RED PILL SOFTWARE, LLC<br />Address: 7901 4TH ST N, STE 300, ST. PETERSBURG, FL 33702 - USA.</div>
            </div>
        </footer>
    )
}