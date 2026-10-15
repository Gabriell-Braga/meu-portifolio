import type { Metadata, Viewport } from 'next'
import { Archivo, Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Cursor } from '@/components/motion/cursor'
import { ScrollProgress } from '@/components/motion/scroll-progress'
import { Starfield } from '@/components/motion/starfield'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { LangProvider } from '@/components/providers/lang-provider'
import { MotionProvider } from '@/components/providers/motion-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { PersonSchema } from '@/components/seo/person-schema'
import { getDictionary, metadataByLang } from '@/content/i18n'
import { profile } from '@/content/profile'
import { resolveLang } from '@/lib/lang.server'
import { siteUrl } from '@/lib/site'
import { themeScript } from '@/lib/theme'

import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

/** Variável de 100 a 900: os títulos gigantes usam o peso máximo. */
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['400', '600', '800', '900'],
})

export async function generateMetadata(): Promise<Metadata> {
  const lang = await resolveLang()
  const { title, description } = metadataByLang[lang]

  return {
    // Resolve as URLs relativas de OG e canonical sem repetir o domínio.
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s · ${profile.name}` },
    description,
    alternates: { canonical: '/' },
    applicationName: profile.name,
    authors: [{ name: profile.name, url: profile.linkedin }],
    creator: profile.name,
    keywords: [
      'Gabriel Braga',
      'frontend developer',
      'desenvolvedor frontend',
      'Angular',
      'Next.js',
      'TypeScript',
      'SEO técnico',
      'Belo Horizonte',
    ],
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: profile.name,
      locale: lang === 'pt' ? 'pt_BR' : 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  }
}

export const viewport: Viewport = {
  // O site abre sempre no escuro, então a barra do navegador acompanha isso em
  // vez de seguir a preferência do sistema.
  themeColor: '#05070f',
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const lang = await resolveLang()
  const t = getDictionary(lang)

  return (
    <html
      lang={lang === 'pt' ? 'pt-BR' : 'en'}
      // O Next 16 só normaliza o scroll na navegação com este atributo.
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Precisa rodar antes do primeiro paint, senão a página pisca no
            tema errado enquanto o React hidrata. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <PersonSchema lang={lang} />
      </head>
      <body className="flex min-h-svh flex-col">
        <ThemeProvider>
          <LangProvider lang={lang}>
            <MotionProvider>
              <a
                href="#conteudo"
                className="gb-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-80 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
              >
                {t.a11y.skipToContent}
              </a>

              <Starfield />
              <ScrollProgress />
              <Cursor />
              <Header />

              <main id="conteudo" className="flex-1 pt-16 sm:pt-20">
                {children}
              </main>

              <Footer />
            </MotionProvider>
          </LangProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
