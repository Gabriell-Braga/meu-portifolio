'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'

import { Parallax } from '@/components/motion/parallax'
import { RevealText } from '@/components/motion/reveal-text'
import { Reveal } from '@/components/motion/reveal'
import { TiltCard } from '@/components/motion/tilt-card'
import { Container, SectionLabel } from '@/components/ui/section'
import { useLang } from '@/components/providers/lang-provider'
import { highlightedProjects } from '@/content/projects'

/** Amostra dos projetos marcados como destaque, com link para a página cheia. */
export function SelectedWork() {
  const { t, pick } = useLang()

  return (
    <section className="py-24 sm:py-32">
      <Container>
        {/* Etiqueta e atalho dividem a mesma linha; o título vem abaixo, em
            largura cheia, para não competir com o link. */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <SectionLabel>{t.home.selectedLabel}</SectionLabel>

          <Link
            href="/projetos"
            className="gb-label group flex items-center gap-2 transition-colors hover:text-accent"
          >
            {t.home.seeAll}
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        <RevealText
          as="h2"
          text={t.home.selectedTitle}
          className="gb-face mt-8 gb-title"
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {highlightedProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.08}>
              <Link href={`/projetos?projeto=${project.slug}`} className="group block">
                <TiltCard className="overflow-hidden rounded-2xl border border-line bg-surface">
                  <div className="relative aspect-16/10 overflow-hidden bg-bg-soft">
                    {/* A imagem excede o quadro para poder deslizar no hover. */}
                    <Parallax distance={18} className="absolute -inset-4">
                      <Image
                        src={project.images[0].src}
                        alt={project.title}
                        fill
                        sizes="(min-width: 640px) 45vw, 92vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </Parallax>
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-bg/80 via-transparent to-transparent"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-6 p-6">
                    <div>
                      <h3 className="text-xl font-semibold transition-colors group-hover:text-accent">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm text-muted text-pretty">
                        {pick(project.summary)}
                      </p>
                    </div>
                    <span className="gb-label shrink-0 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </TiltCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
