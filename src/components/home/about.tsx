'use client'

import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

import { Container, SectionLabel } from '@/components/ui/section'
import { useLang } from '@/components/providers/lang-provider'
import { intro } from '@/content/profile'

/**
 * O parágrafo de apresentação acende palavra por palavra conforme a seção
 * atravessa a viewport: a leitura acompanha o scroll em vez de ser um bloco
 * cinza que aparece de uma vez.
 *
 * O fecho é um link para a página de contato e participa da mesma revelação,
 * então a contagem de palavras inclui as dele.
 */
export function About() {
  const { t, pick } = useLang()
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  /**
   * A revelação termina enquanto o parágrafo ainda está entrando na tela.
   *
   * Com o intervalo anterior ('start 0.85' → 'end 0.45') a última palavra só
   * acendia quando a base do bloco chegava ao meio da viewport, ou seja,
   * depois de o leitor já ter passado por ele. Fechando em 'end 0.8' o trecho
   * de scroll cai para cerca de um terço e o texto acaba de acender assim que
   * o bloco se assenta na tela.
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'end 0.8'],
  })

  const bodyWords = pick(intro.body).split(' ')
  const ctaWords = pick(intro.cta).split(' ')
  const total = bodyWords.length + ctaWords.length

  /** Cada palavra acende num trecho próprio do progresso da seção. */
  const rangeFor = (index: number): [number, number] => [
    index / total,
    (index + 1.6) / total,
  ]

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionLabel>{t.home.aboutLabel}</SectionLabel>

        <div ref={ref} className="mt-10 max-w-5xl">
          <p className="gb-heading font-medium text-pretty">
            {bodyWords.map((word, index) => (
              <Word
                key={`${word}-${index}`}
                progress={scrollYProgress}
                range={rangeFor(index)}
                disabled={Boolean(reduceMotion)}
              >
                {word}
              </Word>
            ))}

            <Link
              href="/contato"
              className="inline-block text-accent underline decoration-accent/40 decoration-2 underline-offset-[0.18em] transition-colors hover:decoration-accent"
            >
              {ctaWords.map((word, index) => (
                <Word
                  key={`${word}-${index}`}
                  progress={scrollYProgress}
                  range={rangeFor(bodyWords.length + index)}
                  disabled={Boolean(reduceMotion)}
                >
                  {word}
                </Word>
              ))}
            </Link>
          </p>
        </div>
      </Container>
    </section>
  )
}

function Word({
  children,
  progress,
  range,
  disabled,
}: {
  children: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
  disabled: boolean
}) {
  const opacity = useTransform(progress, range, [0.15, 1])

  return (
    <span className="me-[0.28em] inline-block">
      <motion.span style={disabled ? undefined : { opacity }}>{children}</motion.span>
    </span>
  )
}
