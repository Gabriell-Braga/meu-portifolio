import Link from 'next/link'

import { Container } from '@/components/ui/section'
import { getDictionary } from '@/content/i18n'
import { resolveLang } from '@/lib/lang.server'

export default async function NotFound() {
  const lang = await resolveLang()
  const t = getDictionary(lang)

  return (
    <Container className="flex min-h-[60svh] flex-col justify-center py-24">
      <p className="gb-face gb-display text-accent">404</p>
      <h1 className="gb-face mt-6 gb-heading">{t.notFound.title}</h1>
      <p className="mt-4 max-w-md gb-lead text-muted">{t.notFound.description}</p>
      <Link
        href="/"
        className="gb-label mt-10 w-fit rounded-full border border-line px-5 py-3 transition-colors hover:border-accent hover:text-accent"
      >
        ← {t.notFound.back}
      </Link>
    </Container>
  )
}
