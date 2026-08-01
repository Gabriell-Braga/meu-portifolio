'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { useRef, useState, type ReactNode } from 'react'

import { EASE_OUT_EXPO } from '@/components/motion/transitions'

type WipeLinkProps = {
  href: string
  children: ReactNode
  /** Texto pequeno alinhado à direita: categoria, valor, contexto. */
  meta?: ReactNode
  external?: boolean
  className?: string
  onClick?: () => void
}

/**
 * Linha editorial em tamanho grande. No hover, uma faixa de cor entra pelo lado
 * por onde o cursor chegou e sai pelo lado oposto quando ele vai embora — o
 * movimento segue o gesto do usuário em vez de ser sempre igual.
 */
export function WipeLink({
  href,
  children,
  meta,
  external,
  className = '',
  onClick,
}: WipeLinkProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [state, setState] = useState<{ hovering: boolean; from: 'top' | 'bottom' }>({
    hovering: false,
    from: 'top',
  })

  /** Metade superior ou inferior do elemento, no momento do cruzamento. */
  const edgeFrom = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return 'top' as const
    return event.clientY < bounds.top + bounds.height / 2
      ? ('top' as const)
      : ('bottom' as const)
  }

  const hidden = (edge: 'top' | 'bottom') =>
    edge === 'top' ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)'

  const content = (
    <div
      ref={ref}
      onPointerEnter={(event) => setState({ hovering: true, from: edgeFrom(event) })}
      onPointerLeave={(event) => setState({ hovering: false, from: edgeFrom(event) })}
      className={`group relative flex items-center justify-between gap-6 overflow-hidden px-2 py-6 sm:px-4 sm:py-8 ${className}`}
    >
      {!reduceMotion && (
        <motion.span
          aria-hidden
          className="gb-gradient absolute inset-0"
          initial={false}
          animate={{
            clipPath: state.hovering ? 'inset(0% 0% 0% 0%)' : hidden(state.from),
          }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        />
      )}

      <span className="gb-face relative z-10 gb-heading transition-colors duration-300 group-hover:text-white">
        {children}
      </span>

      <span className="relative z-10 flex shrink-0 items-center gap-4">
        {meta && (
          <span className="gb-label hidden transition-colors duration-300 group-hover:text-white/70 sm:block">
            {meta}
          </span>
        )}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="size-6 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block" onClick={onClick}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className="block" onClick={onClick}>
      {content}
    </Link>
  )
}
