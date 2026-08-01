'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'

import { EASE_OUT_EXPO, snappySpring } from '@/components/motion/transitions'
import { LangToggle } from '@/components/layout/lang-toggle'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Wordmark } from '@/components/layout/wordmark'
import { useLang } from '@/components/providers/lang-provider'
import { profile } from '@/content/profile'

export const routes = [
  { href: '/', key: 'home' },
  { href: '/projetos', key: 'projects' },
  { href: '/experiencia', key: 'experience' },
  { href: '/contato', key: 'contact' },
] as const

export function Header() {
  const pathname = usePathname()
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 24))

  // Ajuste de estado durante o render (e não num efeito): assim que a rota
  // muda, o menu já é descartado no mesmo passe, sem render intermediário
  // mostrando o menu aberto sobre a página nova.
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          scrolled
            ? 'border-b border-line bg-bg/80 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-5 sm:h-20 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="gb-face shrink-0 text-base leading-none tracking-tight transition-colors hover:text-accent sm:text-lg"
            aria-label={profile.name}
          >
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label={t.nav.menu}>
            {routes.map((route) => {
              const active = pathname === route.href
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  aria-current={active ? 'page' : undefined}
                  className={`gb-label relative px-3.5 py-2 transition-colors ${
                    active ? 'text-bg' : 'text-muted hover:text-fg'
                  }`}
                >
                  <span className="relative z-10">{t.nav[route.key]}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={snappySpring}
                      className="absolute inset-0 rounded-full bg-fg"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? t.nav.close : t.nav.menu}
              className="grid size-9 place-items-center rounded-full border border-line md:hidden"
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  className="absolute inset-x-0 top-0 h-px bg-fg"
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={snappySpring}
                />
                <motion.span
                  className="absolute inset-x-0 bottom-0 h-px bg-fg"
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={snappySpring}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-30 flex flex-col justify-center bg-bg px-5 md:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label={t.nav.menu}>
              {routes.map((route, index) => (
                <motion.div
                  key={route.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.12 + index * 0.07,
                    duration: 0.7,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <Link
                    href={route.href}
                    className={`gb-face block gb-title transition-colors ${
                      pathname === route.href ? 'text-accent' : 'text-fg'
                    }`}
                  >
                    {t.nav[route.key]}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.a
              href={`mailto:${profile.email}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-12 font-mono text-sm text-muted"
            >
              {profile.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
