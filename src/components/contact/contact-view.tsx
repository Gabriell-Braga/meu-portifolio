'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

import { CopyEmail } from '@/components/contact/copy-email'
import { KineticTitle } from '@/components/contact/kinetic-title'
import { LocalTime } from '@/components/contact/local-time'
import { Magnetic } from '@/components/motion/magnetic'
import { Reveal } from '@/components/motion/reveal'
import { EASE_OUT_EXPO } from '@/components/motion/transitions'
import { Container, SectionLabel } from '@/components/ui/section'
import { WipeLink } from '@/components/ui/wipe-link'
import { useLang } from '@/components/providers/lang-provider'
import { profile } from '@/content/profile'

export function ContactView() {
  const { t } = useLang()
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(8px)'])

  const channels = [
    {
      key: 'email',
      label: t.contact.email,
      href: `mailto:${profile.email}`,
      meta: profile.email,
    },
    {
      key: 'linkedin',
      label: t.contact.linkedin,
      href: profile.linkedin,
      meta: '/gabriel-braga',
    },
    {
      key: 'github',
      label: t.contact.github,
      href: profile.github,
      meta: '/gabriell-braga',
    },
    {
      key: 'whatsapp',
      label: t.contact.whatsapp,
      href: `https://wa.me/${profile.phoneRaw}`,
      meta: profile.phone,
    },
  ]

  return (
    <>
      <section
        ref={heroRef}
        className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-between sm:min-h-[calc(100svh-5rem)]"
      >
        <motion.div
          className="flex flex-1 flex-col justify-between pt-10 pb-8 sm:pt-14"
          style={reduceMotion ? undefined : { y, opacity, filter: blur }}
        >
          <Container>
            <Reveal>
              <SectionLabel>{t.contact.label}</SectionLabel>
            </Reveal>
          </Container>

          <Container className="mt-10">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <div className="min-w-0 flex-1">
                <KineticTitle lines={t.contact.title} />

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.5 }}
                  className="mt-8 max-w-xl gb-lead text-muted text-pretty"
                >
                  {t.contact.intro}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.65 }}
                className="flex flex-col gap-3 lg:w-80"
              >
                <a
                  href={`mailto:${profile.email}`}
                  className="group rounded-2xl border border-line p-5 transition-colors hover:border-accent"
                >
                  <span className="gb-label">{t.contact.email}</span>
                  <span className="mt-2 block break-all text-lg font-semibold transition-colors group-hover:text-accent">
                    {profile.email}
                  </span>
                </a>

                <div className="flex flex-wrap items-center gap-3">
                  <CopyEmail />
                  <Magnetic strength={0.2}>
                    <a
                      href={profile.cv}
                      download
                      className="gb-label flex items-center gap-2 rounded-full border border-line px-5 py-3 transition-colors hover:border-accent hover:text-accent"
                    >
                      {t.contact.downloadCv}
                      <span aria-hidden>↓</span>
                    </a>
                  </Magnetic>
                </div>
              </motion.div>
            </div>
          </Container>

          <Container className="mt-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="gb-rule flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-line pt-6"
            >
              <LocalTime />
              <p className="gb-label flex items-center gap-2 text-fg">
                <span
                  aria-hidden
                  className="size-1.5 animate-[pulse-dot_2.4s_ease-in-out_infinite] rounded-full bg-accent"
                />
                {t.contact.availability}
              </p>
            </motion.div>
          </Container>
        </motion.div>
      </section>

      <Container className="pb-24">
        <div className="flex flex-col">
          {channels.map((channel, index) => (
            <Reveal key={channel.key} delay={index * 0.06} className="gb-rule border-line">
              <WipeLink
                href={channel.href}
                meta={channel.meta}
                external={channel.key !== 'email'}
              >
                {channel.label}
              </WipeLink>
            </Reveal>
          ))}
          <div className="gb-rule border-line" />
        </div>
      </Container>
    </>
  )
}
