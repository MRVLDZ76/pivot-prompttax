import Image from 'next/image'
import Link from 'next/link'
import { FOOTER_NAV, FOOTER_VALUES } from './data'

function DesktopBrandMark({ size = 18 }: { size?: number }) {
    return (
        <span className="po-brand-mark po-brand-mark-dim" style={{ width: size, height: size }}>
            <Image src="/prompttax-desktop-logo.png" alt="Prompt.tax" width={size} height={size} priority />
        </span>
    )
}

export function PromptOSFooter({ downloadHref = '/#download' }: { downloadHref?: string }) {
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

                <div className="po-footer-kicker">Personal Financial Intelligence</div>
                <div className="po-footer-manifesto">Your financial world.<br />Understood.</div>

                <div className="po-footer-values">
                    {FOOTER_VALUES.map((value) => (
                        <div key={value} className="po-footer-value">
                            {value}
                        </div>
                    ))}
                </div>

                <nav className="po-footer-nav" aria-label="Footer">
                    {FOOTER_NAV.map((item) => {
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

                <div className="po-footer-closing">© 2026 PromptTax</div>
                <div className="po-footer-note">Built for people who run complex financial lives.</div>
                <div className="po-footer-note">PromptTax is not a CPA or law firm. It does not provide legal, tax, or accounting advice.</div>
                <div className="po-footer-note">Contact: hi@prompt.tax<br />RED PILL SOFTWARE, LLC<br />Address: 7901 4TH ST N, STE 300, ST. PETERSBURG, FL 33702 - USA.</div>
            </div>
        </footer>
    )
}