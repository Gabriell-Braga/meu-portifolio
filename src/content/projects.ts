import type { Localized } from './types'

export type ProjectCategory = 'webflow' | 'wordpress' | 'sistemas' | 'academico'

export type ProjectImage = { src: string; width: number; height: number }

export type Project = {
  slug: string
  title: string
  client: string | null
  category: ProjectCategory
  /** Ocupa duas colunas na grade e aparece na Home. */
  featured?: boolean
  url: string | null
  stack: string[]
  /** Uma linha para o card. */
  summary: Localized
  /**
   * Texto completo do overlay. Parágrafos separados por linha em branco; o
   * primeiro abre em destaque.
   */
  description: Localized
  /** A primeira imagem é a capa. Arquivos em public/projetos/<slug>/NN.webp. */
  images: ProjectImage[]
}

export const categories: { id: ProjectCategory | 'todos'; label: Localized }[] = [
  { id: 'todos', label: { pt: 'Todos', en: 'All' } },
  { id: 'webflow', label: { pt: 'Webflow', en: 'Webflow' } },
  { id: 'wordpress', label: { pt: 'WordPress', en: 'WordPress' } },
  { id: 'sistemas', label: { pt: 'Sistemas', en: 'Systems' } },
  { id: 'academico', label: { pt: 'Acadêmico', en: 'Academic' } },
]

/** Na ordem em que aparecem: o mais recente primeiro. */
export const projects: Project[] = [
  {
    slug: '99-web',
    title: '99 Web',
    client: null,
    category: 'sistemas',
    featured: true,
    url: 'https://99web.gabrielbraga.app',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Motion', 'MapLibre GL', 'OpenStreetMap', 'Nominatim', 'OSRM'],
    summary: {
      pt: 'Protótipo navegável que imagina os três serviços da 99 no navegador: corrida com o preço de cada categoria lado a lado, Food com carrinho sempre à vista e entrega de pacotes, com mapa, rotas e endereços reais.',
      en: 'Clickable prototype that imagines 99’s three services in the browser: rides with every category’s price side by side, Food with the cart always in view, and package delivery, with a real map, routes and addresses.',
    },
    description: {
      pt: [
        'Corrida, Food e Entrega da 99 no navegador. Protótipo navegável, com mapa, rotas e endereços reais, feito como estudo de conceito independente em 2026. Projeto solo: design de produto, UI e desenvolvimento front-end.',
        'Contexto: uso a 99 no dia a dia há bastante tempo, e boa parte do meu dia passa no computador. O endereço muitas vezes já está na tela, numa conversa, num e-mail ou numa planilha. Daí surgiu a pergunta: como seria ter a mesma experiência do app no navegador, na aba do lado, sem pegar o celular?',
        'Objetivo: levar Corrida, Food e Entrega para a web mantendo tudo o que o app já faz bem, para quem usa a 99 se sentir em casa, e aproveitar o que o computador oferece: tela maior, teclado e colar um endereço inteiro de uma vez.',
        'O que foi construído:\n• Corrida: busca de endereço com sugestões, rota real no mapa, balões de tempo e distância sobre o trajeto e todas as categorias (Pop, Moto, Pop Expresso, Negocia, Táxi) com preço e tempo lado a lado. No Negocia, a pessoa propõe o valor na mesma tela.\n• Food: início no formato do app, com ofertas UAU, banners, filtros e categorias. Página de loja com cardápio, adicionais, cupons e o carrinho fixo na coluna enquanto a pessoa compara lojas.\n• Entrega: coleta e destino com contato de quem envia e de quem recebe, pacote na moto (até 10 kg) ou no carro (até 30 kg) e preço calculado pela distância da rota.\n• Acompanhamento ao vivo: etapas do pedido, motorista e veículo, PIN da corrida e o carro andando pelo trajeto no mapa.',
        'Decisões de design:\n• O app como referência. Cada tela foi comparada com o app real: folha inferior que sobe sobre o mapa no celular, balões de tempo e distância, carros por perto vistos de cima, selo UAU e banners amarelos.\n• Desktop com layout próprio. Mapa e carrinho ficam fixos ao lado do conteúdo. No celular, a mesma tela vira uma folha deslizante sobre o mapa.\n• Estados completos. Carregamento, erro, endereço fora da área, nenhum motorista disponível, pedido abaixo do mínimo. Todo caminho tem saída.\n• Catálogo com identidade. Cada loja fictícia ganhou logo e capa próprias, para a lista parecer real.',
        'Técnico: Next.js 16 com App Router e TypeScript. Tailwind CSS v4 com tokens de cor da marca. Mapa em MapLibre GL com tiles do OpenStreetMap via OpenFreeMap, endereços pelo Nominatim e rotas pelo OSRM. Animações com Motion, respeitando prefers-reduced-motion. Fotos com licença livre, com créditos no rodapé do protótipo.',
        'Aviso: estudo de conceito independente, sem vínculo com a 99 ou com a DiDi. Nenhum pedido, corrida, entrega ou pagamento é real.',
      ].join('\n\n'),
      en: [
        '99 Rides, Food and Delivery in the browser. A clickable prototype with a real map, routes and addresses, built as an independent concept study in 2026. Solo project: product design, UI and front-end development.',
        'Context: I have used 99 day to day for a long time, and a good part of my day is spent at the computer. The address is often already on screen, in a chat, an email or a spreadsheet. That raised the question: what would the app experience look like in the browser, in the tab next door, without picking up the phone?',
        'Goal: bring Rides, Food and Delivery to the web while keeping everything the app already does well, so people who use 99 feel at home, and make the most of what a computer offers: a bigger screen, a keyboard and pasting a whole address at once.',
        'What was built:\n• Rides: address search with suggestions, a real route on the map, time and distance bubbles over the path, and every category (Pop, Moto, Pop Expresso, Negocia, Táxi) with price and time side by side. In Negocia, riders propose their own fare on the same screen.\n• Food: a home screen shaped like the app, with UAU deals, banners, filters and categories. A store page with the menu, add-ons, coupons and the cart pinned to the column while people compare stores.\n• Delivery: pickup and drop-off with sender and recipient contacts, packages by motorbike (up to 10 kg) or car (up to 30 kg), and a price based on the route distance.\n• Live tracking: order steps, driver and vehicle, the ride PIN and the car moving along the route on the map.',
        'Design decisions:\n• The app as the reference. Every screen was checked against the real app: the bottom sheet that slides over the map on mobile, time and distance bubbles, nearby cars seen from above, the UAU badge and yellow banners.\n• A desktop layout of its own. The map and cart stay pinned next to the content. On mobile, the same screen becomes a sheet sliding over the map.\n• Complete states. Loading, errors, addresses outside the service area, no drivers available, orders below the minimum. Every path has a way out.\n• A catalogue with identity. Each fictional store got its own logo and cover, so the list feels real.',
        'Technical: Next.js 16 with the App Router and TypeScript. Tailwind CSS v4 with brand colour tokens. The map runs on MapLibre GL with OpenStreetMap tiles via OpenFreeMap, addresses come from Nominatim and routes from OSRM. Animations use Motion and respect prefers-reduced-motion. Photos are freely licensed, with credits in the prototype footer.',
        'Disclaimer: independent concept study, not affiliated with 99 or DiDi. No order, ride, delivery or payment is real.',
      ].join('\n\n'),
    },
    images: [
      { src: '/projetos/99-web/01.webp', width: 1440, height: 900 },
      { src: '/projetos/99-web/02.webp', width: 1440, height: 900 },
      { src: '/projetos/99-web/03.webp', width: 1440, height: 900 },
      { src: '/projetos/99-web/04.webp', width: 1440, height: 900 },
      { src: '/projetos/99-web/05.webp', width: 1440, height: 900 },
    ],
  },
  {
    slug: 'unidas-seminovos-pesados',
    title: 'Unidas Seminovos Pesados',
    client: 'Unidas',
    category: 'webflow',
    featured: true,
    url: 'https://seminovospesados.unidas.com.br/',
    stack: ['JavaScript', 'CSS', 'HTML', 'Webflow'],
    summary: {
      pt: 'Vitrine de veículos pesados seminovos construída em Webflow, focada em busca orgânica.',
      en: 'Heavy-duty used vehicle showcase built in Webflow, tuned for organic search.',
    },
    description: {
      pt: 'Desenvolvi o site da Unidas Seminovos Pesados utilizando o Webflow, criando um site funcional e intuitivo. A Unidas Seminovos Pesados é uma empresa especializada na compra de carros, oferecendo uma ampla gama de veículos de alta qualidade e performance. O site foi projetado para proporcionar uma experiência de usuário eficiente e agradável, facilitando a navegação. Este projeto envolveu a aplicação de conhecimentos em desenvolvimento web, design de interface e otimização para mecanismos de busca (SEO), resultando em uma solução completa para atender às necessidades comerciais da Unidas Seminovos Pesados.',
      en: 'I built the Unidas Seminovos Pesados website in Webflow, delivering a functional and intuitive site. Unidas Seminovos Pesados specialises in vehicle sales, offering a wide range of high-quality, high-performance vehicles. The site was designed for an efficient, pleasant user experience with easy navigation. The project combined web development, interface design and search engine optimisation (SEO) into a complete solution for the company’s commercial needs.',
    },
    images: [
      { src: '/projetos/unidas-seminovos-pesados/01.webp', width: 1600, height: 900 },
      { src: '/projetos/unidas-seminovos-pesados/02.webp', width: 1600, height: 900 },
      { src: '/projetos/unidas-seminovos-pesados/03.webp', width: 1600, height: 900 },
    ],
  },
  {
    slug: 'unidas-corporativo',
    title: 'Unidas Corporativo',
    client: 'Unidas',
    category: 'webflow',
    url: 'https://corporativo.unidas.com.br/',
    stack: ['JavaScript', 'CSS', 'HTML', 'Webflow', 'Landing Page'],
    summary: {
      pt: 'Landing page de aluguel corporativo de frotas, desenhada para captação de leads.',
      en: 'Corporate fleet rental landing page, designed for lead capture.',
    },
    description: {
      pt: 'Desenvolvi a Landing Page da Unidas Corporativo utilizando o Webflow, criando um site funcional e intuitivo. A Unidas Corporativo é uma empresa especializada no aluguel de carros, oferecendo uma ampla gama de veículos de alta qualidade e performance. O site foi projetado para proporcionar uma experiência de usuário eficiente e agradável, facilitando a navegação. Este projeto envolveu a aplicação de conhecimentos em desenvolvimento web, design de interface e otimização para mecanismos de busca (SEO), resultando em uma solução completa para atender às necessidades comerciais da Unidas Corporativo.',
      en: 'I built the Unidas Corporativo landing page in Webflow, delivering a functional and intuitive site. Unidas Corporativo specialises in car rental, offering a wide range of high-quality, high-performance vehicles. The page was designed for an efficient, pleasant user experience with easy navigation. The project combined web development, interface design and search engine optimisation (SEO) into a complete solution for the company’s commercial needs.',
    },
    images: [
      { src: '/projetos/unidas-corporativo/01.webp', width: 1600, height: 900 },
      { src: '/projetos/unidas-corporativo/02.webp', width: 1600, height: 900 },
      { src: '/projetos/unidas-corporativo/03.webp', width: 1600, height: 900 },
    ],
  },
  {
    slug: 'unidas-empresas',
    title: 'Unidas Empresas',
    client: 'Unidas',
    category: 'webflow',
    url: 'http://empresas.unidas.com.br/',
    stack: ['JavaScript', 'CSS', 'HTML', 'Webflow', 'Landing Page'],
    summary: {
      pt: 'Landing page B2B de locação de veículos, com jornada de conversão enxuta.',
      en: 'B2B vehicle rental landing page with a lean conversion journey.',
    },
    description: {
      pt: 'Desenvolvi a Landing Page da Unidas Empresas utilizando o Webflow, criando um site funcional e intuitivo. A Unidas Empresas é uma empresa especializada no aluguel de carros, oferecendo uma ampla gama de veículos de alta qualidade e performance. O site foi projetado para proporcionar uma experiência de usuário eficiente e agradável, facilitando a navegação. Este projeto envolveu a aplicação de conhecimentos em desenvolvimento web, design de interface e otimização para mecanismos de busca (SEO), resultando em uma solução completa para atender às necessidades comerciais da Unidas Empresas.',
      en: 'I built the Unidas Empresas landing page in Webflow, delivering a functional and intuitive site. Unidas Empresas specialises in car rental, offering a wide range of high-quality, high-performance vehicles. The page was designed for an efficient, pleasant user experience with easy navigation. The project combined web development, interface design and search engine optimisation (SEO) into a complete solution for the company’s commercial needs.',
    },
    images: [
      { src: '/projetos/unidas-empresas/01.webp', width: 1600, height: 900 },
      { src: '/projetos/unidas-empresas/02.webp', width: 1600, height: 900 },
      { src: '/projetos/unidas-empresas/03.webp', width: 1600, height: 900 },
    ],
  },
  {
    slug: 'vem-ser-livre',
    title: 'Vem Ser Livre',
    client: 'Unidas Livre',
    category: 'webflow',
    featured: true,
    url: 'https://vemserlivre.com.br/',
    stack: ['JavaScript', 'CSS', 'HTML', 'Webflow'],
    summary: {
      pt: 'Site de carro por assinatura com calculadora de preços alimentada por dados em tempo real.',
      en: 'Car subscription site with a pricing calculator fed by real-time data.',
    },
    description: {
      pt: 'Desenvolvi o site da Unidas Livre utilizando o Webflow, criando um site funcional e intuitivo. A Unidas Livre é uma empresa especializada na assinatura de carros, oferecendo uma ampla gama de veículos de alta qualidade e performance. O site foi projetado para proporcionar uma experiência de usuário eficiente e agradável, facilitando a navegação, a visualização de veículos e também facilitando o entendimento do usuário sobre o serviço de carro por assinatura, com uma calculadora de preços complexas com dados baseados em tempo real. Este projeto envolveu a aplicação de conhecimentos em desenvolvimento web, design de interface e otimização para mecanismos de busca (SEO), resultando em uma solução completa para atender às necessidades comerciais da Unidas Livre.',
      en: 'I built the Unidas Livre website in Webflow, delivering a functional and intuitive site. Unidas Livre specialises in car subscriptions, offering a wide range of high-quality, high-performance vehicles. The site was designed for an efficient, pleasant experience, with easy navigation, clear vehicle browsing, and a complex pricing calculator driven by real-time data that helps users understand how the subscription service works. The project combined web development, interface design and search engine optimisation (SEO) into a complete solution for the company’s commercial needs.',
    },
    images: [
      { src: '/projetos/vem-ser-livre/01.webp', width: 1600, height: 900 },
      { src: '/projetos/vem-ser-livre/02.webp', width: 1600, height: 900 },
      { src: '/projetos/vem-ser-livre/03.webp', width: 1600, height: 900 },
    ],
  },
  {
    slug: 'banco-inter-pagamentos',
    title: 'Integração de Pagamentos Banco Inter',
    client: null,
    category: 'sistemas',
    featured: true,
    url: 'https://br.wordpress.org/plugins/wc-banco-inter/',
    stack: ['JavaScript', 'CSS', 'HTML', 'PHP', 'CodeIgniter', 'PerfexCRM', 'APIs REST', 'Symfony', 'WordPress', 'WooCommerce'],
    summary: {
      pt: 'Módulo de pagamentos do Banco Inter para PerfexCRM e WooCommerce, publicado no WordPress.org.',
      en: 'Banco Inter payment module for PerfexCRM and WooCommerce, published on WordPress.org.',
    },
    description: {
      pt: 'Desenvolvi um módulo de integração de pagamento do Banco Inter para o sistema PerfexCRM utilizando o framework Codeigniter e para a plataforma Woocommerce. Este módulo permite a integração perfeita das funcionalidades de pagamento do Banco Inter, facilitando transações seguras e eficientes. No PerfexCRM, o módulo permite que os usuários gerenciem pagamentos diretamente no sistema, melhorando a eficiência financeira e administrativa. Para Woocommerce, o módulo integra as opções de pagamento do Banco Inter na loja online, proporcionando uma experiência de compra otimizada para os clientes. O projeto envolveu a aplicação de conhecimentos em desenvolvimento web, PHP, e integrações de API, resultando em uma solução robusta e versátil para a gestão de pagamentos em ambas as plataformas.',
      en: 'I developed a Banco Inter payment integration module for PerfexCRM using the CodeIgniter framework, and for the WooCommerce platform. The module allows Banco Inter payment features to be integrated seamlessly, enabling secure and efficient transactions. Inside PerfexCRM, users can manage payments directly in the system, improving financial and administrative efficiency. On WooCommerce, it brings Banco Inter payment options into the online store for a smoother checkout. The project drew on web development, PHP and API integration to produce a robust, versatile payment management solution for both platforms.',
    },
    images: [
      { src: '/projetos/banco-inter-pagamentos/01.webp', width: 1394, height: 960 },
      { src: '/projetos/banco-inter-pagamentos/02.webp', width: 1600, height: 824 },
      { src: '/projetos/banco-inter-pagamentos/03.webp', width: 1600, height: 867 },
      { src: '/projetos/banco-inter-pagamentos/04.webp', width: 1423, height: 789 },
      { src: '/projetos/banco-inter-pagamentos/05.webp', width: 1440, height: 1112 },
      { src: '/projetos/banco-inter-pagamentos/06.webp', width: 1417, height: 710 },
      { src: '/projetos/banco-inter-pagamentos/07.webp', width: 1423, height: 789 },
      { src: '/projetos/banco-inter-pagamentos/08.webp', width: 1423, height: 789 },
      { src: '/projetos/banco-inter-pagamentos/09.webp', width: 1426, height: 789 },
    ],
  },
  {
    slug: 'oticas-mayer',
    title: 'Óticas Mayer',
    client: 'Óticas Mayer',
    category: 'wordpress',
    url: 'https://oticasmayer.com.br/',
    stack: ['JavaScript', 'CSS', 'HTML', 'WordPress', 'WooCommerce'],
    summary: {
      pt: 'Loja de óculos e acessórios ópticos em WordPress + WooCommerce.',
      en: 'Eyewear and optical accessories store on WordPress + WooCommerce.',
    },
    description: {
      pt: 'Desenvolvi o site da Óticas Mayer utilizando as plataformas Wordpress e Woocommerce, criando uma loja online funcional e intuitiva. A Óticas Mayer é uma empresa especializada na venda de óculos e acessórios ópticos, oferecendo uma ampla gama de produtos de alta qualidade. O site foi projetado para proporcionar uma experiência de usuário eficiente e agradável, facilitando a navegação, a visualização de produtos e o processo de compra. Este projeto envolveu a aplicação de conhecimentos em desenvolvimento web, design de interface, e-commerce e otimização para mecanismos de busca (SEO), resultando em uma solução completa para atender às necessidades comerciais da Óticas Mayer.',
      en: 'I built the Óticas Mayer website using WordPress and WooCommerce, delivering a functional and intuitive online store. Óticas Mayer specialises in eyewear and optical accessories, offering a broad range of high-quality products. The store was designed for an efficient, pleasant user experience, making navigation, product browsing and checkout straightforward. The project combined web development, interface design, e-commerce and search engine optimisation (SEO) into a complete commercial solution.',
    },
    images: [
      { src: '/projetos/oticas-mayer/01.webp', width: 1600, height: 748 },
      { src: '/projetos/oticas-mayer/02.webp', width: 1600, height: 748 },
      { src: '/projetos/oticas-mayer/03.webp', width: 1600, height: 750 },
      { src: '/projetos/oticas-mayer/04.webp', width: 1600, height: 747 },
      { src: '/projetos/oticas-mayer/05.webp', width: 1600, height: 748 },
    ],
  },
  {
    slug: 'perfexcrm-financeiro',
    title: 'Gestão Financeira PerfexCRM',
    client: null,
    category: 'sistemas',
    url: null,
    stack: ['JavaScript', 'CSS', 'HTML', 'PHP', 'CodeIgniter', 'PerfexCRM', 'APIs REST', 'Symfony'],
    summary: {
      pt: 'Módulo de despesas, receitas, fluxo de caixa e relatórios dentro do PerfexCRM.',
      en: 'Expenses, revenue, cash flow and reporting module inside PerfexCRM.',
    },
    description: {
      pt: 'Desenvolvi um módulo de Gestão Financeira para o sistema PerfexCRM utilizando o framework Codeigniter. Este módulo foi projetado para aprimorar as capacidades do PerfexCRM, permitindo uma gestão financeira integrada e eficaz. Com este módulo, os usuários podem gerenciar despesas, receitas, fluxos de caixa e gerar relatórios financeiros detalhados. O projeto envolveu a aplicação de conhecimentos em desenvolvimento web, PHP e integrações de API, resultando em uma ferramenta poderosa que facilita o controle financeiro, proporciona insights valiosos e melhora a tomada de decisões financeiras dentro do PerfexCRM.',
      en: 'I developed a Financial Management module for PerfexCRM using the CodeIgniter framework. The module extends PerfexCRM with integrated, effective financial management: users can track expenses, revenue and cash flow, and generate detailed financial reports. The project drew on web development, PHP and API integration to produce a tool that simplifies financial control, surfaces useful insights and improves financial decision-making inside PerfexCRM.',
    },
    images: [
      { src: '/projetos/perfexcrm-financeiro/01.webp', width: 1600, height: 814 },
      { src: '/projetos/perfexcrm-financeiro/02.webp', width: 1600, height: 807 },
      { src: '/projetos/perfexcrm-financeiro/03.webp', width: 1600, height: 815 },
      { src: '/projetos/perfexcrm-financeiro/04.webp', width: 1600, height: 815 },
      { src: '/projetos/perfexcrm-financeiro/05.webp', width: 1600, height: 673 },
      { src: '/projetos/perfexcrm-financeiro/06.webp', width: 1600, height: 815 },
    ],
  },
  {
    slug: 'bike-cia',
    title: 'Bike & Cia',
    client: 'Bike & Cia',
    category: 'wordpress',
    url: 'https://bikeciabrasil.com.br/',
    stack: ['JavaScript', 'CSS', 'HTML', 'WordPress', 'WooCommerce'],
    summary: {
      pt: 'E-commerce de bicicletas e acessórios em WordPress + WooCommerce.',
      en: 'Bicycle and accessories e-commerce on WordPress + WooCommerce.',
    },
    description: {
      pt: 'Desenvolvi o site da Bike & Cia utilizando as plataformas Wordpress e Woocommerce. A Bike & Cia é uma empresa especializada em bicicletas, e o site foi projetado para oferecer uma experiência de usuário eficiente e agradável. Este projeto envolveu a aplicação de conhecimentos em desenvolvimento web, design de interface, e-commerce e otimização para mecanismos de busca (SEO), proporcionando uma solução completa para as necessidades comerciais da Bike & Cia.',
      en: 'I built the Bike & Cia website using WordPress and WooCommerce. Bike & Cia specialises in bicycles, and the site was designed to offer an efficient, pleasant user experience. The project combined web development, interface design, e-commerce and search engine optimisation (SEO) into a complete solution for the company’s commercial needs.',
    },
    images: [
      { src: '/projetos/bike-cia/01.webp', width: 1600, height: 784 },
      { src: '/projetos/bike-cia/02.webp', width: 1600, height: 783 },
      { src: '/projetos/bike-cia/03.webp', width: 1600, height: 784 },
      { src: '/projetos/bike-cia/04.webp', width: 1600, height: 779 },
    ],
  },
  {
    slug: 'imagear',
    title: 'Imagear',
    client: 'Imagear',
    category: 'wordpress',
    url: 'https://imagear.com.br/',
    stack: ['JavaScript', 'CSS', 'HTML', 'WordPress', 'WooCommerce'],
    summary: {
      pt: 'Loja de produtos fotográficos em WordPress + WooCommerce.',
      en: 'Photography equipment store on WordPress + WooCommerce.',
    },
    description: {
      pt: 'Desenvolvi o site da Imagear utilizando as plataformas Wordpress e Woocommerce. A Imagear é uma empresa especializada em produtos fotográficos, e o site foi projetado para oferecer uma experiência de usuário eficiente e agradável. Este projeto envolveu a aplicação de conhecimentos em desenvolvimento web, design de interface, e-commerce e otimização para mecanismos de busca (SEO), proporcionando uma solução completa para as necessidades comerciais da Imagear.',
      en: 'I built the Imagear website using WordPress and WooCommerce. Imagear specialises in photography products, and the site was designed to offer an efficient, pleasant user experience. The project combined web development, interface design, e-commerce and search engine optimisation (SEO) into a complete solution for the company’s commercial needs.',
    },
    images: [
      { src: '/projetos/imagear/01.webp', width: 1600, height: 785 },
      { src: '/projetos/imagear/02.webp', width: 1600, height: 784 },
      { src: '/projetos/imagear/03.webp', width: 1600, height: 722 },
      { src: '/projetos/imagear/04.webp', width: 1600, height: 781 },
    ],
  },
  {
    slug: 'perfexcrm-ecommerce',
    title: 'E-commerce PerfexCRM',
    client: null,
    category: 'sistemas',
    url: null,
    stack: ['JavaScript', 'CSS', 'HTML', 'PHP', 'CodeIgniter', 'PerfexCRM', 'APIs REST', 'Symfony'],
    summary: {
      pt: 'Gestão de produtos, pedidos e clientes de lojas online direto no PerfexCRM.',
      en: 'Product, order and customer management for online stores inside PerfexCRM.',
    },
    description: {
      pt: 'Desenvolvi um módulo de Ecommerce para o sistema PerfexCRM utilizando o framework Codeigniter. Este módulo foi projetado para expandir as funcionalidades do PerfexCRM, permitindo a gestão integrada de lojas online diretamente na plataforma. Com ele, os usuários podem gerenciar produtos, pedidos, e clientes de maneira eficiente e centralizada. O projeto envolveu a aplicação de conhecimentos em desenvolvimento web, PHP, e-commerce e integrações de API, resultando em uma solução robusta que melhora significativamente a experiência do usuário e otimiza os processos de vendas e atendimento ao cliente dentro do PerfexCRM.',
      en: 'I developed an E-commerce module for PerfexCRM using the CodeIgniter framework. The module expands PerfexCRM so online stores can be managed directly from the platform: products, orders and customers, all handled efficiently in one place. The project drew on web development, PHP, e-commerce and API integration to produce a robust solution that meaningfully improves the user experience and streamlines sales and customer service inside PerfexCRM.',
    },
    images: [
      { src: '/projetos/perfexcrm-ecommerce/01.webp', width: 1600, height: 783 },
      { src: '/projetos/perfexcrm-ecommerce/02.webp', width: 1600, height: 900 },
      { src: '/projetos/perfexcrm-ecommerce/03.webp', width: 1600, height: 900 },
      { src: '/projetos/perfexcrm-ecommerce/04.webp', width: 1600, height: 900 },
      { src: '/projetos/perfexcrm-ecommerce/05.webp', width: 1600, height: 900 },
      { src: '/projetos/perfexcrm-ecommerce/06.webp', width: 1600, height: 900 },
      { src: '/projetos/perfexcrm-ecommerce/07.webp', width: 1600, height: 900 },
      { src: '/projetos/perfexcrm-ecommerce/08.webp', width: 1600, height: 900 },
    ],
  },
  {
    slug: 'smel',
    title: 'SMEL Esporte e Lazer',
    client: 'UFU',
    category: 'academico',
    url: 'https://gabriell-braga.github.io/PPI_GabrielBraga/',
    stack: ['HTML', 'JavaScript', 'CSS'],
    summary: {
      pt: 'Site informativo da Secretaria Municipal de Esporte e Lazer, feito na UFU.',
      en: 'Informational site for the municipal Sports and Leisure Department, built at UFU.',
    },
    description: {
      pt: 'Desenvolvi um site informativo e interativo para a Secretaria Municipal de Esporte e Lazer (SMEL) como parte da disciplina de Programação para a Internet 1. Este projeto representou uma oportunidade significativa para aplicar as habilidades adquiridas em meu trabalho e no curso técnico, integrando-as ao contexto acadêmico da Universidade Federal de Uberlândia.',
      en: 'I built an informative, interactive website for the Municipal Department of Sport and Leisure (SMEL) as part of the Programming for the Internet 1 course. The project was a chance to bring the skills I had picked up at work and in technical training into an academic context at the Federal University of Uberlândia.',
    },
    images: [
      { src: '/projetos/smel/01.webp', width: 1600, height: 772 },
      { src: '/projetos/smel/02.webp', width: 1600, height: 781 },
      { src: '/projetos/smel/03.webp', width: 1600, height: 785 },
      { src: '/projetos/smel/04.webp', width: 1600, height: 783 },
    ],
  },
  {
    slug: 'perfexcrm-nota-fiscal',
    title: 'Nota Fiscal PerfexCRM',
    client: null,
    category: 'sistemas',
    url: null,
    stack: ['JavaScript', 'CSS', 'HTML', 'PHP', 'CodeIgniter', 'PerfexCRM', 'APIs REST', 'Symfony'],
    summary: {
      pt: 'Emissão automatizada de notas fiscais eletrônicas integrada ao fluxo do CRM.',
      en: 'Automated electronic invoicing wired into the CRM workflow.',
    },
    description: {
      pt: 'Desenvolvi um módulo de Nota Fiscal para o sistema PerfexCRM utilizando o framework Codeigniter. Este módulo foi projetado para automatizar a emissão de notas fiscais, integrando-se perfeitamente ao fluxo de trabalho do PerfexCRM. A solução facilita a geração e gestão de notas fiscais eletrônicas, garantindo conformidade com as regulamentações fiscais vigentes. O projeto envolveu a aplicação de conhecimentos avançados em desenvolvimento web, PHP, e integrações de API, resultando em uma ferramenta eficiente que otimiza os processos administrativos e contábeis, proporcionando maior agilidade e precisão para os usuários do PerfexCRM.',
      en: 'I developed an Invoicing module for PerfexCRM using the CodeIgniter framework. The module automates the issuing of invoices and slots directly into the PerfexCRM workflow, making electronic invoices easy to generate and manage while staying compliant with current tax regulations. The project drew on advanced web development, PHP and API integration to produce a tool that streamlines administrative and accounting work with more speed and accuracy.',
    },
    images: [
      { src: '/projetos/perfexcrm-nota-fiscal/01.webp', width: 1600, height: 900 },
      { src: '/projetos/perfexcrm-nota-fiscal/02.webp', width: 1600, height: 900 },
      { src: '/projetos/perfexcrm-nota-fiscal/03.webp', width: 1600, height: 900 },
      { src: '/projetos/perfexcrm-nota-fiscal/04.webp', width: 1600, height: 900 },
    ],
  },
  {
    slug: 'gestao-reunioes-salas',
    title: 'Gestão de Reuniões e Salas',
    client: null,
    category: 'sistemas',
    featured: true,
    url: null,
    stack: ['JavaScript', 'CSS', 'HTML', 'PHP', 'APIs REST', 'Symfony', 'TypeScript', 'Angular'],
    summary: {
      pt: 'Aplicação Angular + Symfony para agendamento de salas, horários e participantes.',
      en: 'Angular + Symfony app for booking rooms, schedules and attendees.',
    },
    description: {
      pt: 'Desenvolvi uma aplicação web para gestão de reuniões e salas, utilizando Angular para o front-end e Symfony PHP para o back-end. Esta aplicação foi projetada para facilitar a organização e o agendamento de reuniões, permitindo o gerenciamento eficiente de salas de conferência, horários e participantes. A interface amigável em Angular proporciona uma experiência de usuário intuitiva e dinâmica, enquanto o back-end robusto em Symfony PHP assegura uma integração segura e eficiente com o banco de dados. O projeto envolveu a aplicação de conhecimentos avançados em desenvolvimento web, frameworks modernos e práticas de usabilidade, resultando em uma solução completa e eficaz para a gestão corporativa de reuniões e espaços.',
      en: 'I built a web application for meeting and room management, using Angular on the front end and Symfony PHP on the back end. The app makes organising and scheduling meetings straightforward, with efficient management of conference rooms, time slots and attendees. The Angular interface keeps the experience intuitive and responsive, while the Symfony back end handles secure, efficient database integration. The project drew on advanced web development, modern frameworks and usability practice to deliver a complete solution for corporate meeting and space management.',
    },
    images: [
      { src: '/projetos/gestao-reunioes-salas/01.webp', width: 1600, height: 872 },
      { src: '/projetos/gestao-reunioes-salas/02.webp', width: 1280, height: 800 },
      { src: '/projetos/gestao-reunioes-salas/03.webp', width: 1280, height: 800 },
      { src: '/projetos/gestao-reunioes-salas/04.webp', width: 1280, height: 800 },
      { src: '/projetos/gestao-reunioes-salas/05.webp', width: 1280, height: 700 },
      { src: '/projetos/gestao-reunioes-salas/06.webp', width: 720, height: 1280 },
      { src: '/projetos/gestao-reunioes-salas/07.webp', width: 720, height: 1280 },
    ],
  },
  {
    slug: 'cefalgi',
    title: 'Cefalgi',
    client: 'Cefalgi',
    category: 'wordpress',
    url: 'https://cefalgi.com.br/',
    stack: ['JavaScript', 'CSS', 'HTML', 'WordPress'],
    summary: {
      pt: 'Landing page de clínica especializada em cefaleias, voltada à captação de leads.',
      en: 'Landing page for a headache treatment clinic, focused on lead capture.',
    },
    description: {
      pt: 'Desenvolvi a landing page da Cefalgi utilizando a plataforma Wordpress, criando uma interface atraente e funcional para a apresentação da empresa. A Cefalgi é especializada no tratamento e manejo de cefaleias (dores de cabeça), oferecendo serviços e informações relevantes aos pacientes. A landing page foi projetada para facilitar a navegação e a captação de leads, proporcionando uma experiência de usuário eficiente e agradável. Este projeto envolveu a aplicação de conhecimentos em desenvolvimento web, design de interface, e otimização para mecanismos de busca (SEO), resultando em uma solução completa e eficaz para as necessidades comerciais da Cefalgi.',
      en: 'I built the Cefalgi landing page on WordPress, creating an attractive and functional interface to present the company. Cefalgi specialises in the treatment and management of headaches, providing services and relevant information to patients. The page was designed to make navigation and lead capture easy, with an efficient and pleasant user experience. The project combined web development, interface design and search engine optimisation (SEO) into a complete, effective solution for the company’s commercial needs.',
    },
    images: [
      { src: '/projetos/cefalgi/01.webp', width: 1600, height: 782 },
      { src: '/projetos/cefalgi/02.webp', width: 1600, height: 786 },
      { src: '/projetos/cefalgi/03.webp', width: 1600, height: 783 },
      { src: '/projetos/cefalgi/04.webp', width: 1600, height: 781 },
    ],
  },
  {
    slug: 'instituto-mapinguari',
    title: 'Instituto Mapinguari',
    client: 'Instituto Mapinguari',
    category: 'wordpress',
    url: 'https://mapinguari.org/',
    stack: ['JavaScript', 'CSS', 'HTML', 'WordPress'],
    summary: {
      pt: 'Blog de divulgação científica sobre preservação ambiental e cultural da Amazônia.',
      en: 'Science outreach blog on Amazon environmental and cultural preservation.',
    },
    description: {
      pt: 'Desenvolvi o site do Instituto Mapinguari utilizando a plataforma Wordpress, criando um blog informativo e interativo. O Instituto Mapinguari é uma organização dedicada à pesquisa e à divulgação científica, com foco na preservação ambiental e cultural da Amazônia. O site foi projetado para facilitar a navegação dos usuários, proporcionando acesso a artigos, notícias, e eventos relacionados às atividades do instituto. Este projeto envolveu a aplicação de conhecimentos em desenvolvimento web, design de interface, e otimização para mecanismos de busca (SEO), resultando em uma plataforma eficiente e atrativa para promover as iniciativas do Instituto Mapinguari.',
      en: 'I built the Instituto Mapinguari website on WordPress as an informative, interactive blog. Instituto Mapinguari is an organisation dedicated to research and science outreach, focused on the environmental and cultural preservation of the Amazon. The site was designed to make navigation easy, giving readers access to articles, news and events tied to the institute’s work. The project combined web development, interface design and search engine optimisation (SEO) into an efficient, attractive platform for promoting the institute’s initiatives.',
    },
    images: [
      { src: '/projetos/instituto-mapinguari/01.webp', width: 1600, height: 771 },
      { src: '/projetos/instituto-mapinguari/02.webp', width: 1600, height: 774 },
      { src: '/projetos/instituto-mapinguari/03.webp', width: 1600, height: 772 },
      { src: '/projetos/instituto-mapinguari/04.webp', width: 1600, height: 781 },
      { src: '/projetos/instituto-mapinguari/05.webp', width: 1600, height: 781 },
    ],
  },
  {
    slug: 'mednet',
    title: 'MedNet',
    client: 'UFU',
    category: 'academico',
    url: 'https://gabriell-braga.github.io/MedNet/',
    stack: ['HTML', 'JavaScript', 'CSS', 'Firebase', 'APIs REST'],
    summary: {
      pt: 'Dashboard hospitalar para prontuários, consultas, médicos e pacientes.',
      en: 'Hospital dashboard for records, appointments, doctors and patients.',
    },
    description: {
      pt: 'Desenvolvemos um dashboard hospitalar abrangente, o MedNet, como parte de um projeto acadêmico na Universidade Federal de Uberlândia (UFU). Este sistema foi projetado para gerenciar prontuários, consultas, médicos, pacientes e hospitais, oferecendo uma solução integrada para a administração hospitalar.',
      en: 'We built MedNet, a comprehensive hospital dashboard, as an academic project at the Federal University of Uberlândia (UFU). The system manages medical records, appointments, doctors, patients and hospitals, offering an integrated solution for hospital administration.',
    },
    images: [
      { src: '/projetos/mednet/01.webp', width: 1600, height: 772 },
    ],
  },
  {
    slug: 'calculadora-financeira',
    title: 'Calculadora Financeira',
    client: 'UFU',
    category: 'academico',
    url: 'https://gabriell-braga.github.io/Calculadora-Financeira/',
    stack: ['HTML', 'JavaScript', 'CSS'],
    summary: {
      pt: 'Calculadora interativa criada na disciplina de Matemática Financeira da UFU.',
      en: 'Interactive calculator built for the Financial Mathematics course at UFU.',
    },
    description: {
      pt: 'Desenvolvi uma calculadora financeira interativa como parte do meu curso de Matemática Financeira sob a orientação da Professora Mara Alves Soares na Universidade Federal de Uberlândia (UFU). Este projeto foi uma oportunidade para aplicar conceitos teóricos em uma ferramenta prática e útil.',
      en: 'I built an interactive financial calculator for my Financial Mathematics course, supervised by Professor Mara Alves Soares at the Federal University of Uberlândia (UFU). The project was a chance to turn theory into a practical, genuinely useful tool.',
    },
    images: [
      { src: '/projetos/calculadora-financeira/01.webp', width: 1600, height: 775 },
      { src: '/projetos/calculadora-financeira/02.webp', width: 1600, height: 775 },
      { src: '/projetos/calculadora-financeira/03.webp', width: 1600, height: 775 },
      { src: '/projetos/calculadora-financeira/04.webp', width: 1600, height: 773 },
    ],
  },
  {
    slug: 'optica-faltz',
    title: 'Óptica Faltz',
    client: 'Óptica Faltz',
    category: 'wordpress',
    url: 'https://opticafaltz.com.br/',
    stack: ['JavaScript', 'CSS', 'HTML', 'WordPress', 'WooCommerce'],
    summary: {
      pt: 'Loja de óculos em WordPress + WooCommerce, com foco em navegação e SEO.',
      en: 'Eyewear store on WordPress + WooCommerce, focused on navigation and SEO.',
    },
    description: {
      pt: 'Desenvolvi o site da Optica Faltz utilizando as plataformas Wordpress e Woocommerce. A Optica Faltz é uma empresa especializada em Óculos, e o site foi projetado para oferecer uma experiência de usuário eficiente e agradável. Este projeto envolveu a aplicação de conhecimentos em desenvolvimento web, design de interface, e-commerce e otimização para mecanismos de busca (SEO), proporcionando uma solução completa para as necessidades comerciais da Optica Faltz.',
      en: 'I built the Óptica Faltz website using WordPress and WooCommerce. Óptica Faltz specialises in eyewear, and the site was designed to offer an efficient, pleasant user experience. The project combined web development, interface design, e-commerce and search engine optimisation (SEO) into a complete solution for the company’s commercial needs.',
    },
    images: [
      { src: '/projetos/optica-faltz/01.webp', width: 1600, height: 769 },
      { src: '/projetos/optica-faltz/02.webp', width: 1600, height: 590 },
      { src: '/projetos/optica-faltz/03.webp', width: 1600, height: 782 },
      { src: '/projetos/optica-faltz/04.webp', width: 1600, height: 784 },
    ],
  },
]

/** Usada na Home para mostrar só uma amostra. */
export const highlightedProjects = projects.filter((project) => project.featured)
