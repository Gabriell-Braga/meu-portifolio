/**
 * Sync do portfólio do Notion.
 *
 * Lê a collection pública "Portfólio de Desenvolvimento Web" pela API não-oficial
 * do Notion e materializa tudo localmente:
 *   - src/content/projects.generated.json  (título, tags, link, descrição PT, imagens)
 *   - public/projetos/<slug>/NN.png        (todas as screenshots)
 *
 * Rodar com: node scripts/sync-notion.mjs
 */

import { mkdir, writeFile, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://nonstop-limburger-da8.notion.site'
const SPACE_ID = 'adf5a86e-d4a7-4205-a297-dbb74e549aca'
const COLLECTION_ID = 'f922d469-aad5-45f8-9ef5-a93f01d0ab73'
const COLLECTION_VIEW_ID = '06a0dad8-d1b8-4fde-97b2-db22e875f52b'

const IMAGES_DIR = join(ROOT, 'public', 'projetos')
const OUT_FILE = join(ROOT, 'src', 'content', 'projects.generated.json')

/** Screenshots vêm em ~1920px; 1600 basta e o next/image cuida do resto. */
const MAX_WIDTH = 1600
const WEBP_QUALITY = 82

/** Os títulos do Notion são longos demais para virar slug/URL. */
const SLUGS = {
  'Unidas Seminovos Pesados- Webflow': 'unidas-seminovos-pesados',
  'Unidas Corporativo - Webflow': 'unidas-corporativo',
  'Unidas Empresas - Webflow': 'unidas-empresas',
  'Vem ser Livre - Webflow': 'vem-ser-livre',
  'Módulo de Integração de Pagamento do Banco Inter para PerfexCRM em Codeigniter e para Woocommerce':
    'banco-inter-pagamentos',
  'Wordpress+Woocommerce Óticas Mayer': 'oticas-mayer',
  'Módulo de Gestão Financeira para PerfexCRM em Codeigniter': 'perfexcrm-financeiro',
  'Wordpress+Woocommerce Bike & Cia': 'bike-cia',
  'Wordpress+Woocommerce Imagear': 'imagear',
  'Módulo de Ecommerce para PerfexCRM em Codeigniter': 'perfexcrm-ecommerce',
  'Site da Secretaria Municipal de Esporte e Lazer (SMEL)': 'smel',
  'Módulo de Nota Fiscal para PerfexCRM em Codeigniter': 'perfexcrm-nota-fiscal',
  'Aplicação WEB em Angular e Back-End em Symfony PHP para Gestão de Reuniões e Salas':
    'gestao-reunioes-salas',
  'Wordpress Landing Page Cefalgi': 'cefalgi',
  'Wordpress Blog Instituto Mapinguari': 'instituto-mapinguari',
  'Dashboard Hospitalar MedNet': 'mednet',
  'Calculadora Financeira': 'calculadora-financeira',
  'Wordpress+Woocommerce Optica Faltz': 'optica-faltz',
}

/** Notion devolve rich text como [[texto, marcações?], ...]. Só queremos o texto. */
const plain = (rich) => (rich ?? []).map((chunk) => chunk[0]).join('')

/** Primeiro valor de uma propriedade url/select. */
const firstValue = (rich) => plain(rich).trim()

const slugify = (title) =>
  title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)

async function notion(endpoint, body) {
  const res = await fetch(`${SITE}/api/v3/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${endpoint} → HTTP ${res.status}`)
  return res.json()
}

/** Lista as páginas da collection, na ordem definida na view. */
async function fetchCollection() {
  const data = await notion('queryCollection?src=initial_load', {
    collectionId: COLLECTION_ID,
    collectionViewId: COLLECTION_VIEW_ID,
    loader: {
      type: 'reducer',
      reducers: { collection_group_results: { type: 'results', limit: 200 } },
      searchQuery: '',
      userTimeZone: 'America/Sao_Paulo',
    },
    query: {},
    source: { type: 'collection', id: COLLECTION_ID, spaceId: SPACE_ID },
  })

  const schema = Object.values(data.recordMap.collection)[0].value.value.schema
  // As chaves das propriedades são opacas ("exW_"); mapeamos pelo nome legível.
  const propId = (name) =>
    Object.entries(schema).find(([, def]) => def.name === name)?.[0]

  const tagsKey = propId('Tags')
  const linkKey = propId('Link')

  const order =
    data.result?.reducerResults?.collection_group_results?.blockIds ?? []

  const pages = []
  for (const id of order) {
    const block = data.recordMap.block[id]?.value?.value
    if (!block || block.type !== 'page') continue
    pages.push({
      id,
      title: plain(block.properties?.title),
      tags: firstValue(block.properties?.[tagsKey]).split(',').filter(Boolean),
      url: firstValue(block.properties?.[linkKey]),
    })
  }
  return pages
}

/** Descrição (callout) + blocos de imagem filhos diretos da página. */
async function fetchPageContent(pageId) {
  const data = await notion('loadPageChunk', {
    pageId,
    limit: 200,
    cursor: { stack: [] },
    chunkNumber: 0,
    verticalColumns: false,
  })

  const blocks = data.recordMap.block ?? {}
  // O recordMap traz também a página-mãe do portfólio; filtramos por parent_id.
  const children = (blocks[pageId]?.value?.value?.content ?? [])
    .map((id) => blocks[id]?.value?.value)
    .filter(Boolean)

  let description = ''
  const images = []

  for (const block of children) {
    if (block.type === 'callout' && !description) {
      description = plain(block.properties?.title)
        .replace(/^Descri[çc][ãa]o:\s*/i, '')
        .trim()
    }
    if (block.type === 'image') {
      const source = firstValue(block.properties?.source)
      if (source) images.push({ blockId: block.id, source })
    }
  }

  return { description, images }
}

/**
 * O proxy público do Notion assina a URL do S3 e responde com 302.
 * Reencodamos para WebP: os PNGs originais somam ~40 MB, o que não cabe no repo.
 */
async function downloadImage({ blockId, source }, destination) {
  const proxied = `${SITE}/image/${encodeURIComponent(source)}?table=block&id=${blockId}&cache=v2&width=${MAX_WIDTH}`
  const res = await fetch(proxied, { redirect: 'follow' })
  if (!res.ok) throw new Error(`imagem ${blockId} → HTTP ${res.status}`)

  const original = Buffer.from(await res.arrayBuffer())
  const pipeline = sharp(original)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })

  const { data, info } = await pipeline.toBuffer({ resolveWithObject: true })
  await writeFile(destination, data)

  return { width: info.width, height: info.height, bytes: data.length }
}

async function main() {
  console.log('→ lendo a collection do Notion…')
  const pages = await fetchCollection()
  console.log(`  ${pages.length} projetos encontrados`)

  await rm(IMAGES_DIR, { recursive: true, force: true })
  await mkdir(IMAGES_DIR, { recursive: true })
  await mkdir(dirname(OUT_FILE), { recursive: true })

  const projects = []
  let totalImages = 0

  let totalBytes = 0

  for (const [index, page] of pages.entries()) {
    const slug = SLUGS[page.title] ?? slugify(page.title)
    const { description, images } = await fetchPageContent(page.id)

    const folder = join(IMAGES_DIR, slug)
    await mkdir(folder, { recursive: true })

    const saved = []
    for (const [i, image] of images.entries()) {
      const name = `${String(i + 1).padStart(2, '0')}.webp`
      const { width, height, bytes } = await downloadImage(image, join(folder, name))
      totalBytes += bytes
      saved.push({ src: `/projetos/${slug}/${name}`, width, height })
    }

    totalImages += saved.length
    projects.push({
      slug,
      title: page.title,
      tags: page.tags,
      url: page.url || null,
      description: { pt: description, en: '' },
      images: saved,
    })

    console.log(
      `  [${String(index + 1).padStart(2, '0')}/${pages.length}] ${slug} — ${saved.length} img`,
    )
  }

  await writeFile(OUT_FILE, `${JSON.stringify(projects, null, 2)}\n`, 'utf8')
  const megabytes = (totalBytes / 1024 / 1024).toFixed(1)
  console.log(`\n✓ ${projects.length} projetos, ${totalImages} imagens (${megabytes} MB)`)
  console.log(`✓ ${OUT_FILE}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
