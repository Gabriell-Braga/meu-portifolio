'use client'

import Link from 'next/link'

import { routes } from '@/components/layout/header'
import { Wordmark } from '@/components/layout/wordmark'
import { Magnetic } from '@/components/motion/magnetic'
import { useLang } from '@/components/providers/lang-provider'
import { profile } from '@/content/profile'

export function Footer() {
  const { t, pick } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="gb-rule mt-32 border-line">
      <div className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href="/" className="gb-face text-2xl leading-none sm:text-3xl">
              <Wordmark />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted">
              {pick(profile.role)} · {pick(profile.location)}
            </p>
          </div>

          <nav className="flex flex-col gap-2" aria-label={t.nav.menu}>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="gb-label w-fit transition-colors hover:text-accent"
              >
                {t.nav[route.key]}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <Magnetic strength={0.2} className="w-fit">
              <a
                href={`mailto:${profile.email}`}
                className="text-sm transition-colors hover:text-accent"
              >
                {profile.email}
              </a>
            </Magnetic>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="gb-label w-fit transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="gb-label w-fit transition-colors hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="gb-rule mt-12 flex flex-col gap-2 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="gb-label">
            © {year} {profile.name}. {t.footer.rights}
          </p>
          <p className="gb-label">{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  )
}
