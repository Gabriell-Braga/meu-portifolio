import type { Metadata } from 'next'

import { ExperienceView } from '@/components/experience/experience-view'
import { getDictionary } from '@/content/i18n'
import { resolveLang } from '@/lib/lang.server'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await resolveLang()
  const t = getDictionary(lang)

  return { title: t.experience.title, description: t.experience.intro }
}

export default function ExperienciaPage() {
  return <ExperienceView />
}
