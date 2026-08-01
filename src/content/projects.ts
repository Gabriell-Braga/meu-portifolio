import generated from './projects.generated.json'
import type { Localized } from './types'

export type ProjectCategory = 'webflow' | 'wordpress' | 'sistemas' | 'academico'

export type ProjectImage = { src: string; width: number; height: number }

export type Project = {
  slug: string
  title: string
  client: string | null
  category: ProjectCategory
  /** Uma linha para o card. */
  summary: Localized
  /** Texto completo, vindo do Notion, para o overlay. */
  description: Localized
  stack: string[]
  url: string | null
  images: ProjectImage[]
  /** Ocupa duas colunas na grade. */
  featured: boolean
}

export const categories: { id: ProjectCategory | 'todos'; label: Localized }[] = [
  { id: 'todos', label: { pt: 'Todos', en: 'All' } },
  { id: 'webflow', label: { pt: 'Webflow', en: 'Webflow' } },
  { id: 'wordpress', label: { pt: 'WordPress', en: 'WordPress' } },
  { id: 'sistemas', label: { pt: 'Sistemas', en: 'Systems' } },
  { id: 'academico', label: { pt: 'Acadêmico', en: 'Academic' } },
]

/** As tags do Notion vêm abreviadas; aqui viram nomes apresentáveis. */
const STACK_LABELS: Record<string, string> = {
  JS: 'JavaScript',
  TS: 'TypeScript',
  CSS: 'CSS',
  HTML: 'HTML',
  PHP: 'PHP',
  API: 'APIs REST',
  Wordpress: 'WordPress',
  WooCommerce: 'WooCommerce',
  CodeIgniter: 'CodeIgniter',
  PerfexCRM: 'PerfexCRM',
  Symfony: 'Symfony',
  Angular: 'Angular',
  Webflow: 'Webflow',
  Firebase: 'Firebase',
  'Landing Page': 'Landing Page',
}

type Curated = {
  title: string
  client: string | null
  category: ProjectCategory
  summary: Localized
  descriptionEn: string
  featured?: boolean
}

/**
 * Metadados escritos à mão sobre o que o Notion exporta: títulos curtos,
 * resumo de uma linha e a tradução da descrição. O restante (imagens, tags,
 * link, descrição PT) vem de projects.generated.json via scripts/sync-notion.mjs.
 */
const CURATED: Record<string, Curated> = {
  'unidas-seminovos-pesados': {
    title: 'Unidas Seminovos Pesados',
    client: 'Unidas',
    category: 'webflow',
    featured: true,
    summary: {
      pt: 'Vitrine de veículos pesados seminovos construída em Webflow, focada em busca orgânica.',
      en: 'Heavy-duty used vehicle showcase built in Webflow, tuned for organic search.',
    },
    descriptionEn:
      'I built the Unidas Seminovos Pesados website in Webflow, delivering a functional and intuitive site. Unidas Seminovos Pesados specialises in vehicle sales, offering a wide range of high-quality, high-performance vehicles. The site was designed for an efficient, pleasant user experience with easy navigation. The project combined web development, interface design and search engine optimisation (SEO) into a complete solution for the company’s commercial needs.',
  },
  'unidas-corporativo': {
    title: 'Unidas Corporativo',
    client: 'Unidas',
    category: 'webflow',
    summary: {
      pt: 'Landing page de aluguel corporativo de frotas, desenhada para captação de leads.',
      en: 'Corporate fleet rental landing page, designed for lead capture.',
    },
    descriptionEn:
      'I built the Unidas Corporativo landing page in Webflow, delivering a functional and intuitive site. Unidas Corporativo specialises in car rental, offering a wide range of high-quality, high-performance vehicles. The page was designed for an efficient, pleasant user experience with easy navigation. The project combined web development, interface design and search engine optimisation (SEO) into a complete solution for the company’s commercial needs.',
  },
  'unidas-empresas': {
    title: 'Unidas Empresas',
    client: 'Unidas',
    category: 'webflow',
    summary: {
      pt: 'Landing page B2B de locação de veículos, com jornada de conversão enxuta.',
      en: 'B2B vehicle rental landing page with a lean conversion journey.',
    },
    descriptionEn:
      'I built the Unidas Empresas landing page in Webflow, delivering a functional and intuitive site. Unidas Empresas specialises in car rental, offering a wide range of high-quality, high-performance vehicles. The page was designed for an efficient, pleasant user experience with easy navigation. The project combined web development, interface design and search engine optimisation (SEO) into a complete solution for the company’s commercial needs.',
  },
  'vem-ser-livre': {
    title: 'Vem Ser Livre',
    client: 'Unidas Livre',
    category: 'webflow',
    featured: true,
    summary: {
      pt: 'Site de carro por assinatura com calculadora de preços alimentada por dados em tempo real.',
      en: 'Car subscription site with a pricing calculator fed by real-time data.',
    },
    descriptionEn:
      'I built the Unidas Livre website in Webflow, delivering a functional and intuitive site. Unidas Livre specialises in car subscriptions, offering a wide range of high-quality, high-performance vehicles. The site was designed for an efficient, pleasant experience, with easy navigation, clear vehicle browsing, and a complex pricing calculator driven by real-time data that helps users understand how the subscription service works. The project combined web development, interface design and search engine optimisation (SEO) into a complete solution for the company’s commercial needs.',
  },
  'banco-inter-pagamentos': {
    title: 'Integração de Pagamentos Banco Inter',
    client: null,
    category: 'sistemas',
    featured: true,
    summary: {
      pt: 'Módulo de pagamentos do Banco Inter para PerfexCRM e WooCommerce, publicado no WordPress.org.',
      en: 'Banco Inter payment module for PerfexCRM and WooCommerce, published on WordPress.org.',
    },
    descriptionEn:
      'I developed a Banco Inter payment integration module for PerfexCRM using the CodeIgniter framework, and for the WooCommerce platform. The module allows Banco Inter payment features to be integrated seamlessly, enabling secure and efficient transactions. Inside PerfexCRM, users can manage payments directly in the system, improving financial and administrative efficiency. On WooCommerce, it brings Banco Inter payment options into the online store for a smoother checkout. The project drew on web development, PHP and API integration to produce a robust, versatile payment management solution for both platforms.',
  },
  'oticas-mayer': {
    title: 'Óticas Mayer',
    client: 'Óticas Mayer',
    category: 'wordpress',
    summary: {
      pt: 'Loja de óculos e acessórios ópticos em WordPress + WooCommerce.',
      en: 'Eyewear and optical accessories store on WordPress + WooCommerce.',
    },
    descriptionEn:
      'I built the Óticas Mayer website using WordPress and WooCommerce, delivering a functional and intuitive online store. Óticas Mayer specialises in eyewear and optical accessories, offering a broad range of high-quality products. The store was designed for an efficient, pleasant user experience, making navigation, product browsing and checkout straightforward. The project combined web development, interface design, e-commerce and search engine optimisation (SEO) into a complete commercial solution.',
  },
  'perfexcrm-financeiro': {
    title: 'Gestão Financeira PerfexCRM',
    client: null,
    category: 'sistemas',
    summary: {
      pt: 'Módulo de despesas, receitas, fluxo de caixa e relatórios dentro do PerfexCRM.',
      en: 'Expenses, revenue, cash flow and reporting module inside PerfexCRM.',
    },
    descriptionEn:
      'I developed a Financial Management module for PerfexCRM using the CodeIgniter framework. The module extends PerfexCRM with integrated, effective financial management: users can track expenses, revenue and cash flow, and generate detailed financial reports. The project drew on web development, PHP and API integration to produce a tool that simplifies financial control, surfaces useful insights and improves financial decision-making inside PerfexCRM.',
  },
  'bike-cia': {
    title: 'Bike & Cia',
    client: 'Bike & Cia',
    category: 'wordpress',
    summary: {
      pt: 'E-commerce de bicicletas e acessórios em WordPress + WooCommerce.',
      en: 'Bicycle and accessories e-commerce on WordPress + WooCommerce.',
    },
    descriptionEn:
      'I built the Bike & Cia website using WordPress and WooCommerce. Bike & Cia specialises in bicycles, and the site was designed to offer an efficient, pleasant user experience. The project combined web development, interface design, e-commerce and search engine optimisation (SEO) into a complete solution for the company’s commercial needs.',
  },
  imagear: {
    title: 'Imagear',
    client: 'Imagear',
    category: 'wordpress',
    summary: {
      pt: 'Loja de produtos fotográficos em WordPress + WooCommerce.',
      en: 'Photography equipment store on WordPress + WooCommerce.',
    },
    descriptionEn:
      'I built the Imagear website using WordPress and WooCommerce. Imagear specialises in photography products, and the site was designed to offer an efficient, pleasant user experience. The project combined web development, interface design, e-commerce and search engine optimisation (SEO) into a complete solution for the company’s commercial needs.',
  },
  'perfexcrm-ecommerce': {
    title: 'E-commerce PerfexCRM',
    client: null,
    category: 'sistemas',
    summary: {
      pt: 'Gestão de produtos, pedidos e clientes de lojas online direto no PerfexCRM.',
      en: 'Product, order and customer management for online stores inside PerfexCRM.',
    },
    descriptionEn:
      'I developed an E-commerce module for PerfexCRM using the CodeIgniter framework. The module expands PerfexCRM so online stores can be managed directly from the platform: products, orders and customers, all handled efficiently in one place. The project drew on web development, PHP, e-commerce and API integration to produce a robust solution that meaningfully improves the user experience and streamlines sales and customer service inside PerfexCRM.',
  },
  smel: {
    title: 'SMEL Esporte e Lazer',
    client: 'UFU',
    category: 'academico',
    summary: {
      pt: 'Site informativo da Secretaria Municipal de Esporte e Lazer, feito na UFU.',
      en: 'Informational site for the municipal Sports and Leisure Department, built at UFU.',
    },
    descriptionEn:
      'I built an informative, interactive website for the Municipal Department of Sport and Leisure (SMEL) as part of the Programming for the Internet 1 course. The project was a chance to bring the skills I had picked up at work and in technical training into an academic context at the Federal University of Uberlândia.',
  },
  'perfexcrm-nota-fiscal': {
    title: 'Nota Fiscal PerfexCRM',
    client: null,
    category: 'sistemas',
    summary: {
      pt: 'Emissão automatizada de notas fiscais eletrônicas integrada ao fluxo do CRM.',
      en: 'Automated electronic invoicing wired into the CRM workflow.',
    },
    descriptionEn:
      'I developed an Invoicing module for PerfexCRM using the CodeIgniter framework. The module automates the issuing of invoices and slots directly into the PerfexCRM workflow, making electronic invoices easy to generate and manage while staying compliant with current tax regulations. The project drew on advanced web development, PHP and API integration to produce a tool that streamlines administrative and accounting work with more speed and accuracy.',
  },
  'gestao-reunioes-salas': {
    title: 'Gestão de Reuniões e Salas',
    client: null,
    category: 'sistemas',
    featured: true,
    summary: {
      pt: 'Aplicação Angular + Symfony para agendamento de salas, horários e participantes.',
      en: 'Angular + Symfony app for booking rooms, schedules and attendees.',
    },
    descriptionEn:
      'I built a web application for meeting and room management, using Angular on the front end and Symfony PHP on the back end. The app makes organising and scheduling meetings straightforward, with efficient management of conference rooms, time slots and attendees. The Angular interface keeps the experience intuitive and responsive, while the Symfony back end handles secure, efficient database integration. The project drew on advanced web development, modern frameworks and usability practice to deliver a complete solution for corporate meeting and space management.',
  },
  cefalgi: {
    title: 'Cefalgi',
    client: 'Cefalgi',
    category: 'wordpress',
    summary: {
      pt: 'Landing page de clínica especializada em cefaleias, voltada à captação de leads.',
      en: 'Landing page for a headache treatment clinic, focused on lead capture.',
    },
    descriptionEn:
      'I built the Cefalgi landing page on WordPress, creating an attractive and functional interface to present the company. Cefalgi specialises in the treatment and management of headaches, providing services and relevant information to patients. The page was designed to make navigation and lead capture easy, with an efficient and pleasant user experience. The project combined web development, interface design and search engine optimisation (SEO) into a complete, effective solution for the company’s commercial needs.',
  },
  'instituto-mapinguari': {
    title: 'Instituto Mapinguari',
    client: 'Instituto Mapinguari',
    category: 'wordpress',
    summary: {
      pt: 'Blog de divulgação científica sobre preservação ambiental e cultural da Amazônia.',
      en: 'Science outreach blog on Amazon environmental and cultural preservation.',
    },
    descriptionEn:
      'I built the Instituto Mapinguari website on WordPress as an informative, interactive blog. Instituto Mapinguari is an organisation dedicated to research and science outreach, focused on the environmental and cultural preservation of the Amazon. The site was designed to make navigation easy, giving readers access to articles, news and events tied to the institute’s work. The project combined web development, interface design and search engine optimisation (SEO) into an efficient, attractive platform for promoting the institute’s initiatives.',
  },
  mednet: {
    title: 'MedNet',
    client: 'UFU',
    category: 'academico',
    summary: {
      pt: 'Dashboard hospitalar para prontuários, consultas, médicos e pacientes.',
      en: 'Hospital dashboard for records, appointments, doctors and patients.',
    },
    descriptionEn:
      'We built MedNet, a comprehensive hospital dashboard, as an academic project at the Federal University of Uberlândia (UFU). The system manages medical records, appointments, doctors, patients and hospitals, offering an integrated solution for hospital administration.',
  },
  'calculadora-financeira': {
    title: 'Calculadora Financeira',
    client: 'UFU',
    category: 'academico',
    summary: {
      pt: 'Calculadora interativa criada na disciplina de Matemática Financeira da UFU.',
      en: 'Interactive calculator built for the Financial Mathematics course at UFU.',
    },
    descriptionEn:
      'I built an interactive financial calculator for my Financial Mathematics course, supervised by Professor Mara Alves Soares at the Federal University of Uberlândia (UFU). The project was a chance to turn theory into a practical, genuinely useful tool.',
  },
  'optica-faltz': {
    title: 'Óptica Faltz',
    client: 'Óptica Faltz',
    category: 'wordpress',
    summary: {
      pt: 'Loja de óculos em WordPress + WooCommerce, com foco em navegação e SEO.',
      en: 'Eyewear store on WordPress + WooCommerce, focused on navigation and SEO.',
    },
    descriptionEn:
      'I built the Óptica Faltz website using WordPress and WooCommerce. Óptica Faltz specialises in eyewear, and the site was designed to offer an efficient, pleasant user experience. The project combined web development, interface design, e-commerce and search engine optimisation (SEO) into a complete solution for the company’s commercial needs.',
  },
}

export const projects: Project[] = generated.map((raw) => {
  const curated = CURATED[raw.slug]
  if (!curated) {
    throw new Error(
      `Projeto "${raw.slug}" existe no Notion mas não tem entrada em CURATED.`,
    )
  }

  return {
    slug: raw.slug,
    title: curated.title,
    client: curated.client,
    category: curated.category,
    summary: curated.summary,
    description: { pt: raw.description.pt, en: curated.descriptionEn },
    stack: raw.tags.map((tag) => STACK_LABELS[tag] ?? tag),
    url: raw.url,
    images: raw.images,
    featured: curated.featured ?? false,
  }
})


/** Usada na Home para mostrar só uma amostra. */
export const highlightedProjects = projects.filter((project) => project.featured)
