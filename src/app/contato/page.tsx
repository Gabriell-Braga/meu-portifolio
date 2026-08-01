import type { Metadata } from 'next'

import { ContactView } from '@/components/contact/contact-view'
import { getDictionary } from '@/content/i18n'
import { resolveLang } from '@/lib/lang.server'

export async function generateMetadata(): Promise<Metadata> {
  const lang = await resolveLang()
  const t = getDictionary(lang)

  return { title: t.contact.label, description: t.contact.intro }
}

export default function ContatoPage() {
  return <ContactView />
}
