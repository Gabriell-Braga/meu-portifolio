/**
 * URL pública do site. Vercel expõe o domínio em VERCEL_PROJECT_PRODUCTION_URL;
 * defina NEXT_PUBLIC_SITE_URL ao publicar em outro lugar.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '')

export const routePaths = ['/', '/projetos', '/experiencia', '/contato'] as const
