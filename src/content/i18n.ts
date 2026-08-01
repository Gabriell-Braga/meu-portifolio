import type { Lang } from './types'

/**
 * Todas as strings de interface. O conteúdo (projetos, experiência) mora nos
 * arquivos próprios, já com os campos .pt/.en.
 */
const dictionary = {
  pt: {
    nav: {
      home: 'Início',
      projects: 'Projetos',
      experience: 'Experiência',
      contact: 'Contato',
      menu: 'Menu',
      close: 'Fechar',
    },
    a11y: {
      toggleTheme: 'Alternar entre tema claro e escuro',
      toggleLang: 'Mudar o idioma para inglês',
      skipToContent: 'Pular para o conteúdo',
      scrollDown: 'Role para continuar',
    },
    home: {
      availableFor: 'Disponível para novos projetos',
      basedIn: 'Belo Horizonte, Brasil',
      scroll: 'Role',
      aboutLabel: 'Sobre',
      statsLabel: 'Em números',
      skillsLabel: 'Habilidades',
      skillsTitle: 'O que eu uso\npara construir',
      servicesLabel: 'O que eu faço',
      servicesTitle: 'Quatro frentes\nque se apoiam',
      companiesLabel: 'Já passei por',
      selectedLabel: 'Selecionados',
      selectedTitle: 'Alguns trabalhos',
      seeAll: 'Ver todos os projetos',
      nextLabel: 'Continue',
    },
    projects: {
      label: 'Portfólio',
      title: 'Projetos',
      intro:
        'Uma seleção do que já entreguei: lojas online, sistemas internos, landing pages e ferramentas que nasceram na faculdade.',
      gridHint: 'Passe o mouse para ver, clique para abrir',
      filterLabel: 'Filtrar por',
      empty: 'Nenhum projeto nesta categoria.',
      count: (n: number) => `${n} ${n === 1 ? 'projeto' : 'projetos'}`,
      visit: 'Visitar site',
      noLink: 'Projeto interno, sem link público',
      gallery: 'Galeria',
      stack: 'Tecnologias',
      client: 'Cliente',
      close: 'Fechar projeto',
      open: 'Abrir projeto',
      previous: 'Projeto anterior',
      next: 'Próximo projeto',
    },
    experience: {
      label: 'Trajetória',
      title: 'Experiência',
      intro:
        'Seis anos passando por desenvolvimento fullstack, frontend em time internacional e performance web, até chegar a sênior.',
      yearsLabel: 'Anos de carreira',
      companiesLabel: 'Empresas',
      sinceLabel: 'Desde',
      current: 'Atual',
      educationLabel: 'Formação',
      skillsLabel: 'Habilidades adicionais',
      languagesLabel: 'Idiomas',
      downloadCv: 'Baixar currículo',
    },
    contact: {
      label: 'Contato',
      title: ['VAMOS', 'CONVERSAR'],
      intro:
        'Aberto a oportunidades como desenvolvedor frontend sênior, projetos freelance e trocas sobre performance web.',
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      whatsapp: 'WhatsApp',
      phone: 'Telefone',
      copy: 'Copiar email',
      copied: 'Copiado!',
      copyFailed: 'Não foi possível copiar',
      localTime: 'Horário local',
      availability: 'Respondo em até 24h',
      downloadCv: 'Baixar currículo (PDF)',
    },
    footer: {
      rights: 'Todos os direitos reservados.',
      builtWith: 'Feito com Next.js, Motion e Tailwind CSS.',
      backToTop: 'Voltar ao topo',
    },
    notFound: {
      title: 'Página não encontrada',
      description: 'O endereço que você acessou não existe.',
      back: 'Voltar para o início',
    },
  },
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close',
    },
    a11y: {
      toggleTheme: 'Toggle between light and dark theme',
      toggleLang: 'Change language to Portuguese',
      skipToContent: 'Skip to content',
      scrollDown: 'Scroll to continue',
    },
    home: {
      availableFor: 'Available for new projects',
      basedIn: 'Belo Horizonte, Brazil',
      scroll: 'Scroll',
      aboutLabel: 'About',
      statsLabel: 'By the numbers',
      skillsLabel: 'Skills',
      skillsTitle: 'What I build\nwith',
      servicesLabel: 'What I do',
      servicesTitle: 'Four fronts\nthat feed each other',
      companiesLabel: 'Places I have worked',
      selectedLabel: 'Selected',
      selectedTitle: 'Some of the work',
      seeAll: 'See all projects',
      nextLabel: 'Keep going',
    },
    projects: {
      label: 'Portfolio',
      title: 'Projects',
      intro:
        'A selection of what I have shipped: online stores, internal systems, landing pages and tools that started out as university work.',
      gridHint: 'Hover to preview, click to open',
      filterLabel: 'Filter by',
      empty: 'No projects in this category.',
      count: (n: number) => `${n} ${n === 1 ? 'project' : 'projects'}`,
      visit: 'Visit site',
      noLink: 'Internal project, no public link',
      gallery: 'Gallery',
      stack: 'Stack',
      client: 'Client',
      close: 'Close project',
      open: 'Open project',
      previous: 'Previous project',
      next: 'Next project',
    },
    experience: {
      label: 'Track record',
      title: 'Experience',
      intro:
        'Six years spent moving through fullstack development, frontend work on an international team and web performance, up to senior level.',
      yearsLabel: 'Years working',
      companiesLabel: 'Companies',
      sinceLabel: 'Since',
      current: 'Current',
      educationLabel: 'Education',
      skillsLabel: 'Additional skills',
      languagesLabel: 'Languages',
      downloadCv: 'Download résumé',
    },
    contact: {
      label: 'Contact',
      title: ['LET’S', 'TALK'],
      intro:
        'Open to senior frontend developer roles, freelance projects and conversations about web performance.',
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      whatsapp: 'WhatsApp',
      phone: 'Phone',
      copy: 'Copy email',
      copied: 'Copied!',
      copyFailed: 'Could not copy',
      localTime: 'Local time',
      availability: 'I reply within 24h',
      downloadCv: 'Download résumé (PDF)',
    },
    footer: {
      rights: 'All rights reserved.',
      builtWith: 'Built with Next.js, Motion and Tailwind CSS.',
      backToTop: 'Back to top',
    },
    notFound: {
      title: 'Page not found',
      description: 'The address you visited does not exist.',
      back: 'Back to home',
    },
  },
} as const

export type Dictionary = (typeof dictionary)['pt']

export const getDictionary = (lang: Lang): Dictionary =>
  dictionary[lang] as unknown as Dictionary

export const metadataByLang = {
  pt: {
    title: 'Gabriel Braga · Desenvolvedor Frontend Sênior',
    description:
      'Portfólio de Gabriel Braga, desenvolvedor frontend sênior em Belo Horizonte. Angular, TypeScript, Next.js, performance web e SEO técnico.',
  },
  en: {
    title: 'Gabriel Braga · Senior Frontend Developer',
    description:
      'Portfolio of Gabriel Braga, a senior frontend developer based in Belo Horizonte, Brazil. Angular, TypeScript, Next.js, web performance and technical SEO.',
  },
} as const
