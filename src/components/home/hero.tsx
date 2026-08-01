'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

import { EASE_OUT_EXPO } from '@/components/motion/transitions'
import { Container } from '@/components/ui/section'
import { useLang } from '@/components/providers/lang-provider'
import { heroFacts, heroLines, profile } from '@/content/profile'

/**
 * Bloco de abertura. As linhas gigantes sobem por trás de uma máscara e, ao
 * rolar, o conjunto inteiro afunda, encolhe e desfoca — o hero "sai de cena"
 * em vez de simplesmente rolar para fora.
 *
 * A ficha lateral existe para ocupar a largura sobrando ao lado do título: com
 * só o texto gigante à esquerda, metade da dobra ficava vazia em telas largas.
 */
export function Hero() {
  const { lang, t, pick } = useLang()
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(10px)'])

  const lines = heroLines[lang]

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100svh-4rem)] items-stretch sm:min-h-[calc(100svh-5rem)]"
    >
      <motion.div
        className="flex w-full flex-col justify-between pt-8 pb-8 sm:pt-12"
        style={reduceMotion ? undefined : { y, scale, opacity, filter: blur }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.35 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            <span className="gb-label flex items-center gap-2 text-fg">
              <span
                aria-hidden
                className="size-1.5 animate-[pulse-dot_2.4s_ease-in-out_infinite] rounded-full bg-accent"
              />
              {t.home.availableFor}
            </span>
            <span className="gb-label">{pick(profile.location)}</span>
          </motion.div>
        </Container>

        <Container className="mt-8">
          <div className="flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between xl:gap-16">
            <h1 className="gb-face min-w-0 gb-display">
              <span className="sr-only">
                {profile.name} · {pick(profile.role)}
              </span>
              {lines.map((line, index) => (
                <span
                  key={line}
                  aria-hidden
                  // O padding-top alarga a caixa da máscara para caber o acento
                  // de SÊNIOR; o -mt devolve a posição original da linha.
                  className="-mt-[0.16em] block overflow-hidden pt-[0.16em] pb-[0.06em]"
                >
                  <motion.span
                    className="block will-change-transform"
                    initial={{ y: '108%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 1.15,
                      ease: EASE_OUT_EXPO,
                      delay: 0.15 + index * 0.09,
                    }}
                  >
                    {/* A última linha sai na cor de destaque, e o ponto final
                        na cor do texto: invertido em relação às outras páginas,
                        onde o título é neutro e só o ponto é colorido. */}
                    <span
                      className={index === lines.length - 1 ? 'text-accent' : undefined}
                    >
                      {line}
                    </span>
                    {index === lines.length - 1 && (
                      <span className="text-fg">.</span>
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.dl
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.7 }}
              className="grid shrink-0 grid-cols-2 gap-x-8 gap-y-5 xl:w-72 xl:grid-cols-1 xl:gap-y-4"
            >
              {heroFacts.map((fact) => (
                <div key={fact.key.en}>
                  <dt className="gb-label">{pick(fact.key)}</dt>
                  <dd className="mt-1.5 text-sm font-medium text-pretty">
                    {pick(fact.value)}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </Container>

        <Container className="mt-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="gb-rule flex flex-wrap items-end justify-between gap-6 border-line pt-6"
          >
            <p className="max-w-md gb-lead text-muted text-pretty">
              {pick(profile.role)} · {lang === 'pt' ? '6+ anos' : '6+ years'} ·
              Angular, TypeScript, Next.js
            </p>

            <span className="gb-label flex items-center gap-2" aria-hidden>
              {t.home.scroll}
              <motion.span
                className="block h-8 w-px bg-accent"
                style={{ originY: 0 }}
                animate={{ scaleY: [0.15, 1, 0.15] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  )
}
