'use client'

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from 'motion/react'
import { useRef, type ReactNode } from 'react'

import { usePointerFine } from '@/lib/hooks/use-media-query'
import { softSpring } from './transitions'

type MagneticProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode
  /** Quanto o elemento acompanha o cursor, de 0 a 1. */
  strength?: number
}

/**
 * O elemento é atraído pelo ponteiro enquanto ele está por cima. Desligado no
 * toque (onde não há hover) e em prefers-reduced-motion.
 */
export function Magnetic({ children, strength = 0.35, ...rest }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const pointerFine = usePointerFine()
  const reduceMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, softSpring)
  const springY = useSpring(y, softSpring)

  const active = pointerFine && !reduceMotion

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return
    const bounds = ref.current.getBoundingClientRect()
    x.set((event.clientX - (bounds.left + bounds.width / 2)) * strength)
    y.set((event.clientY - (bounds.top + bounds.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={active ? { x: springX, y: springY } : undefined}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
