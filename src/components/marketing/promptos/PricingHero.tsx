'use client'

import Link from 'next/link'

import { Reveal } from './Reveal'
import { useI18n } from '@/i18n/I18nProvider'

export function PricingHero() {
    const { t } = useI18n()
    return (
        <Reveal>
            <div className="po-section-badge"><span className="po-section-badge-text">{t('pricing.badge')}</span></div>
            <h1 className="po-legal-title">{t('pricing.title')}</h1>
            <p className="po-legal-description">{t('pricing.description')}</p>
            <div className="mt-8 flex justify-center">
                <Link href="/#download" className="po-legal-download-link">
                    {t('pricing.cta')}
                </Link>
            </div>
        </Reveal>
    )
}
