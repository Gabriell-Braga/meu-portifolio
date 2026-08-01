'use client'

import { Marquee } from '@/components/motion/marquee'
import { marqueeStack } from '@/content/profile'

/** Faixa de tecnologias que acelera e inverte com o scroll. */
export function StackMarquee() {
  return (
    <div className="gb-rule border-y border-line py-5">
      <Marquee
        baseSpeed={35}
        items={marqueeStack.map((item) => (
          <span key={item} className="gb-face text-2xl whitespace-nowrap sm:text-3xl">
            {item}
          </span>
        ))}
      />
    </div>
  )
}
