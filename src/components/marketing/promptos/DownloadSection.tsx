'use client'

import { useEffect, useState } from 'react'
import { Apple, Monitor, Terminal, Download as DownloadIcon, ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { DOWNLOADS, LATEST_RELEASE_API, RELEASES_URL, type DownloadTarget } from './data'

type OS = DownloadTarget['os']

const OS_ICON: Record<OS, LucideIcon> = {
    macos: Apple,
    windows: Monitor,
    linux: Terminal,
}

function detectOS(): OS | null {
    if (typeof navigator === 'undefined') return null
    const p = (
        (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ||
        navigator.platform ||
        navigator.userAgent ||
        ''
    ).toLowerCase()
    if (p.includes('mac')) return 'macos'
    if (p.includes('win')) return 'windows'
    if (p.includes('linux') || p.includes('x11')) return 'linux'
    return null
}

interface ReleaseAsset {
    name: string
    browser_download_url: string
}

type ReleaseState = 'loading' | 'ready' | 'fallback'

export function DownloadSection() {
    const [detected, setDetected] = useState<OS | null>(null)
    const [assets, setAssets] = useState<ReleaseAsset[]>([])
    const [version, setVersion] = useState<string | null>(null)
    const [releaseState, setReleaseState] = useState<ReleaseState>('loading')
    const [pressedCard, setPressedCard] = useState<OS | null>(null)

    useEffect(() => {
        setDetected(detectOS())
        let active = true
        setReleaseState('loading')
        fetch(LATEST_RELEASE_API, { headers: { Accept: 'application/vnd.github+json' } })
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
                if (!active || !data) return
                setAssets(Array.isArray(data.assets) ? data.assets : [])
                setVersion(typeof data.tag_name === 'string' ? data.tag_name : null)
                setReleaseState(Array.isArray(data.assets) && data.assets.length > 0 ? 'ready' : 'fallback')
            })
            .catch(() => {
                /* offline or rate-limited — fall back to the releases page */
                if (active) {
                    setReleaseState('fallback')
                }
            })
        return () => {
            active = false
        }
    }, [])

    const hrefFor = (target: DownloadTarget): string => {
        const asset =
            assets.find((a) => a.name.toLowerCase() === target.artifactName.toLowerCase()) ||
            assets.find((a) => target.matchers.some((matcher) => matcher.test(a.name)))
        return asset ? asset.browser_download_url : `${RELEASES_URL}/latest`
    }

    const ordered = [...DOWNLOADS].sort((a, b) => {
        if (a.os === detected) return -1
        if (b.os === detected) return 1
        return 0
    })

    const helperLabel =
        releaseState === 'loading'
            ? 'Checking the latest production release...'
            : releaseState === 'ready'
              ? 'Latest signed artifacts pulled from the production release channel.'
              : 'Release metadata unavailable. Buttons fall back to the latest release page.'

    return (
        <section id="download" className="relative border-t border-[var(--po-border)] px-6 py-28">
            <div className="po-glow left-1/2 top-0 h-[260px] w-[680px] -translate-x-1/2" aria-hidden />
            <div className="relative mx-auto max-w-5xl text-center">
                <div className="po-mono mb-4 text-xs uppercase tracking-[0.16em] text-[var(--po-muted)]">
                    Desktop pilot
                </div>
                <h2 className="mx-auto max-w-2xl text-balance text-4xl font-bold tracking-[-0.035em] sm:text-5xl">
                    Run PromptTax locally, with controlled intelligence.
                </h2>
                <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-[var(--po-muted)]">
                    The desktop experience is being rolled out carefully. Your vault stays local, agent activity stays bounded, and cloud sync remains optional.
                    {version ? (
                        <span className="po-mono ml-1 text-[var(--po-faint)]">{version}</span>
                    ) : null}
                </p>

                <p className="mx-auto mt-3 max-w-2xl text-[12px] leading-relaxed text-white/42 sm:text-[13px]">
                    No silent document export. No autonomous filing. No hidden background actions outside the product flow. The system can observe, explain, and prepare — but sensitive actions remain visible and controlled.
                </p>

                <div className="po-release-status mx-auto mt-6 max-w-2xl">
                    <span className={`po-release-status-dot po-release-status-dot-${releaseState}`} aria-hidden />
                    <span>{helperLabel}</span>
                </div>

                <div className="po-download-grid mx-auto mt-12 max-w-4xl">
                    {ordered.map((target) => {
                        const Icon = OS_ICON[target.os]
                        const isDetected = target.os === detected
                        const isPressed = target.os === pressedCard
                        const statusLabel =
                            releaseState === 'ready' ? target.artifactName : releaseState === 'loading' ? 'Resolving latest build' : 'Open release channel'

                        return (
                            <a
                                key={target.os}
                                href={hrefFor(target)}
                                className={`po-release-card po-glow-border ${isDetected ? 'po-release-card-detected' : ''} ${
                                    isPressed ? 'po-release-card-pressed' : ''
                                }`}
                                onPointerDown={() => setPressedCard(target.os)}
                                onPointerUp={() => setPressedCard((current) => (current === target.os ? null : current))}
                                onPointerLeave={() => setPressedCard((current) => (current === target.os ? null : current))}
                            >
                                <div className="po-release-card-badge-row">
                                    <span className="po-release-card-badge">{isDetected ? 'Detected' : 'Desktop'}</span>
                                    <span className={`po-release-card-badge po-release-card-badge-${releaseState}`}>{statusLabel}</span>
                                </div>
                                <div className="po-release-card-icon">
                                    <Icon className="h-7 w-7 text-[var(--po-fg)]" strokeWidth={1.5} />
                                </div>
                                <div className="po-release-card-body">
                                    <div className="po-release-card-title-row">
                                        <span className="po-release-card-title">{target.label}</span>
                                        <DownloadIcon className="h-3.5 w-3.5 text-[var(--po-muted)] transition-transform duration-300 group-hover:translate-y-0.5" />
                                    </div>
                                    <div className="po-mono po-release-card-copy">
                                        {target.sublabel}
                                    </div>
                                    <div className="po-mono po-release-card-artifact">{target.artifactName}</div>
                                </div>
                            </a>
                        )
                    })}
                </div>

                {releaseState === 'ready' ? (
                    <a
                        href={`${RELEASES_URL}/latest`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="po-mono mt-8 inline-flex items-center gap-1.5 text-xs text-[var(--po-muted)] transition-colors hover:text-[var(--po-fg)]"
                    >
                        All releases & checksums
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                ) : (
                    <a
                        href={`${RELEASES_URL}/latest`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="po-mono mt-8 inline-flex items-center gap-1.5 text-xs text-[var(--po-muted)] transition-colors hover:text-[var(--po-fg)]"
                    >
                        View desktop release status
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                )}
            </div>
        </section>
    )
}
