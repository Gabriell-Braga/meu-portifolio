'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'

import { RevealText } from '@/components/motion/reveal-text'
import { Reveal } from '@/components/motion/reveal'
import { EASE_OUT_EXPO } from '@/components/motion/transitions'
import { Container, SectionLabel } from '@/components/ui/section'
import { useLang } from '@/components/providers/lang-provider'

type PageHeroProps = {
  label: string
  /** Quebras com "\n" viram linhas independentes da máscara. */
  title: string
  intro: string
  /** Painel interativo à direita do título, específico de cada página. */
  aside?: ReactNode
  /** Pares curtos exibidos na régua inferior da dobra. */
  meta?: { key: string; value: ReactNode }[]
  children?: ReactNode
}

/**
 * Primeira dobra das páginas internas. Ocupa a altura da viewport e distribui o
 * conteúdo entre topo, título e uma régua de dados embaixo — antes o título
 * ficava solto no meio de uma tela vazia.
 *
 * Assim como no hero da home, o bloco afunda e desfoca ao rolar, em vez de
 * simplesmente sair de quadro.
 */
export function PageHero({
  label,
  title,
  intro,
  aside,
  meta,
  children,
}: PageHeroProps) {
  const { t } = useLang()
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(8px)'])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-between sm:min-h-[calc(100svh-5rem)]"
    >
      <motion.div
        className="flex flex-1 flex-col justify-between pt-10 pb-8 sm:pt-14"
        style={reduceMotion ? undefined : { y, opacity, filter: blur }}
      >
        <Container>
          <Reveal>
            <SectionLabel>{label}</SectionLabel>
          </Reveal>
        </Container>

        <Container className="mt-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="min-w-0 flex-1">
              {/* Primeira dobra: anima na montagem, não no scroll. O ponto em
                  cor de destaque repete a assinatura do título de contato. */}
              <RevealText
                as="h1"
                text={title}
                trigger="mount"
                accentPeriod
                className="gb-face gb-display"
              />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.45 }}
                className="mt-8 max-w-xl gb-lead text-muted text-pretty"
              >
                {intro}
              </motion.p>
            </div>

            {aside && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.6 }}
                className="w-full lg:w-auto lg:shrink-0"
              >
                {aside}
              </motion.div>
            )}
          </div>
        </Container>

        <Container className="mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.75 }}
            className="gb-rule flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-line pt-6"
          >
            {meta && (
              <dl className="flex flex-wrap gap-x-10 gap-y-6">
                {meta.map((entry) => (
                  <div key={entry.key}>
                    <dt className="gb-label">{entry.key}</dt>
                    <dd className="mt-1.5 text-lg font-semibold tabular-nums">
                      {entry.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <span className="gb-label flex items-center gap-2" aria-hidden>
              {t.home.scroll}
              <motion.span
                className="block h-6 w-px bg-accent"
                style={{ originY: 0 }}
                animate={{ scaleY: [0.15, 1, 0.15] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </motion.div>
        </Container>
      </motion.div>

      {children}
    </section>
  )
}
