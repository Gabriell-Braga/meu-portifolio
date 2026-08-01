'use client'

import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

type Star = {
  x: number
  y: number
  radius: number
  alpha: number
  /** Deriva lenta, em px por segundo. */
  vx: number
  vy: number
  /** Camada de profundidade: quanto maior, mais a estrela reage ao ponteiro. */
  depth: number
}

const DENSITY = 1 / 14000 // estrelas por pixel de viewport
const MAX_STARS = 160
const POINTER_RADIUS = 220

/**
 * Campo de estrelas fixo atrás de todo o conteúdo. Desenha em canvas em vez de
 * DOM porque são ~150 pontos animados por quadro; e para de desenhar quando a
 * aba está oculta ou quando o usuário pediu menos movimento.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    let stars: Star[] = []
    let frame = 0
    let lastTime = performance.now()
    let width = 0
    let height = 0
    // Fora da tela até o primeiro movimento, para não iluminar o canto 0,0.
    const pointer = { x: -9999, y: -9999 }

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement)
      return {
        star: styles.getPropertyValue('--star').trim() || '#ffffff',
        opacity: Number(styles.getPropertyValue('--star-opacity')) || 0.6,
        accent: styles.getPropertyValue('--accent').trim() || '#4361ff',
      }
    }

    let colors = readColors()

    const seed = () => {
      const count = Math.min(MAX_STARS, Math.round(width * height * DENSITY))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.3 + 0.4,
        alpha: Math.random() * 0.6 + 0.25,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        depth: Math.random() * 0.8 + 0.2,
      }))
    }

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      seed()
    }

    const draw = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time

      context.clearRect(0, 0, width, height)

      for (const star of stars) {
        star.x += star.vx * delta
        star.y += star.vy * delta

        // Reentra pelo lado oposto ao sair da tela.
        if (star.x < 0) star.x = width
        if (star.x > width) star.x = 0
        if (star.y < 0) star.y = height
        if (star.y > height) star.y = 0

        const dx = star.x - pointer.x
        const dy = star.y - pointer.y
        const distance = Math.hypot(dx, dy)
        const near = distance < POINTER_RADIUS ? 1 - distance / POINTER_RADIUS : 0

        // Perto do ponteiro a estrela cresce, acende e muda para a cor de destaque.
        const radius = star.radius * (1 + near * 1.8 * star.depth)
        const alpha = Math.min(1, star.alpha * colors.opacity + near * 0.9)

        context.beginPath()
        context.arc(star.x, star.y, radius, 0, Math.PI * 2)
        context.fillStyle = near > 0.15 ? colors.accent : colors.star
        context.globalAlpha = alpha
        context.fill()
      }

      context.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    const onPointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const onVisibilityChange = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden) {
        lastTime = performance.now()
        frame = requestAnimationFrame(draw)
      }
    }

    // O tema troca as cores por CSS custom property; o canvas precisa relê-las.
    const themeObserver = new MutationObserver(() => {
      colors = readColors()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    resize()
    frame = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelAnimationFrame(frame)
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [reduceMotion])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* Nebulosa estática: dá profundidade mesmo sem o canvas rodando. */}
      <div className="absolute inset-0 bg-bg" />
      {/* A opacidade vem do tema (--nebula-opacity): o valor calibrado no
          escuro fica lavado no claro. */}
      <div
        className="absolute -top-1/4 left-1/2 h-[70vh] w-[110vw] -translate-x-1/2 blur-3xl"
        style={{
          opacity: 'var(--nebula-opacity)',
          background:
            'radial-gradient(closest-side, var(--nebula), transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-1/3 left-0 h-[60vh] w-[80vw] blur-3xl"
        style={{
          opacity: 'calc(var(--nebula-opacity) * 0.8)',
          background:
            'radial-gradient(closest-side, var(--accent), transparent 70%)',
        }}
      />
      {!reduceMotion && (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      )}
    </div>
  )
}
