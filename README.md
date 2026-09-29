# Portfólio — Gabriel Braga

Portfólio pessoal em Next.js 16 (App Router), com quatro páginas, bilíngue PT/EN,
tema claro/escuro e motion guiado por scroll.

- **/** — apresentação, habilidades e trabalhos em destaque
- **/projetos** — os 19 projetos, com filtro por categoria e detalhe em overlay
- **/experiencia** — linha do tempo de carreira, formação e habilidades
- **/contato** — canais de contato e download do currículo

## Rodando

```bash
npm install
npm run dev
```

Outros comandos: `npm run build`, `npm run lint`.

## Como funciona

### Tema

O tema é decidido antes do primeiro paint por um script inline
(`src/lib/theme.ts`) que escreve `data-theme` em `<html>`: escolha salva em
`localStorage` primeiro, `prefers-color-scheme` do dispositivo depois. Sem isso a
página piscaria no tema errado durante a hidratação.

O `ThemeProvider` assina esse atributo via `useSyncExternalStore`, em vez de
copiá-lo para um estado — o DOM é a única fonte da verdade.

### Idioma

Resolvido **no servidor** (`src/lib/lang.server.ts`): cookie `gb-lang`, depois o
header `Accept-Language`, com português como padrão. Resolver isso no cliente
faria o texto piscar em português para quem acessa em inglês.

O toggle grava o cookie e chama `router.refresh()`. As strings de interface estão
em `src/content/i18n.ts`; o conteúdo (projetos, experiência) carrega os campos
`.pt` / `.en` dos próprios arquivos.

Como o layout lê cookies e headers, as rotas são renderizadas sob demanda.

### Conteúdo

Os projetos ficam todos em `src/content/projects.ts`, escritos à mão, do mais
recente para o mais antigo. Cada um traz título, categoria, stack, link, resumo
de uma linha e descrição, estes dois em PT e EN. Na descrição, uma linha em
branco separa parágrafos, e o primeiro abre em destaque no overlay.

As imagens ficam em `public/projetos/<slug>/NN.webp`, e a `01` é a capa. Para
um projeto novo, capture em 1440×900 e converta para WebP (qualidade ~82).

### Motion

As primitivas ficam em `src/components/motion/` e são o vocabulário compartilhado
pelas quatro páginas: `RevealText`, `Reveal`, `Magnetic`, `Marquee`,
`ScrollProgress`, `Parallax`, `Counter`, `Starfield`, `TiltCard`, `Cursor`.

Curvas e springs vêm todos de `transitions.ts` — é o que faz as páginas
parecerem a mesma peça.

`prefers-reduced-motion` é respeitado globalmente pelo `MotionConfig`
(`reducedMotion="user"`), e as primitivas mais pesadas — campo de estrelas,
cursor customizado, marquee — se desligam por completo.

## Publicando

Defina `NEXT_PUBLIC_SITE_URL` com o domínio final para que sitemap, canonical e
os cartões de compartilhamento apontem para o lugar certo (na Vercel isso é
inferido automaticamente).
