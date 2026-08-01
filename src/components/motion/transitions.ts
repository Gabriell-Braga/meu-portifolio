import type { Transition, Variants } from 'motion/react'

/**
 * Um único conjunto de curvas para o site inteiro. É o que faz as quatro
 * páginas parecerem a mesma peça, mesmo com animações diferentes.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export const softSpring: Transition = {
  type: 'spring',
  stiffness: 140,
  damping: 22,
  mass: 0.9,
}

export const snappySpring: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 32,
  mass: 0.6,
}

/** Usada em tudo que "revela" conteúdo ao entrar na viewport. */
export const revealTransition: Transition = {
  duration: 0.9,
  ease: EASE_OUT_EXPO,
}

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: revealTransition,
  },
}

/** `once` evita reanimar quando o usuário volta rolando para cima. */
export const viewportEarly = { once: true, margin: '0px 0px -12% 0px' } as const
