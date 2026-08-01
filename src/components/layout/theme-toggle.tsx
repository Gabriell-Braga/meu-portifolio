'use client'

import { AnimatePresence, motion } from 'motion/react'

import { useLang } from '@/components/providers/lang-provider'
import { useTheme } from '@/components/providers/theme-provider'
import { snappySpring } from '@/components/motion/transitions'

/** Sol e lua desenhados inline: dois ícones não justificam uma dependência. */
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="12"
          y1="2.6"
          x2="12"
          y2="5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
      <path
        d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ThemeToggle() {
  const { theme, ready, toggle } = useTheme()
  const { t } = useLang()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.a11y.toggleTheme}
      aria-pressed={theme === 'dark'}
      className="relative grid size-9 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
    >
      {/* Antes da hidratação não sabemos o tema real: nada é renderizado
          para não mostrar o ícone errado por um quadro. */}
      <AnimatePresence mode="wait" initial={false}>
        {ready && (
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
            transition={snappySpring}
            className="absolute grid place-items-center"
          >
            {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
