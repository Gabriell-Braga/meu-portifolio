'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

import { THEME_STORAGE_KEY, type Theme } from '@/lib/theme'

type ThemeContextValue = {
  theme: Theme
  /** Falso no servidor e no primeiro render, quando o tema real ainda é desconhecido. */
  ready: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/**
 * A fonte da verdade do tema é o atributo `data-theme` em <html>, escrito pelo
 * themeScript antes do primeiro paint. Em vez de copiá-lo para um useState,
 * assinamos o próprio DOM, para que script inicial e toggle convirjam para um
 * único valor.
 *
 * O site abre sempre no escuro; a preferência do sistema não é consultada.
 */
const listeners = new Set<() => void>()

const notify = () => listeners.forEach((listener) => listener())

const subscribe = (onChange: () => void) => {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

const readTheme = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'dark' as Theme)
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Modo privado / storage bloqueado: o tema ainda vale para esta sessão.
    }
    notify()
  }, [])

  const value = useMemo(() => ({ theme, ready, toggle }), [theme, ready, toggle])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme precisa estar dentro de <ThemeProvider>')
  return context
}
