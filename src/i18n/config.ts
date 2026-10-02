/** Языки сайта. Код совпадает с URL-префиксом и с параметром `lang` в API */
export const LANGS = ['ky', 'ru', 'en'] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'ru';

/** Подписи на переключателе в шапке — в порядке из макета */
export const LANG_LABELS: Record<Lang, string> = {
  ky: 'КЫ',
  ru: 'РУ',
  en: 'EN',
};

const LANG_STORAGE_KEY = 'altyn-muras-lang';

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value);
}

/** Язык из первого сегмента пути: «/ky/news» → 'ky'; без валидного префикса — undefined */
export function getLangFromPath(pathname: string): Lang | undefined {
  const [firstSegment] = pathname.split('/').filter(Boolean);
  return isLang(firstSegment) ? firstSegment : undefined;
}

/** Путь без языкового префикса: «/ky/news/1» → «/news/1», «/ky» → «/» */
export function stripLangFromPath(pathname: string): string {
  const lang = getLangFromPath(pathname);
  return lang ? pathname.slice(lang.length + 1) || '/' : pathname;
}

/** Тот же путь на другом языке: («/news/1», 'en') → «/en/news/1», («/», 'en') → «/en» */
export function buildLangPath(lang: Lang, pathname: string): string {
  return pathname === '/' ? `/${lang}` : `/${lang}${pathname}`;
}

/**
 * Язык из адресной строки. Адрес без префикса («/», «/news», старые ссылки)
 * тихо переписывается на вариант с префиксом, чтобы у каждой страницы был один URL.
 * Вызывается до первого рендера — роутер сразу получает правильный basename.
 */
export function resolveLangFromUrl(): Lang {
  const { pathname, search, hash } = window.location;
  const urlLang = getLangFromPath(pathname);

  if (urlLang) return urlLang;

  const lang = detectPreferredLang();
  window.history.replaceState(null, '', `${buildLangPath(lang, pathname)}${search}${hash}`);
  return lang;
}

function readStoredLang(): Lang | undefined {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    return isLang(stored) ? stored : undefined;
  } catch {
    return undefined;
  }
}

export function storeLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Хранилище недоступно — язык всё равно сохранится в URL
  }
}

/** Язык для адреса без префикса: выбранный ранее → язык браузера → русский */
function detectPreferredLang(): Lang {
  const stored = readStoredLang();
  if (stored) return stored;

  // «ky-KG» → «ky»; кыргызский в браузерах встречается и как «kir»
  for (const browserLang of navigator.languages ?? []) {
    const code = browserLang.toLowerCase().split('-')[0];
    if (code === 'kir') return 'ky';
    if (isLang(code)) return code;
  }

  return DEFAULT_LANG;
}
