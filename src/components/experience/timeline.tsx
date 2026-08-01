'use client'

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { Parallax } from '@/components/motion/parallax'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { useLang } from '@/components/providers/lang-provider'
import { jobs, type Job } from '@/content/experience'
import { skillLabel } from '@/content/profile'

/**
 * Linha do tempo vertical. A espinha central se desenha conforme a seção rola,
 * dando a sensação de que a trajetória está sendo traçada na hora.
 */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [activeYear, setActiveYear] = useState(jobs[0].year)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.6', 'end 0.8'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 28 })

  return (
    <div ref={ref} className="relative mt-20">
      {/* Marcador do ano em foco, grudado no topo enquanto a lista rola. */}
      <div
        aria-hidden
        className="pointer-events-none sticky top-20 z-10 -mb-10 hidden justify-end pe-2 lg:flex"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={activeYear}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35 }}
            className="gb-label rounded-full border border-line bg-bg/80 px-4 py-2 tabular-nums backdrop-blur-xl"
          >
            {activeYear}
          </motion.span>
        </AnimatePresence>
      </div>
      {/* Trilho apagado + traço que cresce por cima dele. */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-1.75 w-px bg-line md:left-1/2 md:-translate-x-1/2"
      />
      <motion.div
        aria-hidden
        style={reduceMotion ? { scaleY: 1 } : { scaleY, originY: 0 }}
        className="gb-gradient absolute top-0 bottom-0 left-1.75 w-px md:left-1/2 md:-translate-x-1/2"
      />

      <ol className="flex flex-col gap-20 sm:gap-28">
        {jobs.map((job, index) => (
          <TimelineItem
            key={job.id}
            job={job}
            index={index}
            onActive={setActiveYear}
          />
        ))}
      </ol>
    </div>
  )
}

function TimelineItem({
  job,
  index,
  onActive,
}: {
  job: Job
  index: number
  onActive: (year: string) => void
}) {
  const { t, pick, lang } = useLang()
  const itemRef = useRef<HTMLLIElement>(null)
  // A faixa estreita no topo faz o ano trocar quando o cargo cruza o cabeçalho.
  const inView = useInView(itemRef, { margin: '-20% 0px -70% 0px' })

  useEffect(() => {
    if (inView) onActive(job.year)
  }, [inView, job.year, onActive])

  // No desktop os cards alternam os lados da espinha.
  const onLeft = index % 2 === 0

  return (
    <li ref={itemRef} className="relative ps-8 md:ps-0">
      <span
        aria-hidden
        className="absolute top-2 left-0 size-3.75 rounded-full border-2 border-bg bg-accent md:left-1/2 md:-translate-x-1/2"
      />

      {/* Os lados alternam pela ordem das colunas do grid, e não por
          `direction: rtl` — inverter a direção do texto bagunçaria pontuação
          e marcadores dentro dos cards. */}
      <div className="md:grid md:grid-cols-2 md:gap-16">
        <RevealGroup
          amount={0.05}
          className={`relative ${onLeft ? 'md:text-right' : 'md:order-2'}`}
        >
          {/* Ano gigante em marca d'água, deslocado em parallax. */}
          <Parallax
            distance={40}
            className={`pointer-events-none absolute -top-12 -z-10 select-none ${
              onLeft ? 'right-0' : 'left-0'
            }`}
          >
            <span
              aria-hidden
              className="gb-face gb-watermark text-[clamp(4rem,10vw,9rem)] leading-none"
            >
              {job.year}
            </span>
          </Parallax>

          <RevealItem className="flex flex-wrap items-center gap-3 md:justify-start">
            <span className="gb-label">{pick(job.period)}</span>
            {job.current && (
              <span className="gb-label rounded-full bg-accent px-2.5 py-1 text-white">
                {t.experience.current}
              </span>
            )}
          </RevealItem>

          <RevealItem>
            <h2 className="gb-face mt-4 gb-heading">{job.company}</h2>
            <p className="mt-2 gb-lead">{pick(job.role)}</p>
            <p className="gb-label mt-2">{pick(job.location)}</p>
          </RevealItem>

          <RevealItem
            className={`mt-6 flex flex-wrap gap-2 ${onLeft ? 'md:justify-end' : ''}`}
          >
            {job.stack.map((tech) => {
              const name = skillLabel(tech, lang)
              return (
                <span
                  key={name}
                  className="rounded-full border border-line px-3 py-1.5 text-xs"
                >
                  {name}
                </span>
              )
            })}
          </RevealItem>
        </RevealGroup>

        <RevealGroup
          amount={0.07}
          delay={0.1}
          className={`mt-8 md:mt-0 ${onLeft ? '' : 'md:order-1'}`}
        >
          <ul className="flex flex-col gap-4">
            {job.highlights.map((highlight, highlightIndex) => (
              <RevealItem key={highlightIndex} className="flex gap-3">
                <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                <span className="text-muted text-pretty">{pick(highlight)}</span>
              </RevealItem>
            ))}
          </ul>
        </RevealGroup>
      </div>
    </li>
  )
}
