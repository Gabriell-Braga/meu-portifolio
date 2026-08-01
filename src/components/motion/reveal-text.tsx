'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'

import { EASE_OUT_EXPO, viewportEarly } from './transitions'

type RevealTextProps = {
  /** Quebras de linha com "\n" viram linhas independentes na máscara. */
  text: string
  className?: string
  /** 'line' para títulos gigantes, 'word' para parágrafos e frases. */
  by?: 'line' | 'word'
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  /**
   * 'mount' para conteúdo da primeira dobra, que já está visível no
   * carregamento; 'inView' para o que aparece ao rolar.
   */
  trigger?: 'mount' | 'inView'
  /** Ponto final na cor de destaque, como no título da página de contato. */
  accentPeriod?: boolean
}

const pieceVariants: Variants = {
  hidden: { y: '110%' },
  visible: (delay: number) => ({
    y: '0%',
    transition: { duration: 1, ease: EASE_OUT_EXPO, delay },
  }),
}

/**
 * Revela texto por trás de uma máscara: cada linha (ou palavra) sobe de baixo
 * dentro de um contêiner com overflow-hidden. É a assinatura tipográfica do
 * site — todo título grande passa por aqui.
 *
 * O gatilho de viewport fica no elemento externo, e nunca nos pedaços
 * animados: eles começam em translateY(110%), completamente clipados pela
 * máscara, e um elemento clipado por um ancestral nunca conta como visível
 * para o IntersectionObserver. Observá-los ali travava a animação para sempre.
 */
export function RevealText({
  text,
  className,
  by = 'line',
  delay = 0,
  stagger = by === 'line' ? 0.1 : 0.025,
  as: Tag = 'div',
  trigger = 'inView',
  accentPeriod = false,
}: RevealTextProps) {
  const reduceMotion = useReducedMotion()
  const lines = text.split('\n')

  const Period = () => <span className="text-accent">.</span>

  if (reduceMotion) {
    return (
      <Tag className={className}>
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="block">
            {line}
            {accentPeriod && lineIndex === lines.length - 1 && <Period />}
          </span>
        ))}
      </Tag>
    )
  }

  const MotionTag = motion[Tag] as typeof motion.div
  let pieceCount = 0

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(trigger === 'mount'
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: viewportEarly })}
    >
      {lines.map((line, lineIndex) => {
        const pieces = by === 'line' ? [line] : line.split(' ')

        return (
          <span key={lineIndex} className="block">
            {pieces.map((piece, pieceIndex) => {
              const order = pieceCount++

              return (
                <span
                  key={pieceIndex}
                  className={
                    by === 'line'
                      ? // O padding-top alarga a caixa da máscara para caber
                        // acentos (Ê, Ã) e o -mt devolve a posição original.
                        // Sem isso, o overflow-hidden decepa o circunflexo.
                        '-mt-[0.16em] block overflow-hidden pt-[0.16em] pb-[0.08em]'
                      : // O espaço entre palavras vira margem: espaço em branco
                        // no fim de um inline-block o navegador colapsa.
                        'me-[0.28em] -mt-[0.16em] inline-block overflow-hidden pt-[0.16em] pb-[0.12em] align-bottom'
                  }
                >
                  <motion.span
                    className="inline-block will-change-transform"
                    variants={pieceVariants}
                    custom={delay + order * stagger}
                  >
                    {piece}
                    {/* Dentro do motion.span para o ponto subir junto com a
                        última palavra, e não aparecer solto na máscara. */}
                    {accentPeriod &&
                      lineIndex === lines.length - 1 &&
                      pieceIndex === pieces.length - 1 && <Period />}
                  </motion.span>
                </span>
              )
            })}
          </span>
        )
      })}
    </MotionTag>
  )
}
