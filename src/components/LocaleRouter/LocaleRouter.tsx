import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  buildLangPath,
  getLangFromPath,
  LanguageContext,
  stripLangFromPath,
  storeLang,
} from '@/i18n';
import type { Lang } from '@/i18n';

interface LocaleRouterProps {
  /** Язык из URL на момент загрузки — см. resolveLangFromUrl() */
  initialLang: Lang;
  children: ReactNode;
}

/**
 * Роутер с языковым префиксом: /ru/news, /ky/news, /en/news.
 *
 * Префикс — это basename роутера, поэтому внутри приложения пути пишутся
 * без языка (`ROUTES.news`, `<Link to="/contacts">`), а react-router сам
 * добавляет и отрезает префикс. При смене языка роутер пересоздаётся
 * с новым basename (key={lang}) — браузер остаётся на той же странице.
 */
export function LocaleRouter({ initialLang, children }: LocaleRouterProps) {
  const { i18n } = useTranslation();
  const [lang, setLangState] = useState(initialLang);

  const applyLang = useCallback(
    (nextLang: Lang) => {
      // Словари уже загружены — язык переключается синхронно, в одном рендере с роутером
      void i18n.changeLanguage(nextLang);
      setLangState(nextLang);
    },
    [i18n]
  );

  const setLang = useCallback(
    (nextLang: Lang) => {
      if (nextLang === lang) return;

      const { pathname, search, hash } = window.location;
      const nextPath = buildLangPath(nextLang, stripLangFromPath(pathname));

      window.history.pushState(null, '', `${nextPath}${search}${hash}`);
      applyLang(nextLang);
    },
    [lang, applyLang]
  );

  // «Назад» / «вперёд» через смену языка: префикс в URL поменялся — догоняем его
  useEffect(() => {
    const handlePopState = () => {
      const urlLang = getLangFromPath(window.location.pathname);

      if (urlLang && urlLang !== lang) {
        applyLang(urlLang);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [lang, applyLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = i18n.t('common.brand');
    // Запоминаем и язык, открытый по прямой ссылке, — адрес без префикса откроется на нём
    storeLang(lang);
  }, [lang, i18n]);

  const contextValue = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <LanguageContext.Provider value={contextValue}>
      <BrowserRouter key={lang} basename={`/${lang}`}>
        {children}
      </BrowserRouter>
    </LanguageContext.Provider>
  );
}
