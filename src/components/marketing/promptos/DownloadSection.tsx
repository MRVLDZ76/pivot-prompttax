'use client'

import { useEffect, useState } from 'react'
import { Apple, Monitor, Terminal, Download as DownloadIcon, ArrowUpRight, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
    DOWNLOADS,
    LATEST_RELEASE_API,
    RELEASES_URL,
    RELEASE_CHANNEL_LIVE,
    NOTIFY_MAILTO,
    type DownloadTarget,
} from './data'
import { useI18n } from '@/i18n/I18nProvider'

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
    const { t } = useI18n()
    const [detected, setDetected] = useState<OS | null>(null)
    const [assets, setAssets] = useState<ReleaseAsset[]>([])
    const [version, setVersion] = useState<string | null>(null)
    const [releaseState, setReleaseState] = useState<ReleaseState>('loading')
    const [pressedCard, setPressedCard] = useState<OS | null>(null)

    useEffect(() => {
        setDetected(detectOS())
        // While the public channel isn't live, skip the network call entirely and
        // present a calm "coming soon" state instead of probing an empty repo.
        if (!RELEASE_CHANNEL_LIVE) {
            setReleaseState('fallback')
            return
        }
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

    // Downloads are only "live" once the channel is enabled AND assets resolved.
    const isLive = RELEASE_CHANNEL_LIVE && releaseState === 'ready'

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
            ? t('download.statusLoading')
            : isLive
              ? t('download.statusLive')
              : t('download.statusPilot')

    return (
        <section id="download" className="relative border-t border-[var(--po-border)] px-6 py-28">
            <div className="po-glow left-1/2 top-0 h-[260px] w-[680px] -translate-x-1/2" aria-hidden />
            <div className="relative mx-auto max-w-5xl text-center">
                <div className="po-mono mb-4 text-xs uppercase tracking-[0.16em] text-[var(--po-muted)]">
                    {t('download.eyebrow')}
                </div>
                <h2 className="mx-auto max-w-2xl text-balance text-4xl font-bold tracking-[-0.035em] sm:text-5xl">
                    {t('download.heading')}
                </h2>
                <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-[var(--po-muted)]">
                    {t('download.copy')}
                    {version ? (
                        <span className="po-mono ml-1 text-[var(--po-faint)]">{version}</span>
                    ) : null}
                </p>

                <p className="po-hero-disclaimer po-hero-disclaimer-tight">
                    {t('download.disclaimer')}
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
                        const statusLabel = isLive
                            ? target.artifactName
                            : releaseState === 'loading'
                              ? t('download.resolving')
                              : t('download.comingSoon')

                        const cardClassName = `po-release-card po-glow-border ${isDetected ? 'po-release-card-detected' : ''} ${
                            isPressed ? 'po-release-card-pressed' : ''
                        } ${isLive ? '' : 'po-release-card-soon'}`

                        const cardInner = (
                            <>
                                <div className="po-release-card-badge-row">
                                    <span className="po-release-card-badge">{isDetected ? t('download.badgeDetected') : t('download.badgeDesktop')}</span>
                                    <span className={`po-release-card-badge po-release-card-badge-${isLive ? 'ready' : releaseState}`}>
                                        {statusLabel}
                                    </span>
                                </div>
                                <div className="po-release-card-icon">
                                    <Icon className="h-7 w-7 text-[var(--po-fg)]" strokeWidth={1.5} />
                                </div>
                                <div className="po-release-card-body">
                                    <div className="po-release-card-title-row">
                                        <span className="po-release-card-title">{target.label}</span>
                                        {isLive ? (
                                            <DownloadIcon className="h-3.5 w-3.5 text-[var(--po-muted)] transition-transform duration-300 group-hover:translate-y-0.5" />
                                        ) : null}
                                    </div>
                                    <div className="po-mono po-release-card-copy">{target.sublabel}</div>
                                    <div className="po-mono po-release-card-artifact">
                                        {isLive ? target.artifactName : t('download.notifyArtifact')}
                                    </div>
                                </div>
                            </>
                        )

                        return isLive ? (
                            <a
                                key={target.os}
                                href={hrefFor(target)}
                                className={cardClassName}
                                onPointerDown={() => setPressedCard(target.os)}
                                onPointerUp={() => setPressedCard((current) => (current === target.os ? null : current))}
                                onPointerLeave={() => setPressedCard((current) => (current === target.os ? null : current))}
                            >
                                {cardInner}
                            </a>
                        ) : (
                            <a
                                key={target.os}
                                href={NOTIFY_MAILTO}
                                className={cardClassName}
                                onPointerDown={() => setPressedCard(target.os)}
                                onPointerUp={() => setPressedCard((current) => (current === target.os ? null : current))}
                                onPointerLeave={() => setPressedCard((current) => (current === target.os ? null : current))}
                            >
                                {cardInner}
                            </a>
                        )
                    })}
                </div>

                {isLive ? (
                    <a
                        href={`${RELEASES_URL}/latest`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="po-mono mt-8 inline-flex items-center gap-1.5 text-xs text-[var(--po-muted)] transition-colors hover:text-[var(--po-fg)]"
                    >
                        {t('download.allReleases')}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                ) : (
                    <a
                        href={NOTIFY_MAILTO}
                        className="po-mono mt-8 inline-flex items-center gap-1.5 text-xs text-[var(--po-muted)] transition-colors hover:text-[var(--po-fg)]"
                    >
                        <Mail className="h-3.5 w-3.5" />
                        {t('download.getNotified')}
                    </a>
                )}
            </div>
        </section>
    )
}
