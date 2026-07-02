import Image from 'next/image'
import Link from 'next/link'
import {
    ArrowLeft,
    Check,
    Cpu,
    Download,
    FileSearch,
    FolderCog,
    KeyRound,
    Rocket,
    ShieldCheck,
    Sparkles,
    Terminal,
} from 'lucide-react'

import { AIModelsSection } from './AIModelsSection'
import { PromptOSFooter } from './PromptOSFooter'

/** Labeled placeholder for a product screenshot. Replace the box with a real
 *  <Image> when captures are ready — the label documents what belongs here. */
function Shot({ label }: { label: string }) {
    return (
        <div className="po-doc-shot" role="img" aria-label={`Screenshot placeholder: ${label}`}>
            <FileSearch size={26} strokeWidth={1.5} aria-hidden />
            <span className="po-doc-shot-tag">Screenshot</span>
            <span className="po-doc-shot-label">{label}</span>
        </div>
    )
}

const STEPS = [
    {
        title: 'Download the Windows installer',
        body: 'From the download panel, choose Windows and confirm the secure download prompt. PromptTax verifies your device is a desktop, then saves the signed installer (PromptTax-Setup.exe) to your Downloads folder.',
        shot: 'The secure download confirmation dialog with platform, file name, and source shown before the download starts.',
    },
    {
        title: 'Run the installer',
        body: 'Double-click PromptTax-Setup.exe. If Windows SmartScreen appears, select More info, then Run anyway — the build is code-signed. Follow the installer to choose an install location and finish setup.',
        shot: 'The PromptTax installer window on the install-location step, with the Install button visible.',
    },
    {
        title: 'First launch and your Financial Vault',
        body: 'On first launch, PromptTax asks where to create your local Financial Vault — a folder on your own computer where every document and result is stored. Nothing is uploaded; the vault never leaves your machine.',
        shot: 'The first-run welcome screen prompting you to create or choose a local Financial Vault folder.',
    },
    {
        title: 'Point PromptTax at your documents',
        body: 'Add the folders you already keep statements, K-1s, and returns in. PromptTax only reads the folders you choose, and you can add or remove them at any time.',
        shot: 'The watched-folders screen with one or more folders added to the vault.',
    },
]

const SETTINGS = [
    'Watched folders — choose exactly which folders PromptTax may read, and exclude anything private.',
    'Privacy controls — keep everything on-device, and decide what (if anything) is ever sent to a cloud model.',
    'AI model — pick a local model through Ollama, or add your own API key for a cloud provider.',
    'Notifications — control when PromptTax alerts you about new documents, changes, or items that need review.',
]

const FEATURES = [
    {
        icon: FolderCog,
        title: 'Document vault',
        body: 'A private, organized library of every financial document, sorted by entity and year automatically.',
        shot: 'The vault view with documents grouped by entity and tax year.',
    },
    {
        icon: FileSearch,
        title: 'K-1 extraction',
        body: 'Line-by-line extraction from every K-1, with each number linked back to the source page.',
        shot: 'A K-1 opened with extracted fields highlighted next to the original document.',
    },
    {
        icon: Sparkles,
        title: 'Tax memory',
        body: 'PromptTax remembers your entities, elections, and prior-year figures so nothing gets re-explained.',
        shot: 'The memory panel showing entities and remembered facts across years.',
    },
    {
        icon: ShieldCheck,
        title: 'Explainable copilot',
        body: 'Ask a question and get an answer with the document, calculation, and IRS guidance behind it.',
        shot: 'A copilot answer expanded to show its cited sources and reasoning.',
    },
]

export function SetupGuide() {
    return (
        <div className="promptos">
            <div>
                <nav className="po-doc-nav">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="po-brand-mark po-brand-mark-dim" style={{ width: 18, height: 18 }}>
                            <Image src="/prompttax-desktop-logo.png" alt="Prompt.tax" width={18} height={18} priority />
                        </span>
                        <span className="po-brand-wordmark">Prompt.tax</span>
                    </Link>
                    <div className="po-doc-nav-links">
                        <Link href="/" className="po-doc-nav-link flex items-center gap-1.5">
                            <ArrowLeft size={14} />
                            Home
                        </Link>
                        <Link href="/download" className="po-doc-nav-link flex items-center gap-1.5">
                            <Download size={14} />
                            Download
                        </Link>
                    </div>
                </nav>

                <header className="po-doc-hero">
                    <div className="po-doc-hero-inner">
                        <div className="po-section-badge">
                            <span className="po-section-badge-text">Setup guide</span>
                        </div>
                        <h1 className="po-doc-title">Install PromptTax and make it yours.</h1>
                        <p className="po-doc-lede">
                            A step-by-step walkthrough of installing PromptTax on Windows, creating your local vault,
                            configuring your settings, and choosing how AI runs — on your machine or through your own
                            provider.
                        </p>
                        <div className="po-doc-toc">
                            <a href="#install">Install</a>
                            <a href="#settings">Settings</a>
                            <a href="#features">Features</a>
                            <a href="#ai-models">AI models</a>
                        </div>
                    </div>
                </header>

                <main className="po-doc-main">
                    <section id="install" className="po-doc-section">
                        <span className="po-doc-section-eyebrow">Installation</span>
                        <h2 className="po-doc-section-heading">Get PromptTax running</h2>
                        {STEPS.map((step, i) => (
                            <div key={step.title} className="po-doc-step">
                                <div>
                                    <span className="po-doc-step-index">{i + 1}</span>
                                    <h3 className="po-doc-step-title">{step.title}</h3>
                                    <p className="po-doc-step-body">{step.body}</p>
                                </div>
                                <Shot label={step.shot} />
                            </div>
                        ))}
                    </section>

                    <section id="settings" className="po-doc-section">
                        <span className="po-doc-section-eyebrow">Configuration</span>
                        <h2 className="po-doc-section-heading">Walk through your settings</h2>
                        <div className="po-doc-step">
                            <div>
                                <h3 className="po-doc-step-title">Everything is opt-in</h3>
                                <p className="po-doc-step-body">
                                    Open Settings from the sidebar. Each control is designed so PromptTax only does what
                                    you allow — you decide which folders it reads and whether anything ever leaves your
                                    computer.
                                </p>
                                <ul className="po-doc-substeps">
                                    {SETTINGS.map((item) => (
                                        <li key={item}>
                                            <Check size={15} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Shot label="The Settings panel showing watched folders, privacy controls, AI model, and notifications." />
                        </div>
                    </section>

                    <section id="features" className="po-doc-section">
                        <span className="po-doc-section-eyebrow">Feature tour</span>
                        <h2 className="po-doc-section-heading">What you can do next</h2>
                        <div className="po-doc-feature-grid">
                            {FEATURES.map((feature) => {
                                const Icon = feature.icon
                                return (
                                    <div key={feature.title} className="po-doc-feature-card">
                                        <Shot label={feature.shot} />
                                        <div className="flex items-center gap-2">
                                            <Icon size={16} strokeWidth={1.6} />
                                            <span className="po-doc-feature-title">{feature.title}</span>
                                        </div>
                                        <p className="po-doc-feature-body">{feature.body}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </main>

                {/* AI models — shared with the landing page, localized */}
                <AIModelsSection />

                <section className="po-doc-main po-doc-section" id="ai-setup" style={{ borderTop: 'none', paddingTop: 0 }}>
                    <div className="po-doc-callout">
                        <div className="po-doc-mini">
                            <h4 className="flex items-center gap-2">
                                <Terminal size={16} strokeWidth={1.6} />
                                Set up a local model with Ollama
                            </h4>
                            <ol>
                                <li>Install Ollama from ollama.com and let it finish setting up.</li>
                                <li>Pull a model, for example run: ollama pull llama3.1</li>
                                <li>In PromptTax Settings, choose AI model, then Local (Ollama).</li>
                                <li>Select the model you pulled — PromptTax now runs fully offline.</li>
                            </ol>
                        </div>
                        <div className="po-doc-mini">
                            <h4 className="flex items-center gap-2">
                                <KeyRound size={16} strokeWidth={1.6} />
                                Add your own API key
                            </h4>
                            <ol>
                                <li>Open Settings, then AI model, and choose Cloud provider.</li>
                                <li>Select your provider (OpenAI, Anthropic, or compatible).</li>
                                <li>Paste your API key — it is stored locally and used directly.</li>
                                <li>PromptTax shows the active mode before anything leaves your machine.</li>
                            </ol>
                        </div>
                    </div>
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <Link
                            href="/download"
                            className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-[14px] font-medium text-black transition-colors hover:bg-white/90"
                        >
                            <Rocket size={16} />
                            Download PromptTax
                        </Link>
                        <Link
                            href="/#product"
                            className="inline-flex h-11 items-center gap-2 rounded-lg border border-[var(--po-border-med)] px-5 text-[14px] font-medium text-[var(--po-fg)] transition-colors hover:bg-white/5"
                        >
                            <Cpu size={16} />
                            See how it works
                        </Link>
                    </div>
                </section>

                <PromptOSFooter downloadHref="/download" />
            </div>
        </div>
    )
}
