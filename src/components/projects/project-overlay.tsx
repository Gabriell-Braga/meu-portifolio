'use client'

import Image from 'next/image'
import { motion, type Variants } from 'motion/react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import {
  EASE_OUT_EXPO,
  fadeUpVariants,
  softSpring,
} from '@/components/motion/transitions'
import { useLang } from '@/components/providers/lang-provider'
import type { Project } from '@/content/projects'
import { useMounted } from '@/lib/hooks/use-mounted'

/** A orquestração precisa morar numa variante do contêiner, não numa transition solta. */
const overlayStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
}

type ProjectOverlayProps = {
  project: Project
  onClose: () => void
  onNavigate: (direction: -1 | 1) => void
}

/**
 * Detalhe do projeto em tela cheia. Renderizado num portal para o body: o
 * template de página aplica um transform durante a transição de rota, e um
 * ancestral transformado quebraria o `position: fixed` deste painel.
 */
export function ProjectOverlay({ project, onClose, onNavigate }: ProjectOverlayProps) {
  const { t, pick } = useLang()
  const mounted = useMounted()
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  // O painel não remonta ao navegar entre projetos, então o scroll ficaria
  // onde estava, abrindo o próximo projeto no meio da galeria anterior.
  useEffect(() => {
    dialogRef.current?.scrollTo({ top: 0 })
  }, [project.slug])

  /**
   * Foco: só na abertura e no fechamento. Ficava junto do listener de teclado,
   * mas aquele efeito depende de `onNavigate`, que muda a cada projeto — o
   * foco então voltava para o botão fechar a cada seta, e o "elemento de
   * origem" era recapturado como sendo o próprio painel.
   *
   * O lock de scroll fica em ProjectsView, pelo mesmo motivo de estabilidade.
   */
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    return () => previouslyFocused?.focus?.()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key === 'ArrowLeft') {
        onNavigate(-1)
        return
      }
      if (event.key === 'ArrowRight') {
        onNavigate(1)
        return
      }
      if (event.key !== 'Tab') return

      // Prende o foco: sem isto, tabular sai para a página atrás do painel.
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        // O backdrop é um button com tabindex -1 e não deve entrar no ciclo.
        'a[href], button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables?.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, onNavigate])

  const content = (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-90 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.button
        type="button"
        aria-hidden
        tabIndex={-1}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // Saída curta e explícita: pela transição padrão do MotionConfig o
        // fundo borrado levava 0,7s para sumir depois de fechar.
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 -z-10 cursor-default bg-overlay backdrop-blur-xl"
      />

      {/* pb reserva a faixa ocupada pela barra fixa de ações. */}
      <div
        className="mx-auto max-w-5xl px-4 pt-6 pb-32 sm:px-8 sm:pt-12 sm:pb-36"
      >
        <motion.div
          layoutId={`card-${project.slug}`}
          transition={softSpring}
          className="overflow-hidden rounded-3xl border border-line bg-bg"
        >
          <motion.div
            layoutId={`cover-${project.slug}`}
            className="relative aspect-video overflow-hidden bg-bg-soft"
          >
            <Image
              src={project.images[0].src}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="object-cover object-top"
              priority
            />
          </motion.div>

          {/* A key aqui (e não no painel) faz o conteúdo reanimar a cada troca
              de projeto, sem remontar o modal em volta. */}
          <motion.div
            key={project.slug}
            initial="hidden"
            animate="visible"
            variants={overlayStagger}
            className="p-6 sm:p-10"
          >
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-start justify-between gap-4"
            >
              <div>
                <h2 className="gb-face gb-heading">{project.title}</h2>
                {project.client && (
                  <p className="gb-label mt-2">
                    {t.projects.client}: {project.client}
                  </p>
                )}
              </div>

              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="gb-label group flex items-center gap-2 rounded-full border border-line px-4 py-2.5 transition-colors hover:border-accent hover:text-accent"
                >
                  {t.projects.visit}
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              ) : (
                <span className="gb-label rounded-full border border-line px-4 py-2.5">
                  {t.projects.noLink}
                </span>
              )}
            </motion.div>

            <motion.p
              variants={fadeUpVariants}
              className="mt-8 max-w-3xl gb-lead text-muted text-pretty"
            >
              {pick(project.description)}
            </motion.p>

            <motion.div variants={fadeUpVariants} className="mt-8">
              <h3 className="gb-label">{t.projects.stack}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-line px-3.5 py-1.5 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {project.images.length > 1 && (
              <motion.div variants={fadeUpVariants} className="mt-12">
                <h3 className="gb-label">
                  {t.projects.gallery} · {project.images.length}
                </h3>
                <div className="mt-4 flex flex-col gap-4">
                  {project.images.slice(1).map((image, index) => (
                    <motion.div
                      key={image.src}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden rounded-xl border border-line bg-bg-soft"
                    >
                      <Image
                        src={image.src}
                        alt={`${project.title} — ${index + 2}`}
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 1024px) 64rem, 100vw"
                        loading="lazy"
                        className="h-auto w-full"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

      </div>

      {/*
        Barra de ação fixa na viewport, e não sticky dentro do painel: como
        sticky, ela ficava rente à borda e o véu que a separava do conteúdo
        virava uma faixa escura no fim do scroll. Aqui os próprios botões
        carregam fundo e blur, e o espaço no fim do painel (pb-32) garante que
        o último conteúdo não pare embaixo deles.
      */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        // Sai mais rápido que o morph do card: sem `exit` próprio, a barra
        // continuava opaca sobre a página até o AnimatePresence desmontar o
        // overlay inteiro, e ficava flutuando depois do modal já ter fechado.
        exit={{ opacity: 0, y: 12, transition: { duration: 0.18 } }}
        transition={{ duration: 0.35, ease: EASE_OUT_EXPO, delay: 0.1 }}
        className="pointer-events-none fixed inset-x-0 bottom-0 z-10 flex justify-center px-4 pb-6 sm:px-8 sm:pb-8"
      >
        <div className="pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-3">
          <div className="flex gap-2">
            <OverlayButton label={t.projects.previous} onClick={() => onNavigate(-1)}>
              ←
            </OverlayButton>
            <OverlayButton label={t.projects.next} onClick={() => onNavigate(1)}>
              →
            </OverlayButton>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="gb-label rounded-full border border-line bg-bg/90 px-5 py-3 backdrop-blur-xl transition-colors hover:border-accent hover:text-accent"
          >
            {t.projects.close} · Esc
          </button>
        </div>
      </motion.div>
    </div>
  )

  // Abrir a página direto em ?projeto=slug renderiza este componente no
  // servidor, onde `document` não existe e o createPortal quebra.
  if (!mounted) return null

  return createPortal(content, document.body)
}

function OverlayButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-line bg-bg/90 backdrop-blur-xl transition-colors hover:border-accent hover:text-accent"
    >
      <span aria-hidden>{children}</span>
    </button>
  )
}
