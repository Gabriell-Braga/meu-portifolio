'use client'

import { motion } from 'motion/react'
import { useState } from 'react'

import { snappySpring } from '@/components/motion/transitions'
import { useLang } from '@/components/providers/lang-provider'
import { jobs } from '@/content/experience'

/**
 * As quatro empresas empilhadas na primeira dobra. Passar o mouse expande a
 * linha e revela cargo e período, dando um resumo da trajetória antes da
 * linha do tempo completa.
 */
export function ExperienceHeroYears() {
  const { pick } = useLang()
  const [active, setActive] = useState<string | null>(jobs[0].id)

  return (
    <ul className="flex flex-col lg:w-96">
      {jobs.map((job) => {
        const isActive = active === job.id

        return (
          <li key={job.id} className="gb-rule border-line">
            <button
              type="button"
              onPointerEnter={() => setActive(job.id)}
              onFocus={() => setActive(job.id)}
              className="flex w-full items-center gap-4 py-3 text-left"
            >
              <span
                className={`gb-label tabular-nums transition-colors ${
                  isActive ? 'text-accent' : ''
                }`}
              >
                {job.year}
              </span>

              <span className="min-w-0 flex-1">
                <motion.span
                  animate={{ x: isActive ? 6 : 0 }}
                  transition={snappySpring}
                  className="block truncate font-semibold"
                >
                  {job.company}
                </motion.span>

                <motion.span
                  initial={false}
                  animate={{
                    height: isActive ? 'auto' : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.28 }}
                  className="block overflow-hidden"
                >
                  <span className="gb-label mt-1 block truncate">
                    {pick(job.role)} · {pick(job.period)}
                  </span>
                </motion.span>
              </span>

              <motion.span
                aria-hidden
                animate={{ scaleX: isActive ? 1 : 0.25, opacity: isActive ? 1 : 0.3 }}
                transition={snappySpring}
                style={{ originX: 1 }}
                className="gb-gradient h-px w-10 shrink-0"
              />
            </button>
          </li>
        )
      })}
      <li className="gb-rule border-line" />
    </ul>
  )
}
