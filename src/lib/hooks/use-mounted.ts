'use client'

import { useSyncExternalStore } from 'react'

/** Nunca há mudança a assinar: o valor só difere entre servidor e cliente. */
const subscribe = () => () => {}

/**
 * `false` no servidor, `true` depois da hidratação.
 *
 * Necessário antes de qualquer `createPortal`: o portal precisa de
 * `document.body`, que não existe durante o render no servidor.
 */
export const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
