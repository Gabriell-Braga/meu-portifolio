'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

import { softSpring } from '@/components/motion/transitions'
import { useLang } from '@/components/providers/lang-provider'
import type { Project } from '@/content/projects'

type ProjectCardProps = {
  project: Project
  index: number
  onOpen: (slug: string) => void
}

/**
 * Card da grade. O contêiner da capa carrega o `layoutId` que o overlay
 * reaproveita — é isso que faz o card morfar em tela cheia em vez de sumir.
 */
export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const { t, pick } = useLang()
  const cover = project.images[0]

  return (
    <motion.article
      layout
      layoutId={`card-${project.slug}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={softSpring}
      className={project.featured ? 'sm:col-span-2' : ''}
    >
      <button
        type="button"
        onClick={() => onOpen(project.slug)}
        aria-label={`${t.projects.open}: ${project.title}`}
        className="group block w-full cursor-pointer text-left"
      >
        <motion.div
          layoutId={`cover-${project.slug}`}
          className="relative overflow-hidden rounded-2xl border border-line bg-bg-soft"
        >
          <div
            className={
              project.featured
                ? 'relative aspect-16/9 sm:aspect-21/9'
                : 'relative aspect-4/3'
            }
          >
            <Image
              src={cover.src}
              alt={project.title}
              fill
              sizes={
                project.featured
                  ? '(min-width: 1024px) 66vw, 92vw'
                  : '(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 92vw'
              }
              priority={index < 2}
              className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
            />
          </div>

          {/* Véu que escurece só no hover, para o texto branco aparecer. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <span className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between gap-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="gb-label rounded-full bg-white/15 px-2.5 py-1 text-white backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </span>
            <span className="gb-label shrink-0 text-white">{t.projects.open} →</span>
          </span>
        </motion.div>

        <motion.div layout="position" className="flex items-baseline gap-3 pt-4">
          <span className="gb-label shrink-0 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted text-pretty">
              {pick(project.summary)}
            </p>
          </div>
        </motion.div>
      </button>
    </motion.article>
  )
}
