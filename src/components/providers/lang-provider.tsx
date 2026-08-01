'use client'

import { useRouter } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useTransition,
  type ReactNode,
} from 'react'

import { getDictionary, type Dictionary } from '@/content/i18n'
import type { Lang, Localized } from '@/content/types'
import { LANG_COOKIE, LANG_COOKIE_MAX_AGE } from '@/lib/lang'

type LangContextValue = {
  lang: Lang
  t: Dictionary
  /** Atalho para ler campos .pt/.en do conteúdo. */
  pick: (value: Localized) => string
  toggle: () => void
  /** Verdadeiro enquanto o servidor re-renderiza no novo idioma. */
  switching: boolean
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({
  lang,
  children,
}: {
  lang: Lang
  children: ReactNode
}) {
  const router = useRouter()
  const [switching, startTransition] = useTransition()

  const toggle = useCallback(() => {
    const next: Lang = lang === 'pt' ? 'en' : 'pt'
    // O idioma é lido no servidor (resolveLang), então gravamos o cookie e
    // pedimos um refresh em vez de trocar strings só no cliente.
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`
    startTransition(() => router.refresh())
  }, [lang, router])

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      t: getDictionary(lang),
      pick: (localized: Localized) => localized[lang],
      toggle,
      switching,
    }),
    [lang, toggle, switching],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const context = useContext(LangContext)
  if (!context) throw new Error('useLang precisa estar dentro de <LangProvider>')
  return context
}
