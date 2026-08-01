'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

import { RevealText } from '@/components/motion/reveal-text'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { EASE_OUT_EXPO } from '@/components/motion/transitions'
import { Container, SectionLabel } from '@/components/ui/section'
import { useLang } from '@/components/providers/lang-provider'
import { services } from '@/content/profile'

/**
 * As frentes de trabalho, em linhas grandes. A que está sob o cursor ganha um
 * traço em gradiente que cresce da esquerda e as ferramentas deslizam para
 * dentro, então a leitura acompanha o gesto em vez de mostrar tudo de uma vez.
 */
export function Services() {
  const { t, pick } = useLang()
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionLabel>{t.home.servicesLabel}</SectionLabel>

        <RevealText
          as="h2"
          text={t.home.servicesTitle}
          className="gb-face mt-8 gb-title"
        />

        <RevealGroup amount={0.08} className="mt-16 flex flex-col">
          {services.map((service, index) => {
            const isActive = active === service.id

            return (
              <RevealItem
                key={service.id}
                className="gb-rule border-line"
                onPointerEnter={() => setActive(service.id)}
                onPointerLeave={() => setActive(null)}
              >
                <div className="relative py-8">
                  {!reduceMotion && (
                    <motion.span
                      aria-hidden
                      className="gb-gradient absolute inset-x-0 top-0 h-px"
                      style={{ originX: 0 }}
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    />
                  )}

                  <div className="grid gap-4 md:grid-cols-[3rem_minmax(0,15rem)_1fr] md:items-start md:gap-8">
                    <span className="gb-label tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Tamanho próprio, menor que text-heading: a coluna é
                        estreita e o título precisa caber em uma ou duas linhas. */}
                    <motion.h3
                      animate={{ x: isActive && !reduceMotion ? 8 : 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                      className="text-xl font-semibold text-balance sm:text-2xl"
                    >
                      {pick(service.title)}
                    </motion.h3>

                    <div>
                      <p className="max-w-xl text-muted text-pretty">
                        {pick(service.description)}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.tools.map((tool) => (
                          <span
                            key={tool}
                            className={`gb-label rounded-full border px-3 py-1.5 transition-colors ${
                              isActive
                                ? 'border-accent text-accent'
                                : 'border-line'
                            }`}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealItem>
            )
          })}
          <div className="gb-rule border-line" />
        </RevealGroup>
      </Container>
    </section>
  )
}
