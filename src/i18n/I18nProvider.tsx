'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'

export const LOCALES = ['en', 'es', 'fr'] as const
export type Locale = (typeof LOCALES)[number]

export const LOCALE_LABELS: Record<Locale, string> = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
}

export const LOCALE_SHORT: Record<Locale, string> = {
    en: 'EN',
    es: 'ES',
    fr: 'FR',
}

const DICTS: Record<Locale, unknown> = { en, es, fr }
const STORAGE_KEY = 'prompttax-locale'
const DEFAULT_LOCALE: Locale = 'en'

type TranslationValue = string | string[] | Record<string, unknown> | unknown

interface I18nContextValue {
    locale: Locale
    setLocale: (next: Locale) => void
    /** Resolve a dot-path key. Returns the key itself if not found. */
    t: (key: string) => string
    /** Resolve a dot-path key to any node (array/object) for structured content. */
    tx: <T = unknown>(key: string) => T
}

const I18nContext = createContext<I18nContextValue | null>(null)

function resolve(dict: unknown, key: string): unknown {
    return key.split('.').reduce<unknown>((node, part) => {
        if (node && typeof node === 'object' && part in (node as Record<string, unknown>)) {
            return (node as Record<string, unknown>)[part]
        }
        return undefined
    }, dict)
}

function isLocale(value: string | null): value is Locale {
    return value !== null && (LOCALES as readonly string[]).includes(value)
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (isLocale(stored)) {
            setLocaleState(stored)
            return
        }
        const nav = window.navigator.language?.slice(0, 2).toLowerCase()
        if (isLocale(nav ?? null)) {
            setLocaleState(nav as Locale)
        }
    }, [])

    useEffect(() => {
        document.documentElement.lang = locale
    }, [locale])

    const setLocale = useCallback((next: Locale) => {
        setLocaleState(next)
        try {
            window.localStorage.setItem(STORAGE_KEY, next)
        } catch {
            /* storage unavailable — keep in-memory only */
        }
    }, [])

    const value = useMemo<I18nContextValue>(() => {
        const dict = DICTS[locale]
        const fallback = DICTS[DEFAULT_LOCALE]
        const lookup = (key: string): unknown => {
            const found = resolve(dict, key)
            return found === undefined ? resolve(fallback, key) : found
        }
        return {
            locale,
            setLocale,
            t: (key: string) => {
                const found = lookup(key)
                return typeof found === 'string' ? found : key
            },
            tx: <T,>(key: string) => lookup(key) as T,
        }
    }, [locale, setLocale])

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
    const ctx = useContext(I18nContext)
    if (!ctx) {
        throw new Error('useI18n must be used within an I18nProvider')
    }
    return ctx
}
