export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'gb-theme'

/**
 * Roda de forma síncrona no <head>, antes do primeiro paint: sem isto a página
 * pisca no tema errado enquanto o React hidrata.
 *
 * O escuro é o padrão do site, e não a preferência do sistema: é nele que a
 * identidade foi desenhada. O claro só entra quando o visitante pede, e essa
 * escolha fica salva.
 */
export const themeScript = `(function(){try{
var stored=localStorage.getItem('${THEME_STORAGE_KEY}');
document.documentElement.dataset.theme=stored==='light'?'light':'dark';
}catch(e){document.documentElement.dataset.theme='dark';}})();`
