'use client'

import { motion, type HTMLMotionProps, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

import { fadeUpVariants, revealTransition, viewportEarly } from './transitions'

/**
 * O atraso entra pela variante (via `custom`) em vez de pela prop `transition`:
 * passar `transition={{ delay }}` substituiria duration e ease da variante.
 */
const delayedFadeUp: Variants = {
  hidden: fadeUpVariants.hidden,
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...revealTransition, delay },
  }),
}

type RevealProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'footer'
}

/**
 * Revelação padrão ao entrar na viewport: sobe, aparece e sai do desfoque.
 * É o wrapper genérico — para texto grande use <RevealText>.
 */
export function Reveal({ children, delay = 0, as = 'div', ...rest }: RevealProps) {
  // Os elementos aceitos aqui compartilham as mesmas props; o cast evita
  // reescrever a assinatura para cada tag.
  const Component = motion[as] as typeof motion.div

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewportEarly}
      variants={delayedFadeUp}
      custom={delay}
      {...rest}
    >
      {children}
    </Component>
  )
}

/**
 * Orquestra os filhos em cascata. `staggerChildren` precisa morar na transition
 * de uma variante do próprio contêiner — daí o `variants` vazio abaixo, que
 * existe só para carregar a orquestração.
 *
 * Os filhos devem usar <RevealItem> (ou `variants={fadeUpVariants}`) e não
 * declarar `initial`/`whileInView` próprios.
 */
export function RevealGroup({
  children,
  amount = 0.06,
  delay = 0,
  ...rest
}: Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode
  amount?: number
  delay?: number
}) {
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: amount, delayChildren: delay } },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportEarly}
      variants={container}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  ...rest
}: Omit<HTMLMotionProps<'div'>, 'children'> & { children: ReactNode }) {
  return (
    <motion.div variants={fadeUpVariants} {...rest}>
      {children}
    </motion.div>
  )
}
