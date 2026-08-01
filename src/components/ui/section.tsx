import type { ReactNode } from 'react'

/** Largura útil compartilhada por todas as páginas. */
export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Etiqueta em mono precedida de um traço — o marcador editorial que abre cada
 * seção do site.
 */
export function SectionLabel({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span className={`gb-label flex items-center gap-3 ${className}`}>
      <span aria-hidden className="h-px w-8 bg-accent" />
      {children}
    </span>
  )
}
