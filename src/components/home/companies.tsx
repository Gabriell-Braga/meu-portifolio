'use client'

import { Marquee } from '@/components/motion/marquee'
import { Container, SectionLabel } from '@/components/ui/section'
import { useLang } from '@/components/providers/lang-provider'
import { jobs } from '@/content/experience'
import { projects } from '@/content/projects'

/**
 * Faixa com os nomes por onde o trabalho passou: empregadores e os clientes
 * finais que aparecem nos projetos, sem repetir.
 */
export function Companies() {
  const { t } = useLang()

  const names = Array.from(
    new Set([
      ...jobs.map((job) => job.company),
      ...projects.map((project) => project.client).filter(Boolean),
    ]),
  ) as string[]

  return (
    <section className="py-16">
      <Container>
        <SectionLabel>{t.home.companiesLabel}</SectionLabel>
      </Container>

      <div className="mt-8">
        <Marquee
          baseSpeed={28}
          separator="·"
          items={names.map((name) => (
            <span
              key={name}
              className="gb-face text-xl whitespace-nowrap text-muted transition-colors hover:text-fg sm:text-2xl"
            >
              {name}
            </span>
          ))}
        />
      </div>
    </section>
  )
}
