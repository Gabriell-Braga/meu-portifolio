'use client'

import { motion } from 'motion/react'

import { useLang } from '@/components/providers/lang-provider'
import { snappySpring } from '@/components/motion/transitions'

const OPTIONS = ['pt', 'en'] as const

/** Interruptor de dois estados com a pílula ativa deslizando entre eles. */
export function LangToggle() {
  const { lang, t, toggle, switching } = useLang()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.a11y.toggleLang}
      disabled={switching}
      className="relative flex items-center rounded-full border border-line p-0.5 disabled:opacity-60"
    >
      {OPTIONS.map((option) => {
        const active = option === lang
        return (
          <span
            key={option}
            className={`gb-label relative z-10 px-2.5 py-1 transition-colors ${
              active ? 'text-bg' : 'text-muted'
            }`}
          >
            {option.toUpperCase()}
            {active && (
              <motion.span
                layoutId="lang-pill"
                transition={snappySpring}
                className="absolute inset-0 -z-10 rounded-full bg-fg"
              />
            )}
          </span>
        )
      })}
    </button>
  )
}
