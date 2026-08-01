'use client'

import { motion, useScroll, useSpring } from 'motion/react'

/** Barra fina no topo, presa ao progresso de rolagem da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="gb-gradient pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left"
    />
  )
}
