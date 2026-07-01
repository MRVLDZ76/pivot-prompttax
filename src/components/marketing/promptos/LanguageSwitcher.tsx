'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Globe } from 'lucide-react'

import { LOCALES, LOCALE_LABELS, LOCALE_SHORT, useI18n, type Locale } from '@/i18n/I18nProvider'

interface LanguageSwitcherProps {
    /** Visual variant: `nav` for the sticky header, `compact` for tight spaces. */
    variant?: 'nav' | 'compact'
}

export function LanguageSwitcher({ variant = 'nav' }: LanguageSwitcherProps) {
    const { locale, setLocale, t } = useI18n()
    const [open, setOpen] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        const onPointer = (event: PointerEvent) => {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false)
        }
        document.addEventListener('pointerdown', onPointer)
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('pointerdown', onPointer)
            document.removeEventListener('keydown', onKey)
        }
    }, [open])

    const choose = (next: Locale) => {
        setLocale(next)
        setOpen(false)
    }

    return (
        <div ref={rootRef} className={`po-lang ${variant === 'compact' ? 'po-lang-compact' : ''}`}>
            <button
                type="button"
                className="po-lang-trigger"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={t('switcher.label')}
                onClick={() => setOpen((v) => !v)}
            >
                <Globe className="po-lang-globe" strokeWidth={1.6} aria-hidden />
                <span className="po-lang-current">{LOCALE_SHORT[locale]}</span>
                <svg className={`po-lang-caret ${open ? 'po-lang-caret-open' : ''}`} width="10" height="10" viewBox="0 0 12 12" aria-hidden>
                    <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {open ? (
                <ul className="po-lang-menu" role="listbox" aria-label={t('switcher.label')}>
                    {LOCALES.map((code) => (
                        <li key={code} role="option" aria-selected={code === locale}>
                            <button
                                type="button"
                                className={`po-lang-option ${code === locale ? 'po-lang-option-active' : ''}`}
                                onClick={() => choose(code)}
                            >
                                <span className="po-lang-option-short">{LOCALE_SHORT[code]}</span>
                                <span className="po-lang-option-label">{LOCALE_LABELS[code]}</span>
                                {code === locale ? <Check className="po-lang-option-check" strokeWidth={2} aria-hidden /> : null}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    )
}
