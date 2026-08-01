'use client'

import { Counter } from '@/components/motion/counter'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Container } from '@/components/ui/section'
import { useLang } from '@/components/providers/lang-provider'
import { stats } from '@/content/profile'

export function Stats() {
  const { pick } = useLang()

  return (
    <section className="py-8">
      <Container>
        <RevealGroup
          amount={0.12}
          className="gb-rule grid grid-cols-1 gap-px overflow-hidden border-line bg-line sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <RevealItem key={stat.label.en} className="bg-bg px-2 py-10 sm:px-6">
              <Counter
                to={stat.value}
                suffix={stat.suffix}
                className="gb-face block gb-title tabular-nums"
              />
              <span className="gb-label mt-3 block">{pick(stat.label)}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
