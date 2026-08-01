'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { snappySpring } from '@/components/motion/transitions'
import { useLang } from '@/components/providers/lang-provider'
import { profile } from '@/content/profile'

type State = 'idle' | 'copied' | 'error'

export function CopyEmail() {
  const { t } = useLang()
  const [state, setState] = useState<State>('idle')

  useEffect(() => {
    if (state === 'idle') return
    const timeout = setTimeout(() => setState('idle'), 2200)
    return () => clearTimeout(timeout)
  }, [state])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setState('copied')
    } catch {
      // Contexto inseguro ou permissão negada: o email continua visível ao lado.
      setState('error')
    }
  }

  const label =
    state === 'copied' ? t.contact.copied : state === 'error' ? t.contact.copyFailed : t.contact.copy

  return (
    <button
      type="button"
      onClick={copy}
      className="gb-label relative flex items-center gap-2 overflow-hidden rounded-full border border-line px-5 py-3 transition-colors hover:border-accent hover:text-accent"
    >
      {/* aria-live anuncia a confirmação sem mover o foco. */}
      <span className="sr-only" role="status" aria-live="polite">
        {state === 'copied' ? t.contact.copied : ''}
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={label}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={snappySpring}
          className="block"
        >
          {label}
        </motion.span>
      </AnimatePresence>

      <span aria-hidden>{state === 'copied' ? '✓' : '⧉'}</span>
    </button>
  )
}
