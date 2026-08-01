'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useRef, type ReactNode } from 'react'

import { usePointerFine } from '@/lib/hooks/use-media-query'

type TiltCardProps = {
  children: ReactNode
  className?: string
  /** Rotação máxima, em graus. */
  max?: number
}

/** Inclinação 3D sutil seguindo o ponteiro. Só onde há mouse de verdade. */
export function TiltCard({ children, className, max = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const pointerFine = usePointerFine()
  const reduceMotion = useReducedMotion()
  const active = pointerFine && !reduceMotion

  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 22 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 22 })

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return
    const bounds = ref.current.getBoundingClientRect()
    const px = (event.clientX - bounds.left) / bounds.width - 0.5
    const py = (event.clientY - bounds.top) / bounds.height - 0.5
    rotateY.set(px * max * 2)
    rotateX.set(-py * max * 2)
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={className}
      style={
        active
          ? { rotateX, rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d' }
          : undefined
      }
    >
      {children}
    </motion.div>
  )
}
