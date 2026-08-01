import { cookies } from 'next/headers'

import { isLang, type Lang } from '@/content/types'
import { LANG_COOKIE } from './lang'

/**
 * Resolve o idioma no servidor para que o HTML já chegue traduzido — resolver
 * isso no cliente faria o texto piscar no idioma errado a cada visita.
 *
 * O inglês é o padrão do site, e não o `Accept-Language` do navegador: o
 * portfólio se dirige primeiro a quem recruta lá fora. O português entra
 * quando o visitante troca, e a escolha fica salva no cookie.
 */
export async function resolveLang(): Promise<Lang> {
  const cookieStore = await cookies()
  const saved = cookieStore.get(LANG_COOKIE)?.value

  return isLang(saved) ? saved : 'en'
}
