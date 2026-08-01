import { profile } from '@/content/profile'
import type { Lang } from '@/content/types'
import { siteUrl } from '@/lib/site'

/**
 * Dados estruturados schema.org/Person. Ajuda buscadores a ligar o site ao
 * perfil profissional em vez de tratá-lo como uma página solta.
 */
export function PersonSchema({ lang }: { lang: Lang }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    telephone: `+${profile.phoneRaw}`,
    jobTitle: profile.role[lang],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Belo Horizonte',
      addressRegion: 'MG',
      addressCountry: 'BR',
    },
    sameAs: [profile.linkedin, profile.github],
    // Sem `worksFor`: não há vínculo atual a declarar.
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Universidade Federal de Uberlândia',
    },
    knowsAbout: [
      'Angular',
      'TypeScript',
      'Next.js',
      'React',
      'WordPress',
      'Symfony',
      'Technical SEO',
      'Web Performance',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
