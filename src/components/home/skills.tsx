'use client'

import { motion } from 'motion/react'

import { Magnetic } from '@/components/motion/magnetic'
import { RevealText } from '@/components/motion/reveal-text'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { fadeUpVariants } from '@/components/motion/transitions'
import { Container, SectionLabel } from '@/components/ui/section'
import { useLang } from '@/components/providers/lang-provider'
import { skillGroups, skillLabel } from '@/content/profile'

export function Skills() {
  const { t, pick, lang } = useLang()

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionLabel>{t.home.skillsLabel}</SectionLabel>

        <RevealText
          as="h2"
          text={t.home.skillsTitle}
          className="gb-face mt-8 gb-title"
        />

        <div className="mt-16 flex flex-col gap-px bg-line">
          {skillGroups.map((group, groupIndex) => (
            <RevealGroup
              key={group.id}
              amount={0.035}
              className="grid gap-6 bg-bg py-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-12"
            >
              <RevealItem className="flex items-baseline gap-3">
                <span className="gb-label text-accent tabular-nums">
                  {String(groupIndex + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-semibold">{pick(group.title)}</h3>
              </RevealItem>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const name = skillLabel(item, lang)
                  return (
                    <motion.div key={name} variants={fadeUpVariants}>
                      <Magnetic strength={0.25}>
                        <span className="block rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent">
                          {name}
                        </span>
                      </Magnetic>
                    </motion.div>
                  )
                })}
              </div>
            </RevealGroup>
          ))}
        </div>
      </Container>
    </section>
  )
}
