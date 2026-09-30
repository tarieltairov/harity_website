import { LANGS } from '@/i18n';
import type { Lang } from '@/i18n';

/** Текстовое поле мока сразу на всех языках сайта */
export type LocalizedText = Record<Lang, string>;

/**
 * Исходник мока: любую строку сущности можно задать как `{ ru, ky, en }`.
 * После localize() получается обычная сущность из `@/types` — ровно то,
 * что отдаст API с `?lang=`.
 */
export type Localizable<T> = T extends string
  ? T | LocalizedText
  : T extends (infer Item)[]
    ? Localizable<Item>[]
    : T extends object
      ? { [K in keyof T]: Localizable<T[K]> }
      : T;

function isLocalizedText(value: unknown): value is LocalizedText {
  return (
    typeof value === 'object' &&
    value !== null &&
    LANGS.every((lang) => typeof (value as Partial<LocalizedText>)[lang] === 'string')
  );
}

function resolve(value: unknown, lang: Lang): unknown {
  if (isLocalizedText(value)) return value[lang];
  if (Array.isArray(value)) return value.map((item) => resolve(item, lang));

  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolve(item, lang)])
    );
  }

  return value;
}

/**
 * Мемоизирует функцию «данные на языке lang»: для каждого языка build() вызывается
 * один раз, дальше отдаётся тот же объект — useMemo и сравнения по ссылке не ломаются.
 */
export function memoizeByLang<T>(build: (lang: Lang) => T): (lang: Lang) => T {
  const cache = new Map<Lang, T>();

  return (lang) => {
    let value = cache.get(lang);

    if (value === undefined) {
      value = build(lang);
      cache.set(lang, value);
    }

    return value;
  };
}

/** Возвращает геттер «данные на языке lang» для мока с полями `{ ru, ky, en }` */
export function createLocalized<T>(source: Localizable<T>): (lang: Lang) => T {
  return memoizeByLang((lang) => resolve(source, lang) as T);
}
