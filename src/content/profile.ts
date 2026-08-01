import type { Localized } from './types'

export const profile = {
  name: 'Gabriel Braga',
  /** Assinatura da marca no cabeçalho e no rodapé. */
  wordmark: 'GabrielBraga',
  role: {
    pt: 'Desenvolvedor Frontend Sênior',
    en: 'Senior Frontend Developer',
  } satisfies Localized,
  location: {
    pt: 'Belo Horizonte, Brasil',
    en: 'Belo Horizonte, Brazil',
  } satisfies Localized,
  timezone: 'America/Sao_Paulo',
  email: 'gabribragandrade@gmail.com',
  phone: '+55 (31) 97306-5499',
  phoneRaw: '5531973065499',
  linkedin: 'https://www.linkedin.com/in/gabriel-braga-642ba2182/',
  github: 'https://github.com/gabriell-braga',
  notion:
    'https://nonstop-limburger-da8.notion.site/Portf-lio-de-Desenvolvimento-Web-c117b9738bfc4087b6aeacfcc3c92612',
  cv: '/cv-gabriel-braga.pdf',
} as const

/**
 * Palavras gigantes do hero, quebradas em linhas de propósito. Duas linhas e
 * não três: no tamanho display, cada linha a mais empurra o resto da dobra
 * para fora da tela.
 */
export const heroLines: Record<'pt' | 'en', string[]> = {
  pt: ['FRONTEND', 'SÊNIOR'],
  en: ['SENIOR', 'FRONTEND'],
}

/**
 * O fecho vem separado do corpo porque vira link para a página de contato.
 * Ambos passam pela mesma revelação palavra a palavra na home.
 */
export const intro: { body: Localized; cta: Localized } = {
  body: {
    pt: 'Em seis anos passei por quase toda a superfície do desenvolvimento web: aplicações em Angular e Next.js, APIs em PHP, lojas em WordPress, sites em Webflow, performance e SEO. Vi cada camada o bastante para saber onde costuma quebrar, e é justamente problema novo que me anima. Se você tem um em mãos,',
    en: 'In six years I have covered most of web development: applications in Angular and Next.js, APIs in PHP, WordPress stores, Webflow sites, performance and SEO. I have seen enough of every layer to know where things break, and an unfamiliar problem is the part I enjoy most. If you have one,',
  },
  cta: {
    pt: 'me chama.',
    en: 'get in touch.',
  },
}

export const stats: { value: number; suffix: string; label: Localized }[] = [
  {
    value: 6,
    suffix: '+',
    label: { pt: 'anos de experiência', en: 'years of experience' },
  },
  {
    value: 20,
    suffix: '+',
    label: { pt: 'projetos entregues', en: 'projects delivered' },
  },
  {
    value: 10,
    suffix: '+',
    label: { pt: 'empresas atendidas', en: 'companies served' },
  },
]

/** Alimenta o marquee do hero. */
export const marqueeStack = [
  'Angular',
  'TypeScript',
  'Next.js',
  'React',
  'Tailwind CSS',
  'Node.js',
  'PHP',
  'Symfony',
  'CodeIgniter',
  'WordPress',
  'WooCommerce',
  'Webflow',
  'Technical SEO',
  'Lighthouse',
  'GTM',
  'MySQL',
]

/** Ficha rápida ao lado do título na home. */
export const heroFacts: { key: Localized; value: Localized }[] = [
  {
    key: { pt: 'Senioridade', en: 'Seniority' },
    value: {
      pt: 'Sênior, 6+ anos de carreira',
      en: 'Senior, 6+ years in the field',
    },
  },
  {
    key: { pt: 'Foco', en: 'Focus' },
    value: {
      pt: 'Angular, TypeScript e Next.js',
      en: 'Angular, TypeScript and Next.js',
    },
  },
  {
    key: { pt: 'Formação', en: 'Education' },
    value: {
      pt: 'Sistemas de Informação, UFU',
      en: 'Information Systems, UFU',
    },
  },
  {
    key: { pt: 'Idiomas', en: 'Languages' },
    value: {
      pt: 'Português e inglês',
      en: 'Portuguese and English',
    },
  },
]

/** As quatro frentes de trabalho, mostradas em cards na home. */
export const services: {
  id: string
  title: Localized
  description: Localized
  tools: string[]
}[] = [
  {
    id: 'interfaces',
    title: { pt: 'Interfaces de produto', en: 'Product interfaces' },
    description: {
      pt: 'Aplicações que crescem sem virar bagunça, com componentes reaproveitáveis e estado previsível.',
      en: 'Applications that grow without turning into a mess, with reusable components and predictable state.',
    },
    tools: ['Angular', 'React', 'Next.js', 'TypeScript'],
  },
  {
    id: 'performance',
    title: { pt: 'Performance web', en: 'Web performance' },
    description: {
      pt: 'Diagnóstico de carregamento, Core Web Vitals e as correções que aparecem no relatório do cliente.',
      en: 'Load diagnostics, Core Web Vitals and the fixes that actually show up in the client report.',
    },
    tools: ['Lighthouse', 'Core Web Vitals', 'GA4'],
  },
  {
    id: 'seo',
    title: { pt: 'SEO técnico', en: 'Technical SEO' },
    description: {
      pt: 'Estrutura, dados estruturados e rastreabilidade para o site ser encontrado por quem procura.',
      en: 'Structure, structured data and crawlability so the site gets found by the people looking for it.',
    },
    tools: ['Search Console', 'Schema.org', 'GTM'],
  },
  {
    id: 'sites',
    title: { pt: 'Sites e lojas', en: 'Sites and stores' },
    description: {
      pt: 'Do institucional ao e-commerce, incluindo tema e plugin sob medida quando o pronto não resolve.',
      en: 'From brochure sites to e-commerce, including custom themes and plugins when off the shelf will not do.',
    },
    tools: ['Webflow', 'WordPress', 'WooCommerce'],
  },
]

/**
 * A maioria dos itens é nome próprio e não se traduz; os que têm forma em
 * inglês vêm como par PT/EN e são resolvidos por `skillLabel`.
 */
export type SkillItem = string | Localized

export type SkillGroup = {
  id: string
  title: Localized
  items: SkillItem[]
}

export const skillLabel = (item: SkillItem, lang: 'pt' | 'en') =>
  typeof item === 'string' ? item : item[lang]

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: { pt: 'Frontend', en: 'Frontend' },
    items: [
      'Angular',
      'TypeScript',
      'JavaScript (ES6+)',
      'React',
      'Next.js',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Bootstrap',
    ],
  },
  {
    id: 'backend',
    title: { pt: 'Backend & APIs', en: 'Backend & APIs' },
    items: [
      'PHP',
      'Symfony',
      'CodeIgniter',
      'Laravel',
      'Node.js',
      { pt: 'APIs RESTful', en: 'RESTful APIs' },
      { pt: 'Autenticação', en: 'Authentication' },
      'MySQL',
    ],
  },
  {
    id: 'performance',
    title: { pt: 'SEO & Performance', en: 'SEO & Performance' },
    items: [
      { pt: 'SEO Técnico', en: 'Technical SEO' },
      'Lighthouse',
      'Core Web Vitals',
      { pt: 'Auditoria de performance', en: 'Performance auditing' },
      'Google Analytics',
      'Search Console',
      'Google Tag Manager',
      'PhoneTrack',
    ],
  },
  {
    id: 'cms',
    title: { pt: 'CMS & Plataformas', en: 'CMS & Platforms' },
    items: [
      'WordPress',
      'WooCommerce',
      'Elementor',
      'Webflow',
      'PerfexCRM',
      { pt: 'Temas e plugins sob medida', en: 'Custom themes and plugins' },
      'Git',
      'Figma',
      'cPanel',
    ],
  },
]
