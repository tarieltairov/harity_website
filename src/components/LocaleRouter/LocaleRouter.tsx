import { startTransition, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Router, UNSAFE_createBrowserHistory as createBrowserHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  buildLangPath,
  DEFAULT_LANG,
  getLangFromPath,
  LanguageContext,
  stripLangFromPath,
  storeLang,
} from '@/i18n';
import type { Lang } from '@/i18n';

interface LocaleRouterProps {
  children: ReactNode;
}

/**
 * Роутер с языковым префиксом: /ru/news, /ky/news, /en/news.
 *
 * Префикс — это basename роутера, поэтому внутри приложения пути пишутся
 * без языка (`ROUTES.news`, `<Link to="/contacts">`), а react-router сам
 * добавляет и отрезает префикс.
 *
 * Это тот же BrowserRouter, только basename не фиксирован, а выводится из адреса:
 * язык — первый сегмент пути. Смена языка — обычный переход по истории на тот же
 * путь с другим префиксом: роутер и страницы не пересоздаются (стейт фильтров,
 * форм и скролл остаются), а «назад»/«вперёд» через границу языка отрабатывает
 * сама история — отдельный слушатель popstate не нужен.
 */
export function LocaleRouter({ children }: LocaleRouterProps) {
  const { i18n } = useTranslation();

  // Одна история на всё время жизни приложения — как внутри BrowserRouter
  const [history] = useState(() => createBrowserHistory({ v5Compat: true }));
  const [state, setState] = useState({ action: history.action, location: history.location });

  useLayoutEffect(
    () =>
      history.listen((update) => {
        // Переход — в transition, как в BrowserRouter: ленивая страница догружается,
        // пока на экране остаётся предыдущая. Словарь переключаем в том же transition,
        // чтобы строки, basename и адрес сменились одним рендером
        startTransition(() => {
          const nextLang = getLangFromPath(update.location.pathname);

          if (nextLang && nextLang !== i18n.language) {
            // Словари уже в памяти — changeLanguage отрабатывает синхронно
            void i18n.changeLanguage(nextLang);
          }

          setState(update);
        });
      }),
    [history, i18n]
  );

  // Префикс в адресе есть всегда: resolveLangFromUrl() добавил его до первого рендера,
  // а все внутренние переходы идут через basename
  const lang = getLangFromPath(state.location.pathname) ?? DEFAULT_LANG;

  const setLang = useCallback(
    (nextLang: Lang) => {
      const { pathname, search, hash } = history.location;

      if (nextLang === getLangFromPath(pathname)) return;

      history.push(`${buildLangPath(nextLang, stripLangFromPath(pathname))}${search}${hash}`);
    },
    [history]
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = i18n.t('common.brand');
    // Запоминаем и язык, открытый по прямой ссылке, — адрес без префикса откроется на нём
    storeLang(lang);
  }, [lang, i18n]);

  const contextValue = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <LanguageContext.Provider value={contextValue}>
      <Router
        basename={`/${lang}`}
        location={state.location}
        navigationType={state.action}
        navigator={history}
      >
        {children}
      </Router>
    </LanguageContext.Provider>
  );
}
