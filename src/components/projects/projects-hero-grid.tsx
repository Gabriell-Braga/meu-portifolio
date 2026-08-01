'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { snappySpring } from '@/components/motion/transitions'
import { useLang } from '@/components/providers/lang-provider'
import { projects, type ProjectCategory } from '@/content/projects'

const CATEGORY_TONE: Record<ProjectCategory, string> = {
  webflow: 'bg-accent',
  wordpress: 'bg-nebula',
  sistemas: 'bg-fg',
  academico: 'bg-muted',
}

/**
 * Um quadradinho por projeto, colorido pela categoria. Passar o mouse acende a
 * célula e revela o título; clicar abre o projeto direto da primeira dobra —
 * a grade funciona como índice antes mesmo de o visitante rolar.
 */
export function ProjectsHeroGrid({ onOpen }: { onOpen: (slug: string) => void }) {
  const { t, pick } = useLang()
  const [active, setActive] = useState<string | null>(null)

  const current = active
    ? projects.find((project) => project.slug === active)
    : undefined

  return (
    <div className="lg:w-80">
      <div className="grid grid-cols-9 gap-1.5 sm:grid-cols-12 lg:grid-cols-6">
        {projects.map((project) => {
          const isActive = active === project.slug

          return (
            <motion.button
              key={project.slug}
              type="button"
              onClick={() => onOpen(project.slug)}
              onPointerEnter={() => setActive(project.slug)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(project.slug)}
              onBlur={() => setActive(null)}
              aria-label={`${t.projects.open}: ${project.title}`}
              animate={{ scale: isActive ? 1.25 : 1 }}
              transition={snappySpring}
              className="group relative aspect-square rounded-[3px]"
            >
              <span
                className={`block size-full rounded-[3px] transition-opacity duration-300 ${
                  CATEGORY_TONE[project.category]
                } ${isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-100'}`}
              />
            </motion.button>
          )
        })}
      </div>

      {/* Altura reservada: sem isso a legenda empurraria o layout ao aparecer. */}
      <div className="mt-4 h-12">
        <AnimatePresence mode="wait">
          {current ? (
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <p className="text-sm font-semibold">{current.title}</p>
              <p className="gb-label mt-1 truncate">{pick(current.summary)}</p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="gb-label"
            >
              {t.projects.gridHint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
