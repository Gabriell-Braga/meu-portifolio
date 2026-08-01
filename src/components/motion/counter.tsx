'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type CounterProps = {
  to: number
  suffix?: string
  duration?: number
  className?: string
}

/** Conta de 0 até o valor quando entra na viewport, uma única vez. */
export function Counter({ to, suffix = '', duration = 1.6, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    // Com movimento reduzido não há animação: o valor final é derivado direto
    // no render, sem passar por estado.
    if (!inView || reduceMotion) return

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    })

    return () => controls.stop()
  }, [inView, to, duration, reduceMotion])

  const shown = reduceMotion ? to : value

  return (
    <span ref={ref} className={className}>
      {/* O valor final fica acessível a leitores de tela sem a contagem. */}
      <span aria-hidden>
        {shown}
        {suffix}
      </span>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
    </span>
  )
}
