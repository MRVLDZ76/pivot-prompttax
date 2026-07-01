'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const variants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
}

interface RevealProps {
    children: ReactNode
    delay?: number
    className?: string
    as?: 'div' | 'section' | 'li'
}

/** Lightweight fade/rise. Animates on mount so critical landing content can't stay hidden if in-view detection fails. */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
    const MotionTag = motion[as]
    return (
        <MotionTag
            className={className}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </MotionTag>
    )
}
