import { createContext, useContext } from 'react';
import type { Lang } from './config';

interface LanguageContextValue {
  lang: Lang;
  /** Переключает язык: меняет префикс в URL, остаётся на той же странице */
  setLang: (lang: Lang) => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage используется вне LocaleRouter');
  }

  return context;
}

/** Текущий язык — для запросов данных: getNewsArticles(lang) и т.п. */
export const useLang = () => useLanguage().lang;
