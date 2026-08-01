'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

import { EASE_OUT_EXPO } from '@/components/motion/transitions'

/**
 * template.tsx (e não layout.tsx) porque ele remonta a cada navegação — é isso
 * que permite reexecutar a animação de entrada.
 *
 * Só há animação de entrada: no App Router a de saída exigiria interceptar a
 * navegação, e o resultado costuma engasgar mais do que ajuda.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <>{children}</>

  return (
    <>
      {/* Cortina galáxia que desce e sai por cima ao trocar de página. */}
      <motion.div
        aria-hidden
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
        style={{ originY: 0 }}
        className="gb-gradient pointer-events-none fixed inset-0 z-70"
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.15 }}
      >
        {children}
      </motion.div>
    </>
  )
}
