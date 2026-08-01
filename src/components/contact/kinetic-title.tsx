'use client'

import { motion, useReducedMotion } from 'motion/react'

import { EASE_OUT_EXPO, snappySpring } from '@/components/motion/transitions'

/**
 * Título gigante letra a letra: cada caractere sobe por trás de uma máscara na
 * entrada e reage individualmente ao passar do cursor.
 *
 * A máscara é um clip-path animado, e não `overflow-hidden`: ela precisa abrir
 * para além da caixa no fim, senão cortaria a letra que sobe no hover.
 */
export function KineticTitle({ lines }: { lines: readonly string[] }) {
  const reduceMotion = useReducedMotion()
  let order = 0

  return (
    <h1 className="gb-face gb-display">
      <span className="sr-only">{lines.join(' ')}</span>

      {lines.map((line, lineIndex) => {
        const lineStart = 0.1 + order * 0.035
        const lineEnd = lineStart + line.length * 0.035 + 1

        return (
          <motion.span
            key={line}
            aria-hidden
            className="block pb-[0.06em]"
            initial={reduceMotion ? undefined : { clipPath: 'inset(0% 0% 105% 0%)' }}
            animate={
              reduceMotion ? undefined : { clipPath: 'inset(-35% -5% -20% -5%)' }
            }
            transition={{
              duration: lineEnd - lineStart,
              ease: 'linear',
              delay: lineStart,
            }}
          >
            {Array.from(line).map((character, characterIndex) => {
              const delay = 0.1 + order++ * 0.035
              const isLast =
                lineIndex === lines.length - 1 && characterIndex === line.length - 1

              return (
                <motion.span
                  key={`${character}-${characterIndex}`}
                  // A cor fica no CSS: o Motion não interpola var(--accent),
                  // então animá-la aqui daria um corte seco em vez de transição.
                  className="inline-block transition-colors duration-200 will-change-transform hover:text-accent"
                  initial={reduceMotion ? undefined : { y: '110%' }}
                  animate={reduceMotion ? undefined : { y: '0%' }}
                  transition={{ duration: 1, ease: EASE_OUT_EXPO, delay }}
                  whileHover={
                    reduceMotion ? undefined : { y: -14, transition: snappySpring }
                  }
                >
                  {character}
                  {isLast && <span className="text-accent">.</span>}
                </motion.span>
              )
            })}
          </motion.span>
        )
      })}
    </h1>
  )
}
