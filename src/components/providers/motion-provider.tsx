'use client'

import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

import { EASE_OUT_EXPO } from '@/components/motion/transitions'

/**
 * `reducedMotion="user"` faz o Motion respeitar prefers-reduced-motion em todo
 * o site: transforms e opacidade param de animar sem que cada componente
 * precise checar por conta própria.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
    >
      {children}
    </MotionConfig>
  )
}
