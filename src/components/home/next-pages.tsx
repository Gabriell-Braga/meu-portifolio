'use client'

import { Reveal } from '@/components/motion/reveal'
import { Container, SectionLabel } from '@/components/ui/section'
import { WipeLink } from '@/components/ui/wipe-link'
import { useLang } from '@/components/providers/lang-provider'

/** Fecho da Home: as três páginas seguintes como linhas grandes. */
export function NextPages() {
  const { t } = useLang()

  const links = [
    { href: '/projetos', label: t.nav.projects, meta: '20+' },
    { href: '/experiencia', label: t.nav.experience, meta: '2021 — 2026' },
    { href: '/contato', label: t.nav.contact, meta: t.contact.availability },
  ]

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionLabel>{t.home.nextLabel}</SectionLabel>

        <div className="mt-10 flex flex-col">
          {links.map((link, index) => (
            <Reveal key={link.href} delay={index * 0.07} className="gb-rule border-line">
              <WipeLink href={link.href} meta={link.meta}>
                {link.label}
              </WipeLink>
            </Reveal>
          ))}
          <div className="gb-rule border-line" />
        </div>
      </Container>
    </section>
  )
}
