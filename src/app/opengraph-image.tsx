import { ImageResponse } from 'next/og'

import { profile } from '@/content/profile'
import { resolveLang } from '@/lib/lang.server'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${profile.name} — Frontend Developer`

/** Cartão de compartilhamento na mesma identidade galáxia do site. */
export default async function OpenGraphImage() {
  const lang = await resolveLang()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#05070f',
          color: '#e8ecf8',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -220,
            left: 380,
            width: 900,
            height: 700,
            background:
              'radial-gradient(closest-side, rgba(123,92,255,0.55), rgba(5,7,15,0))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -260,
            left: -180,
            width: 800,
            height: 640,
            background:
              'radial-gradient(closest-side, rgba(67,97,255,0.45), rgba(5,7,15,0))',
          }}
        />

        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, opacity: 0.7 }}>
          {lang === 'pt' ? 'PORTFÓLIO' : 'PORTFOLIO'}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 128,
              fontWeight: 900,
              letterSpacing: -4,
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 44,
              color: '#8a93ad',
            }}
          >
            {lang === 'pt' ? profile.role.pt : profile.role.en}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 26,
            color: '#8a93ad',
          }}
        >
          <span>Angular · TypeScript · Next.js · SEO</span>
          <span>{lang === 'pt' ? profile.location.pt : profile.location.en}</span>
        </div>
      </div>
    ),
    size,
  )
}
