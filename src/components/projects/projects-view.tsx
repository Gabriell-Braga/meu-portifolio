'use client'

import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

import { Reveal } from '@/components/motion/reveal'
import { snappySpring } from '@/components/motion/transitions'
import { ProjectCard } from '@/components/projects/project-card'
import { ProjectOverlay } from '@/components/projects/project-overlay'
import { ProjectsHeroGrid } from '@/components/projects/projects-hero-grid'
import { Container } from '@/components/ui/section'
import { PageHero } from '@/components/ui/page-hero'
import { useLang } from '@/components/providers/lang-provider'
import { categories, projects, type ProjectCategory } from '@/content/projects'
import { useScrollLock } from '@/lib/hooks/use-scroll-lock'

type Filter = ProjectCategory | 'todos'

export function ProjectsView() {
  const { t, pick } = useLang()
  const searchParams = useSearchParams()

  const [filter, setFilter] = useState<Filter>('todos')
  // A Home linka para ?projeto=slug, então o overlay já pode abrir montado.
  // O slug é validado aqui: um valor inventado na URL simplesmente não abre.
  const [openSlug, setOpenSlug] = useState<string | null>(() => {
    const requested = searchParams.get('projeto')
    return projects.some((project) => project.slug === requested) ? requested : null
  })

  const visible = useMemo(
    () =>
      filter === 'todos'
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  )

  const openProject = openSlug
    ? (projects.find((project) => project.slug === openSlug) ?? null)
    : null

  /**
   * Sincroniza a URL sem passar pelo router: uma navegação do Next remontaria a
   * página e descartaria o filtro atual, além de cancelar a animação de morph.
   */
  const syncUrl = useCallback((slug: string | null) => {
    const url = new URL(window.location.href)
    if (slug) url.searchParams.set('projeto', slug)
    else url.searchParams.delete('projeto')
    window.history.replaceState(null, '', url)
  }, [])

  const open = useCallback(
    (slug: string) => {
      setOpenSlug(slug)
      syncUrl(slug)
    },
    [syncUrl],
  )

  const close = useCallback(() => {
    setOpenSlug(null)
    syncUrl(null)
  }, [syncUrl])

  /**
   * Percorre a lista visível, dando a volta nas pontas.
   *
   * O próximo slug é calculado fora do updater de estado: `syncUrl` mexe no
   * history, e o Router do Next reage a isso com um setState próprio. Chamado
   * de dentro do updater, isso rodava durante o render desta árvore e o React
   * derrubava a página com "Cannot update a component while rendering a
   * different component".
   */
  const navigate = useCallback(
    (direction: -1 | 1) => {
      if (!openSlug) return

      const list = visible.length ? visible : projects
      const index = list.findIndex((project) => project.slug === openSlug)
      if (index === -1) return

      const next = list[(index + direction + list.length) % list.length].slug
      setOpenSlug(next)
      syncUrl(next)
    },
    [openSlug, visible, syncUrl],
  )

  // Um único dono do lock, num componente que não remonta ao trocar de projeto.
  useScrollLock(Boolean(openProject))

  const byCategory = (category: ProjectCategory) =>
    projects.filter((project) => project.category === category).length

  return (
    <>
      <PageHero
        label={t.projects.label}
        title={t.projects.title}
        intro={t.projects.intro}
        aside={<ProjectsHeroGrid onOpen={open} />}
        meta={[
          { key: t.projects.filterLabel, value: projects.length },
          { key: 'Webflow', value: byCategory('webflow') },
          { key: 'WordPress', value: byCategory('wordpress') },
          { key: pick(categories[3].label), value: byCategory('sistemas') },
        ]}
      />

      <Container className="pb-24">
        <Reveal
          delay={0.3}
          className="gb-rule flex flex-wrap items-center gap-x-2 gap-y-3 border-line pt-6"
        >
          <span className="gb-label me-2">{t.projects.filterLabel}</span>

          {categories.map((category) => {
            const active = filter === category.id
            const count =
              category.id === 'todos'
                ? projects.length
                : projects.filter((project) => project.category === category.id).length

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setFilter(category.id)}
                aria-pressed={active}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active ? 'text-bg' : 'text-muted hover:text-fg'
                }`}
              >
                <span className="relative z-10">
                  {pick(category.label)}
                  <span className="ms-1.5 tabular-nums opacity-60">{count}</span>
                </span>
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    transition={snappySpring}
                    className="absolute inset-0 rounded-full bg-fg"
                  />
                )}
              </button>
            )
          })}

          <span className="gb-label ms-auto tabular-nums">
            {t.projects.count(visible.length)}
          </span>
        </Reveal>

        {/* LayoutGroup mantém card e overlay no mesmo contexto de layout, que é
            o que permite o morph via layoutId compartilhado. */}
        <LayoutGroup>
          <motion.div
            layout
            className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                  onOpen={open}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <p className="mt-16 gb-lead text-muted">{t.projects.empty}</p>
          )}

          {/* Key estável: trocar de projeto troca o conteúdo, não remonta o
              painel. Remontar cancelava a animação e refazia os efeitos. */}
          <AnimatePresence>
            {openProject && (
              <ProjectOverlay
                key="project-overlay"
                project={openProject}
                onClose={close}
                onNavigate={navigate}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </Container>
    </>
  )
}
