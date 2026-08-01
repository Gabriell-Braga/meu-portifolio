# Portfólio — Gabriel Braga

Portfólio pessoal em Next.js 16 (App Router), com quatro páginas, bilíngue PT/EN,
tema claro/escuro e motion guiado por scroll.

- **/** — apresentação, habilidades e trabalhos em destaque
- **/projetos** — os 18 projetos, com filtro por categoria e detalhe em overlay
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

`scripts/sync-notion.mjs` lê a página pública do Notion pela API não-oficial e
materializa tudo localmente:

```bash
node scripts/sync-notion.mjs
```

Ele escreve `src/content/projects.generated.json` e baixa as 81 screenshots para
`public/projetos/<slug>/`, reencodando para WebP (os PNGs originais somavam
~40 MB; ficam ~5 MB).

`src/content/projects.ts` combina esse JSON com metadados escritos à mão —
títulos curtos, resumo de uma linha, categoria e a tradução das descrições. Um
projeto novo no Notion sem entrada em `CURATED` faz o build falhar de propósito,
em vez de aparecer sem tradução.

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
