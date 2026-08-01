'use client'

import { useEffect } from 'react'

/**
 * Trava o scroll da página enquanto `active` for verdadeiro.
 *
 * Precisa viver num componente que não remonta. Quando cada painel cuidava do
 * próprio lock, trocar de projeto remontava o overlay: o novo salvava
 * `overflow: hidden` como "valor anterior" antes de o antigo restaurar, e ao
 * fechar a página ficava travada para sempre.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return

    const { body } = document
    const previous = body.style.overflow
    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = previous
    }
  }, [active])
}
