'use client'

import { useSyncExternalStore } from 'react'

import { useLang } from '@/components/providers/lang-provider'
import { profile } from '@/content/profile'

/**
 * O relógio é estado externo (o tempo), então vem de useSyncExternalStore: o
 * snapshot é o minuto corrente, estável entre renders dentro do mesmo minuto.
 * No servidor devolve null — renderizar a hora lá divergiria na hidratação.
 */
const subscribe = (onChange: () => void) => {
  const interval = setInterval(onChange, 15_000)
  return () => clearInterval(interval)
}

const currentMinute = () => Math.floor(Date.now() / 60_000)

export function LocalTime() {
  const { lang, t } = useLang()
  const minute = useSyncExternalStore(
    subscribe,
    currentMinute,
    () => null as number | null,
  )

  const time =
    minute === null
      ? '--:--'
      : new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: profile.timezone,
        }).format(new Date(minute * 60_000))

  return (
    <p className="gb-label">
      {t.contact.localTime} · <span className="tabular-nums text-fg">{time}</span> ·
      Belo Horizonte
    </p>
  )
}
