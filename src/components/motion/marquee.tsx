'use client'

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useRef, type ReactNode } from 'react'

type MarqueeProps = {
  items: ReactNode[]
  /** Pixels por segundo em repouso. Negativo inverte o sentido. */
  baseSpeed?: number
  className?: string
  separator?: ReactNode
}

/**
 * Faixa infinita que reage ao scroll: acelera conforme a velocidade da rolagem
 * e inverte o sentido quando o usuário sobe. O conteúdo é duplicado uma vez e
 * o deslocamento dá a volta em -50%, então a emenda nunca aparece.
 */
export function Marquee({
  items,
  baseSpeed = 40,
  className,
  separator,
}: MarqueeProps) {
  const reduceMotion = useReducedMotion()

  const trackRef = useRef<HTMLDivElement>(null)
  const offset = useMotionValue(0)
  const direction = useRef(1)

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  })
  // Rolagem rápida multiplica a velocidade da faixa em até ~6x.
  const velocityFactor = useTransform(smoothVelocity, [-2000, 0, 2000], [-5, 0, 5], {
    clamp: false,
  })

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return

    const factor = velocityFactor.get()
    if (factor < 0) direction.current = -1
    else if (factor > 0) direction.current = 1

    const track = trackRef.current
    if (!track) return

    // Metade da largura é uma cópia completa da lista.
    const half = track.scrollWidth / 2
    if (half === 0) return

    let next =
      offset.get() +
      direction.current * baseSpeed * (delta / 1000) +
      direction.current * baseSpeed * Math.abs(factor) * (delta / 1000)

    // Mantém o valor sempre dentro de um ciclo, para não crescer indefinidamente.
    next = ((next % half) + half) % half
    offset.set(next)
  })

  const x = useTransform(offset, (value) => `${-value}px`)
  const content = [...items, ...items]

  return (
    <div className={`w-full overflow-hidden ${className ?? ''}`}>
      <motion.div
        ref={trackRef}
        className="flex w-max items-center will-change-transform"
        style={reduceMotion ? undefined : { x }}
        aria-hidden={false}
      >
        {content.map((item, index) => (
          <div key={index} className="flex shrink-0 items-center">
            <span className="px-4 sm:px-6">{item}</span>
            <span className="text-accent/60" aria-hidden>
              {separator ?? '✦'}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
