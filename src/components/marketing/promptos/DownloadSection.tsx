'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Apple, Monitor, Terminal, Download as DownloadIcon, ArrowUpRight, Mail, ShieldCheck, X, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
    DOWNLOADS,
    LATEST_RELEASE_API,
    RELEASES_URL,
    RELEASE_CHANNEL_LIVE,
    NOTIFY_MAILTO,
    DOWNLOAD_TELEMETRY_URL,
    DOWNLOAD_COUNT_KEY,
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

// Best-effort mobile / tablet detection. The desktop installer cannot run on a
// phone or tablet, so we block the download attempt and explain why instead of
// handing the user an executable their device can't use.
function isMobileDevice(): boolean {
    if (typeof navigator === 'undefined' || typeof window === 'undefined') return false
    const uaData = (navigator as Navigator & { userAgentData?: { mobile?: boolean } }).userAgentData
    if (uaData && uaData.mobile === true) return true
    const ua = navigator.userAgent || ''
    const mobileUA = /android|iphone|ipod|ipad|iemobile|blackberry|opera mini|mobile|tablet|silk|kindle|playbook/i.test(ua)
    // iPadOS 13+ reports as desktop Safari; catch it via touch + platform.
    const iPadOS = navigator.platform === 'MacIntel' && (navigator.maxTouchPoints || 0) > 1
    const coarseAndSmall =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(pointer: coarse)').matches &&
        window.matchMedia('(max-width: 820px)').matches
    return mobileUA || iPadOS || coarseAndSmall
}

// Decode a base64-encoded installer URL only at click time so the raw path is
// never rendered into the DOM or shown in an anchor hover tooltip.
function decodeUrl(enc: string | undefined): string | null {
    if (!enc) return null
    try {
        if (typeof atob === 'function') return atob(enc)
    } catch {
        /* malformed encoding */
    }
    return null
}

interface ReleaseAsset {
    name: string
    browser_download_url: string
}

type ReleaseState = 'loading' | 'ready' | 'fallback'

interface DownloadEvent {
    event: 'desktop_download'
    ts: string
    os: OS
    artifact: string
    version: string
    confirmedAtMs: number
    ua: string
    platform: string
    language: string
    languages: string[]
    timezone: string
    screen: string
    viewport: string
    devicePixelRatio: number
    referrer: string | null
    path: string
    downloadOrdinal: number
}

// Capture confirmation + system context, persist a local counter for simple
// confidence metrics, and forward the event to GTM / an optional collector.
function recordDownload(target: DownloadTarget, version: string | null, confirmedAtMs: number): void {
    if (typeof window === 'undefined') return

    let ordinal = 1
    try {
        const raw = window.localStorage.getItem(DOWNLOAD_COUNT_KEY)
        ordinal = (raw ? parseInt(raw, 10) || 0 : 0) + 1
        window.localStorage.setItem(DOWNLOAD_COUNT_KEY, String(ordinal))
    } catch {
        /* storage unavailable (private mode) */
    }

    const nav = navigator as Navigator & { languages?: readonly string[] }
    const payload: DownloadEvent = {
        event: 'desktop_download',
        ts: new Date().toISOString(),
        os: target.os,
        artifact: target.artifactName,
        version: version ?? 'cdn-stable',
        confirmedAtMs: Math.round(confirmedAtMs),
        ua: nav.userAgent || '',
        platform: nav.platform || '',
        language: nav.language || '',
        languages: nav.languages ? Array.from(nav.languages).slice(0, 3) : [],
        timezone: (() => {
            try {
                return Intl.DateTimeFormat().resolvedOptions().timeZone || ''
            } catch {
                return ''
            }
        })(),
        screen: typeof screen !== 'undefined' ? `${screen.width}x${screen.height}` : '',
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        devicePixelRatio: window.devicePixelRatio || 1,
        referrer: document.referrer || null,
        path: window.location.pathname,
        downloadOrdinal: ordinal,
    }

    // GTM / analytics layer (already integrated site-wide).
    try {
        const w = window as typeof window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
        if (Array.isArray(w.dataLayer)) w.dataLayer.push({ ...payload })
        if (typeof w.gtag === 'function') w.gtag('event', 'desktop_download', { ...payload })
    } catch {
        /* analytics not present */
    }

    // Optional server collector — non-blocking, fire-and-forget.
    if (DOWNLOAD_TELEMETRY_URL) {
        try {
            const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
            if (navigator.sendBeacon) {
                navigator.sendBeacon(DOWNLOAD_TELEMETRY_URL, blob)
            } else {
                fetch(DOWNLOAD_TELEMETRY_URL, { method: 'POST', body: blob, keepalive: true }).catch(() => {})
            }
        } catch {
            /* ignore telemetry failures */
        }
    }
}

function triggerDownload(url: string): void {
    if (typeof document === 'undefined') return
    const a = document.createElement('a')
    a.href = url
    a.rel = 'noopener'
    a.setAttribute('download', '')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

export function DownloadSection() {
    const { t } = useI18n()
    const [detected, setDetected] = useState<OS | null>(null)
    const [assets, setAssets] = useState<ReleaseAsset[]>([])
    const [version, setVersion] = useState<string | null>(null)
    const [releaseState, setReleaseState] = useState<ReleaseState>('loading')
    const [pressedCard, setPressedCard] = useState<OS | null>(null)
    const [confirmTarget, setConfirmTarget] = useState<DownloadTarget | null>(null)
    const [mobileNotice, setMobileNotice] = useState(false)
    const [started, setStarted] = useState(false)
    const [mounted, setMounted] = useState(false)
    const confirmedAtRef = useRef(0)

    useEffect(() => {
        setMounted(true)
    }, [])

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
    // A hosted installer (directUrlEnc) makes its card live regardless of the
    // GitHub release channel.
    const anyLive = isLive || DOWNLOADS.some((d) => Boolean(d.directUrlEnc))

    // Only used for GitHub-resolved cards (public release URLs, safe to expose).
    const githubHrefFor = (target: DownloadTarget): string => {
        const asset =
            assets.find((a) => a.name.toLowerCase() === target.artifactName.toLowerCase()) ||
            assets.find((a) => target.matchers.some((matcher) => matcher.test(a.name)))
        return asset ? asset.browser_download_url : `${RELEASES_URL}/latest`
    }

    const closeAll = useCallback(() => {
        setConfirmTarget(null)
        setMobileNotice(false)
        setStarted(false)
    }, [])

    // A hosted-installer card was clicked: gate mobile devices, otherwise open
    // the confirmation dialog before any download happens.
    const requestDownload = useCallback((target: DownloadTarget) => {
        if (isMobileDevice()) {
            setMobileNotice(true)
            return
        }
        setStarted(false)
        setConfirmTarget(target)
    }, [])

    const confirmDownload = useCallback(() => {
        if (!confirmTarget) return
        const url = decodeUrl(confirmTarget.directUrlEnc)
        if (!url) return
        const confirmedAtMs = typeof performance !== 'undefined' ? performance.now() - confirmedAtRef.current : 0
        recordDownload(confirmTarget, version, confirmedAtMs)
        triggerDownload(url)
        setStarted(true)
    }, [confirmTarget, version])

    const retryDownload = useCallback(() => {
        if (!confirmTarget) return
        const url = decodeUrl(confirmTarget.directUrlEnc)
        if (url) triggerDownload(url)
    }, [confirmTarget])

    // Escape closes any open dialog; lock body scroll while a dialog is open.
    useEffect(() => {
        const open = Boolean(confirmTarget) || mobileNotice
        if (!open) return
        confirmedAtRef.current = typeof performance !== 'undefined' ? performance.now() : 0
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeAll()
        }
        document.addEventListener('keydown', onKey)
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = prevOverflow
        }
    }, [confirmTarget, mobileNotice, closeAll])

    const ordered = [...DOWNLOADS].sort((a, b) => {
        if (a.os === detected) return -1
        if (b.os === detected) return 1
        return 0
    })

    const helperLabel =
        releaseState === 'loading'
            ? t('download.statusLoading')
            : anyLive
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
                        const hosted = Boolean(target.directUrlEnc)
                        // This specific card is live if it has a hosted installer
                        // or the GitHub channel resolved assets.
                        const targetLive = isLive || hosted
                        const statusLabel = targetLive
                            ? target.artifactName
                            : releaseState === 'loading'
                              ? t('download.resolving')
                              : t('download.comingSoon')

                        const cardClassName = `po-release-card po-glow-border ${isDetected ? 'po-release-card-detected' : ''} ${
                            isPressed ? 'po-release-card-pressed' : ''
                        } ${targetLive ? '' : 'po-release-card-soon'}`

                        const cardInner = (
                            <>
                                <div className="po-release-card-badge-row">
                                    <span className="po-release-card-badge">{isDetected ? t('download.badgeDetected') : t('download.badgeDesktop')}</span>
                                    <span className={`po-release-card-badge po-release-card-badge-${targetLive ? 'ready' : releaseState}`}>
                                        {statusLabel}
                                    </span>
                                </div>
                                <div className="po-release-card-icon">
                                    <Icon className="h-7 w-7 text-[var(--po-fg)]" strokeWidth={1.5} />
                                </div>
                                <div className="po-release-card-body">
                                    <div className="po-release-card-title-row">
                                        <span className="po-release-card-title">{target.label}</span>
                                        {targetLive ? (
                                            <DownloadIcon className="h-3.5 w-3.5 text-[var(--po-muted)] transition-transform duration-300 group-hover:translate-y-0.5" />
                                        ) : null}
                                    </div>
                                    <div className="po-mono po-release-card-copy">{target.sublabel}</div>
                                    <div className="po-mono po-release-card-artifact">
                                        {targetLive ? target.artifactName : t('download.notifyArtifact')}
                                    </div>
                                </div>
                            </>
                        )

                        const pressHandlers = {
                            onPointerDown: () => setPressedCard(target.os),
                            onPointerUp: () => setPressedCard((current) => (current === target.os ? null : current)),
                            onPointerLeave: () => setPressedCard((current) => (current === target.os ? null : current)),
                        }

                        // Hosted installer → button (no href, URL stays obfuscated,
                        // confirmation + mobile gate before any download).
                        if (hosted) {
                            return (
                                <button
                                    key={target.os}
                                    type="button"
                                    className={`${cardClassName} po-release-card-button`}
                                    onClick={() => requestDownload(target)}
                                    {...pressHandlers}
                                >
                                    {cardInner}
                                </button>
                            )
                        }

                        // GitHub-resolved live card → public release URL is safe to expose.
                        if (targetLive) {
                            return (
                                <a key={target.os} href={githubHrefFor(target)} className={cardClassName} {...pressHandlers}>
                                    {cardInner}
                                </a>
                            )
                        }

                        // Not yet live → notify link.
                        return (
                            <a key={target.os} href={NOTIFY_MAILTO} className={cardClassName} {...pressHandlers}>
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

            {confirmTarget && mounted
                ? createPortal(
                      <div
                          className="po-dl-overlay"
                          role="presentation"
                          onClick={(e) => {
                              if (e.target === e.currentTarget) closeAll()
                          }}
                      >
                          <div className="po-dl-modal" role="dialog" aria-modal="true" aria-labelledby="po-dl-title">
                              <button type="button" className="po-dl-close" aria-label={t('download.close')} onClick={closeAll}>
                                  <X className="h-4 w-4" strokeWidth={1.75} />
                              </button>

                              {started ? (
                                  <div className="po-dl-body">
                                      <div className="po-dl-check">
                                          <Check className="h-6 w-6" strokeWidth={2} />
                                      </div>
                                      <h3 id="po-dl-title" className="po-dl-title">{t('download.confirmStarted')}</h3>
                                      <p className="po-dl-subtitle">{t('download.confirmStartedNote')}</p>
                                      <div className="po-dl-actions">
                                          <button type="button" className="po-dl-btn po-dl-btn-ghost" onClick={retryDownload}>
                                              {t('download.confirmRetry')}
                                          </button>
                                          <button type="button" className="po-dl-btn po-dl-btn-primary" onClick={closeAll}>
                                              {t('download.confirmDone')}
                                          </button>
                                      </div>
                                  </div>
                              ) : (
                                  <div className="po-dl-body">
                                      <div className="po-dl-shield">
                                          <ShieldCheck className="h-6 w-6" strokeWidth={1.6} />
                                      </div>
                                      <h3 id="po-dl-title" className="po-dl-title">{t('download.confirmTitle')}</h3>
                                      <p className="po-dl-subtitle">{t('download.confirmSubtitle')}</p>

                                      <dl className="po-dl-meta">
                                          <div className="po-dl-meta-row">
                                              <dt>{t('download.confirmPlatformLabel')}</dt>
                                              <dd>{confirmTarget.label} · {confirmTarget.sublabel}</dd>
                                          </div>
                                          <div className="po-dl-meta-row">
                                              <dt>{t('download.confirmFileLabel')}</dt>
                                              <dd className="po-dl-mono">{confirmTarget.artifactName}</dd>
                                          </div>
                                          <div className="po-dl-meta-row">
                                              <dt>{t('download.confirmSourceLabel')}</dt>
                                              <dd>{t('download.confirmSourceValue')}</dd>
                                          </div>
                                      </dl>

                                      <ul className="po-dl-assure">
                                          <li><Check className="h-3.5 w-3.5" strokeWidth={2} /> {t('download.confirmAssure1')}</li>
                                          <li><Check className="h-3.5 w-3.5" strokeWidth={2} /> {t('download.confirmAssure2')}</li>
                                          <li><Check className="h-3.5 w-3.5" strokeWidth={2} /> {t('download.confirmAssure3')}</li>
                                      </ul>

                                      <div className="po-dl-actions">
                                          <button type="button" className="po-dl-btn po-dl-btn-ghost" onClick={closeAll}>
                                              {t('download.confirmCancel')}
                                          </button>
                                          <button type="button" className="po-dl-btn po-dl-btn-primary" onClick={confirmDownload}>
                                              <DownloadIcon className="h-4 w-4" strokeWidth={1.75} />
                                              {t('download.confirmProceed')}
                                          </button>
                                      </div>
                                  </div>
                              )}
                          </div>
                      </div>,
                      document.body,
                  )
                : null}

            {mobileNotice && mounted
                ? createPortal(
                      <div
                          className="po-dl-overlay"
                          role="presentation"
                          onClick={(e) => {
                              if (e.target === e.currentTarget) closeAll()
                          }}
                      >
                          <div className="po-dl-modal" role="dialog" aria-modal="true" aria-labelledby="po-dl-mobile-title">
                              <button type="button" className="po-dl-close" aria-label={t('download.close')} onClick={closeAll}>
                                  <X className="h-4 w-4" strokeWidth={1.75} />
                              </button>
                              <div className="po-dl-body">
                                  <div className="po-dl-shield">
                                      <Monitor className="h-6 w-6" strokeWidth={1.6} />
                                  </div>
                                  <h3 id="po-dl-mobile-title" className="po-dl-title">{t('download.mobileTitle')}</h3>
                                  <p className="po-dl-subtitle">{t('download.mobileBody')}</p>
                                  <div className="po-dl-actions">
                                      <button type="button" className="po-dl-btn po-dl-btn-ghost" onClick={closeAll}>
                                          {t('download.close')}
                                      </button>
                                      <a className="po-dl-btn po-dl-btn-primary" href={NOTIFY_MAILTO}>
                                          <Mail className="h-4 w-4" strokeWidth={1.75} />
                                          {t('download.mobileAction')}
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </div>,
                      document.body,
                  )
                : null}
        </section>
    )
}
