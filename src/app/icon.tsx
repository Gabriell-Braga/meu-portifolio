import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

/** Monograma sobre o gradiente galáxia, o mesmo do cabeçalho. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4361ff 0%, #7b5cff 100%)',
          color: '#ffffff',
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: -1,
          borderRadius: 7,
        }}
      >
        GB
      </div>
    ),
    size,
  )
}
