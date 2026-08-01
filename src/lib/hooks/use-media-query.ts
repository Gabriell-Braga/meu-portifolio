'use client'

import { useCallback, useSyncExternalStore } from 'react'

/**
 * `matchMedia` é estado externo ao React, então lemos por useSyncExternalStore
 * em vez de espelhar num useState — isso evita o render extra na montagem e
 * mantém servidor e cliente coerentes na hidratação.
 *
 * No servidor o valor é sempre `false`; quem usa isto deve degradar bem nesse
 * primeiro render.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Mouse/trackpad de verdade — nada de hover ou cursor customizado no toque. */
export const usePointerFine = () => useMediaQuery('(pointer: fine)')
