import type { SkillItem } from './profile'
import type { Localized } from './types'

export type Job = {
  id: string
  company: string
  role: Localized
  location: Localized
  /** Mostrado no cabeçalho do card. */
  period: Localized
  /** Numeral gigante em marca d'água atrás do card. */
  year: string
  current: boolean
  highlights: Localized[]
  /** Nomes próprios ficam como string; o que tem forma em inglês vem como par. */
  stack: SkillItem[]
}

export const jobs: Job[] = [
  {
    id: 'unidas',
    company: 'Unidas',
    role: {
      pt: 'Analista de Performance Frontend',
      en: 'Frontend Performance Analyst',
    },
    location: { pt: 'Belo Horizonte · Remoto', en: 'Belo Horizonte · Remote' },
    period: { pt: 'Mai 2025 — Jul 2026', en: 'May 2025 — Jul 2026' },
    year: '2025',
    current: false,
    stack: ['Webflow', 'JavaScript', 'GTM', { pt: 'SEO Técnico', en: 'Technical SEO' }, 'Lighthouse', 'GA4'],
    highlights: [
      {
        pt: 'Melhorei performance e experiência do usuário com otimizações de frontend voltadas ao tráfego orgânico.',
        en: 'Improved website performance and user experience through targeted frontend optimizations focused on organic traffic.',
      },
      {
        pt: 'Elevei o SEO do site aplicando boas práticas e melhorias técnicas.',
        en: 'Enhanced SEO by implementing best practices and technical improvements.',
      },
      {
        pt: 'Gerenciei e implementei códigos de rastreamento, incluindo GTM, para monitorar e analisar campanhas de marketing.',
        en: 'Managed and implemented tracking codes, including GTM, to monitor and analyze marketing campaigns.',
      },
      {
        pt: 'Usei ferramentas de marketing para apoiar estratégias digitais e medir sua efetividade.',
        en: 'Used a range of marketing tools to support digital strategies and measure their effectiveness.',
      },
      {
        pt: 'Desenvolvi novos sites e landing pages em Webflow com foco em captação de leads.',
        en: 'Developed new Webflow websites and landing pages focused on lead capture.',
      },
    ],
  },
  {
    id: 'bluegravity',
    company: 'BlueGravity Studios',
    role: { pt: 'Desenvolvedor Frontend', en: 'Frontend Developer' },
    location: { pt: 'Reino Unido · Remoto', en: 'United Kingdom · Remote' },
    period: { pt: 'Mai 2024 — Mai 2025', en: 'May 2024 — May 2025' },
    year: '2024',
    current: false,
    stack: ['Angular', 'TypeScript', 'Tailwind CSS', 'RxJS', 'Git'],
    highlights: [
      {
        pt: 'Construí aplicações web responsivas e complexas dentro de um time internacional de alta performance.',
        en: 'Built responsive and complex web applications within a high-performing international team.',
      },
      {
        pt: 'Aprofundei o domínio de Angular, TypeScript e Tailwind CSS.',
        en: 'Sharpened my frontend skills with Angular, TypeScript and Tailwind CSS.',
      },
      {
        pt: 'Desenvolvi resolução criativa de problemas e pensamento de design centrado no usuário.',
        en: 'Grew creative problem-solving and user-centered design thinking.',
      },
      {
        pt: 'Entreguei soluções escaláveis com foco forte em performance e usabilidade.',
        en: 'Delivered scalable solutions with a strong focus on performance and usability.',
      },
      {
        pt: 'Atuei em ambiente remoto e acelerado, com colaboração entre áreas.',
        en: 'Thrived in a remote, fast-paced environment with cross-functional collaboration.',
      },
    ],
  },
  {
    id: 'venidici',
    company: 'Venidici',
    role: { pt: 'Desenvolvedor Web', en: 'Web Developer' },
    location: { pt: 'Uberlândia · Remoto', en: 'Uberlândia · Remote' },
    period: { pt: 'Out 2023 — Mai 2024', en: 'Oct 2023 — May 2024' },
    year: '2023',
    current: false,
    stack: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', { pt: 'SEO Técnico', en: 'Technical SEO' }],
    highlights: [
      {
        pt: 'Liderei o desenvolvimento ponta a ponta de e-commerces baseados em WordPress.',
        en: 'Led the end-to-end development of WordPress-based e-commerce platforms.',
      },
      {
        pt: 'Customizei temas, plugins e sistemas de entrega/pagamento conforme a necessidade de cada cliente.',
        en: 'Customized themes, plugins and delivery/payment systems to match client needs.',
      },
      {
        pt: 'Melhorei o posicionamento em buscadores com otimização de SEO e auditorias técnicas.',
        en: 'Boosted search engine rankings through SEO optimization and technical audits.',
      },
      {
        pt: 'Garanti boa experiência com interfaces rápidas, seguras e mobile-friendly.',
        en: 'Ensured excellent user experience with fast, secure and mobile-friendly interfaces.',
      },
      {
        pt: 'Aumentei visibilidade de produto e satisfação do cliente com decisões de UI/UX bem pensadas.',
        en: 'Significantly improved product visibility and customer satisfaction through smart UI/UX choices.',
      },
    ],
  },
  {
    id: 'diletec',
    company: 'Diletec',
    role: {
      pt: 'Desenvolvedor Web Fullstack',
      en: 'Fullstack Web Developer',
    },
    location: { pt: 'Belo Horizonte · Remoto', en: 'Belo Horizonte · Remote' },
    period: { pt: 'Mai 2021 — Mai 2024', en: 'May 2021 — May 2024' },
    year: '2021',
    current: false,
    stack: ['Symfony', 'CodeIgniter', 'PHP', 'Angular', 'MySQL', 'WordPress'],
    highlights: [
      {
        pt: 'Conduzi sozinho o desenvolvimento de módulos-chave de CRM e WordPress em Symfony, incluindo APIs de nota fiscal e PIX anônimo.',
        en: 'Led solo development of key CRM and WordPress modules using Symfony, including APIs for invoicing and anonymous PIX transactions.',
      },
      {
        pt: 'Apliquei técnicas de SEO e otimização de performance para melhorar visibilidade e velocidade dos sistemas.',
        en: 'Applied SEO techniques and performance optimization to improve system visibility and speed.',
      },
      {
        pt: 'Garanti a segurança das aplicações com fluxos de autenticação robustos e arquitetura de banco segura (MySQL).',
        en: 'Ensured application security with robust authentication flows and secure database architecture (MySQL).',
      },
      {
        pt: 'Criei interfaces responsivas em Angular e soluções customizadas em WordPress.',
        en: 'Created responsive interfaces using Angular and custom WordPress solutions.',
      },
      {
        pt: 'Entreguei sistemas escaláveis e prontos para produção, com código limpo e arquitetura sólida.',
        en: 'Delivered scalable, production-ready systems with clean code and strong architecture.',
      },
    ],
  },
]

export const education = {
  institution: {
    pt: 'Universidade Federal de Uberlândia',
    en: 'Federal University of Uberlândia',
  } satisfies Localized,
  degree: {
    pt: 'Bacharelado em Sistemas de Informação',
    en: 'Bachelor of Information Systems',
  } satisfies Localized,
  period: { pt: 'Concluído em Mai 2025', en: 'Completed May 2025' } satisfies Localized,
  location: { pt: 'Uberlândia, Brasil', en: 'Uberlândia, Brazil' } satisfies Localized,
}

export const languages: { name: Localized; level: Localized }[] = [
  {
    name: { pt: 'Português', en: 'Portuguese' },
    level: { pt: 'Nativo', en: 'Native' },
  },
  {
    name: { pt: 'Inglês', en: 'English' },
    level: { pt: 'Fluente', en: 'Fluent' },
  },
]
