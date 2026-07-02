'use client'

import Image from 'next/image'
import { Cloud, HardDrive } from 'lucide-react'

import { Reveal } from './Reveal'
import { useI18n } from '@/i18n/I18nProvider'

type Brand = { src: string; alt: string }

const CARD_BRANDS: Brand[][] = [
    [{ src: '/brands/ollama.png', alt: 'Ollama' }],
    [
        { src: '/brands/OpenAI_Symbol_1.png', alt: 'OpenAI' },
        { src: '/brands/Anthropic_Symbol_1.png', alt: 'Anthropic' },
        { src: '/brands/Hugging_Face_Logo_1.png', alt: 'Hugging Face' },
    ],
    [],
]

export function AIModelsSection() {
    const { t, tx } = useI18n()
    const cards = tx<{ title: string; body: string }[]>('aiModels.cards')

    return (
        <section id="ai-models" className="po-ai-section border-b border-[var(--po-border)] px-6 py-24">
            <div className="po-ai-aura" aria-hidden />
            <div className="relative mx-auto max-w-6xl">
                <Reveal className="mb-14 text-center">
                    <div className="po-section-badge">
                        <span className="po-section-badge-text">{t('aiModels.badge')}</span>
                    </div>
                    <h2 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
                        {t('aiModels.headingTop')}
                        <br />
                        <span className="po-headline-soft">{t('aiModels.headingAccent')}</span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-3xl text-balance text-[15px] leading-relaxed text-[var(--po-muted)] sm:text-[17px]">
                        {t('aiModels.copy')}
                    </p>
                </Reveal>

                <div className="po-ai-grid">
                    {cards.map((card, i) => {
                        const brands = CARD_BRANDS[i] ?? []
                        return (
                            <Reveal key={i} delay={i * 0.07} className="po-ai-card po-glow-border">
                                <div className="po-ai-card-inner">
                                    <div className="po-ai-visual">
                                        {brands.length > 0 ? (
                                            <div className="po-ai-logos">
                                                {brands.map((brand) => (
                                                    <span key={brand.alt} className="po-ai-logo" title={brand.alt}>
                                                        <Image src={brand.src} alt={brand.alt} width={26} height={26} unoptimized />
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <div 
  className="po-ai-logos" 
  style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: '16px' 
  }}
>
  <span 
    className="po-ai-logo po-ai-chip-local" 
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '6px', 
      color: '#000000' 
    }}
  >
    <HardDrive 
      strokeWidth={1.7} 
      color="#000000" 
      width={26} 
      height={26} 
      style={{ color: '#000000', stroke: '#000000', flexShrink: 0 }} 
    />
   
  </span>
  
  <span 
    className="po-ai-logo po-ai-chip-cloud" 
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '6px', 
      color: '#000000' 
    }}
  >
    <Cloud 
      strokeWidth={1.7} 
      color="#000000" 
      width={26} 
      height={26} 
      style={{ color: '#000000', stroke: '#000000', flexShrink: 0 }} 
    />
    
  </span>
</div>
                                        )}
                                    </div>
                                    <h4 className="po-ai-card-title">{card.title}</h4>
                                    <p className="po-ai-card-body">{card.body}</p>
                                </div>
                            </Reveal>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

