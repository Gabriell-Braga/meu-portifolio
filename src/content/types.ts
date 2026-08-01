export type Lang = 'pt' | 'en'

/** Todo texto de conteúdo existe nos dois idiomas. */
export type Localized = Record<Lang, string>

export const LANGS: Lang[] = ['pt', 'en']

export const isLang = (value: unknown): value is Lang =>
  value === 'pt' || value === 'en'
