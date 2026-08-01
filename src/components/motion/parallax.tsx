'use client'

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from 'motion/react'
import { useRef, type ReactNode } from 'react'

type ParallaxProps = Omit<HTMLMotionProps<'div'>, 'children' | 'style'> & {
  children: ReactNode
  /** Deslocamento total em pixels ao longo da travessia pela viewport. */
  distance?: number
  className?: string
}

/**
 * Move o conteúdo em ritmo diferente do resto da página enquanto ele cruza a
 * viewport. Distâncias negativas fazem a camada "ficar para trás".
 */
export function Parallax({
  children,
  distance = 80,
  className,
  ...rest
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduceMotion ? undefined : { y }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
