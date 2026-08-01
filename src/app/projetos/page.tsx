import type { Metadata } from 'next'
import { Suspense } from 'react'

import { ProjectsView } from '@/components/projects/projects-view'
import { getDictionary } from '@/content/i18n'
import { resolveLang } from '@/lib/lang.server'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await resolveLang()
  const t = getDictionary(lang)

  return { title: t.projects.title, description: t.projects.intro }
}

export default function ProjetosPage() {
  // ProjectsView lê ?projeto=slug com useSearchParams, que exige um limite de
  // Suspense para não bloquear o pré-render da rota inteira.
  return (
    <Suspense fallback={null}>
      <ProjectsView />
    </Suspense>
  )
}
