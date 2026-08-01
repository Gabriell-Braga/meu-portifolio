'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

import { usePointerFine } from '@/lib/hooks/use-media-query'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary'

/**
 * Cursor customizado em mix-blend-mode: um disco que segue o ponteiro com
 * atraso elástico e cresce sobre elementos interativos. Só ativa quando há
 * ponteiro fino — no toque o cursor nativo nunca é escondido.
 */
export function Cursor() {
  const pointerFine = usePointerFine()
  const reduceMotion = useReducedMotion()
  const active = pointerFine && !reduceMotion

  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 900, damping: 45, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 900, damping: 45, mass: 0.35 })

  useEffect(() => {
    if (!active) return

    // Só escondemos o cursor nativo depois de confirmar que o nosso vai rodar.
    document.documentElement.dataset.cursor = 'custom'

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
      setHovering(Boolean((event.target as Element | null)?.closest?.(INTERACTIVE)))
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      delete document.documentElement.dataset.cursor
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [active, x, y])

  if (!active) return null

  return (
    <motion.div
      aria-hidden
      // Acima de tudo, inclusive do overlay de projeto (z-90): o cursor nativo
      // está escondido, então ficar atrás de qualquer painel deixa o usuário
      // sem cursor nenhum.
      className="pointer-events-none fixed top-0 left-0 z-100 mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      {/* Tamanho fixo com escala: animar width/height forçaria layout a cada quadro. */}
      <motion.div
        className="size-14 rounded-full bg-white"
        style={{ x: '-50%', y: '-50%' }}
        animate={{ scale: hovering ? 1 : 0.25, opacity: visible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      />
    </motion.div>
  )
}
