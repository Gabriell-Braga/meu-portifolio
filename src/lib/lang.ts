/**
 * Constantes compartilhadas entre cliente e servidor.
 *
 * A leitura do idioma (`resolveLang`) mora em `lang.server.ts` porque depende
 * de `next/headers` — importá-la aqui arrastaria a API de servidor para dentro
 * do bundle do cliente.
 */

export const LANG_COOKIE = 'gb-lang'

/** Um ano: a escolha de idioma não precisa ser reperguntada. */
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
