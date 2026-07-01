'use client'

import { useRef } from 'react'
import Image from 'next/image'
import desktopMock from '@/mocks/desktop-mock.png'

const STATUS_PILLS = ['Living Financial Vault', 'Deep agents active', 'Evidence-linked answers']

const SYSTEM_NODES = [
    { label: 'Documents', className: 'po-hero-node-docs' },
    { label: 'Deep Agents', className: 'po-hero-node-agents' },
    { label: 'TaxCore', className: 'po-hero-node-taxcore' },
    { label: 'IRS Authority', className: 'po-hero-node-irs' },
    { label: 'Timeline', className: 'po-hero-node-timeline' },
    { label: 'Recommendations', className: 'po-hero-node-recommendations' },
    { label: 'CPA Review', className: 'po-hero-node-cpa' },
]

export function HeroMock() {
    const shellRef = useRef<HTMLDivElement>(null)

    const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const el = shellRef.current
        if (!el) return

        const rect = el.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5

        el.style.setProperty('--po-parallax-x', `${x * 10}px`)
        el.style.setProperty('--po-parallax-y', `${y * 8}px`)
        el.style.setProperty('--po-tilt-x', `${y * -2}deg`)
        el.style.setProperty('--po-tilt-y', `${x * 2}deg`)
    }

    const handleLeave = () => {
        const el = shellRef.current
        if (!el) return

        el.style.setProperty('--po-parallax-x', '0px')
        el.style.setProperty('--po-parallax-y', '0px')
        el.style.setProperty('--po-tilt-x', '0deg')
        el.style.setProperty('--po-tilt-y', '0deg')
    }

    return (
        <div ref={shellRef} className="po-hero-shell" onMouseMove={handleMove} onMouseLeave={handleLeave}>
            <div className="po-hero-shell-bg" aria-hidden />
            <div className="po-hero-shell-glow" aria-hidden />
            <div className="po-hero-shell-spotlight" aria-hidden />
            <div className="po-hero-shell-noise" aria-hidden />

            <svg className="po-hero-traces" viewBox="0 0 1200 720" aria-hidden>
                <defs>
                    <path id="trace-a" d="M132 188 C224 188, 270 170, 430 170" />
                    <path id="trace-b" d="M1010 178 C918 178, 884 176, 760 178" />
                    <path id="trace-c" d="M180 520 C304 520, 386 520, 518 470" />
                    <path id="trace-d" d="M1020 512 C930 512, 862 508, 720 458" />
                    <path id="trace-e" d="M600 150 C600 222, 600 252, 600 314" />
                    <path id="trace-f" d="M610 424 C610 494, 610 534, 610 594" />
                </defs>

                <use href="#trace-a" className="po-hero-trace po-hero-trace-a" />
                <use href="#trace-b" className="po-hero-trace po-hero-trace-b" />
                <use href="#trace-c" className="po-hero-trace po-hero-trace-c" />
                <use href="#trace-d" className="po-hero-trace po-hero-trace-d" />
                <use href="#trace-e" className="po-hero-trace po-hero-trace-e" />
                <use href="#trace-f" className="po-hero-trace po-hero-trace-f" />

                <circle r="4" className="po-hero-pulse">
                    <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#trace-a" />
                    </animateMotion>
                </circle>
                <circle r="4" className="po-hero-pulse po-hero-pulse-delay-1">
                    <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#trace-b" />
                    </animateMotion>
                </circle>
                <circle r="4" className="po-hero-pulse po-hero-pulse-delay-2">
                    <animateMotion dur="8.5s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#trace-c" />
                    </animateMotion>
                </circle>
                <circle r="4" className="po-hero-pulse po-hero-pulse-delay-3">
                    <animateMotion dur="9.4s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#trace-d" />
                    </animateMotion>
                </circle>
                <circle r="4" className="po-hero-pulse po-hero-pulse-delay-4">
                    <animateMotion dur="7.6s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#trace-e" />
                    </animateMotion>
                </circle>
                <circle r="4" className="po-hero-pulse po-hero-pulse-delay-5">
                    <animateMotion dur="8.2s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#trace-f" />
                    </animateMotion>
                </circle>
            </svg>

            <div className="po-hero-window po-glow-border po-hairline">
                <div className="po-hero-window-bar">
                    <span className="po-window-line po-window-line-short" />
                    <span className="po-window-line po-window-line-long" />
                    <span className="po-mono po-hero-window-label">prompt.tax — overview</span>
                </div>

                <div className="po-hero-image-wrap">
                    <Image src={desktopMock} alt="PromptTax OS desktop overview" priority className="po-hero-image" />
                    <div className="po-hero-image-vignette" aria-hidden />
                    <div className="po-hero-memory-core" aria-hidden>
                        <div className="po-hero-memory-core-ring" />
                        <div className="po-hero-memory-core-ring po-hero-memory-core-ring-2" />
                        <div className="po-hero-memory-core-label">
                            <span className="po-mono">Core</span>
                            <strong>Financial Memory</strong>
                        </div>
                    </div>
                    <div className="po-hero-activity po-hero-activity-left">Observing → Understanding</div>
                    <div className="po-hero-activity po-hero-activity-right">Verifying → Recommending</div>
                </div>
            </div>

            <div className="po-hero-chip-row">
                {STATUS_PILLS.map((pill, index) => (
                    <div key={pill} className={`po-hero-float-pill po-hero-float-pill-${index + 1}`}>
                        {pill}
                    </div>
                ))}
            </div>

            {SYSTEM_NODES.map((node) => (
                <div key={node.label} className={`po-hero-system-node ${node.className}`}>
                    {node.label}
                </div>
            ))}
        </div>
    )
}
