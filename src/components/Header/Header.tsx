import styles from './Header.module.scss';
import logo from '@assets/jpeg/logo.jpeg';
import searchIcon from '@assets/icons/Search.svg';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { NAV_LINKS, ROUTES } from '@/config/routes';
import {
  getSearchItemPath,
  MAX_RECENT_QUERIES,
  MIN_SEARCH_QUERY_LENGTH,
  POPULAR_SEARCH_SECTIONS,
  SEARCH_HISTORY_KEY,
} from '@/config/search';
import { useSearchSuggest } from '@/api';
import { LANG_LABELS, LANGS, useFormat, useLanguage } from '@/i18n';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { SegmentedControl } from '@ui/SegmentedControl';

export function Header() {
  const { t } = useTranslation();
  const { formatSearchMeta } = useFormat();
  const { lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchClosing, setSearchClosing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  // Только запросы, сохранённые пользователем; null — истории ещё нет, тогда показываем
  // стартовое наполнение из словаря. Его не кладём в стейт, чтобы при смене языка
  // подсказки не остались на языке первого рендера
  const [savedQueries, setSavedQueries] = useState<string[] | null>(() => {
    try {
      // getItem тоже внутри try: при заблокированных данных сайта он бросает
      // SecurityError, и хедер падал бы целиком
      const storedQueries = localStorage.getItem(SEARCH_HISTORY_KEY);

      if (!storedQueries) {
        return null;
      }

      const parsedQueries: unknown = JSON.parse(storedQueries);

      return Array.isArray(parsedQueries)
        ? parsedQueries.filter((query): query is string => typeof query === 'string')
        : null;
    } catch {
      return null;
    }
  });

  const seedQueries = t('search.recentSeed', { returnObjects: true });
  const recentQueries = savedQueries ?? seedQueries;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Чтобы вернуть фокус на иконку поиска после закрытия оверлея
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const trimmedSearchValue = searchValue.trim();
  // Запрос короче минимальной длины — оверлей остаётся в стартовом состоянии
  const showSuggestions = trimmedSearchValue.length >= MIN_SEARCH_QUERY_LENGTH;

  // Подсказки с API — с задержкой, чтобы не слать запрос на каждый символ.
  // Шапка вне ErrorBoundary: ошибка подсказок не должна ронять сайт
  const debouncedQuery = useDebouncedValue(trimmedSearchValue, 250);
  const { data: suggest } = useSearchSuggest(debouncedQuery, {
    enabled: searchActive && debouncedQuery.length >= MIN_SEARCH_QUERY_LENGTH,
    throwOnError: false,
  });
  const suggestions = suggest?.items ?? [];
  const foundCount = suggest?.total ?? 0;

  const openSearch = () => {
    // Оверлей и мобильное меню не могут быть открыты одновременно
    setMenuOpen(false);
    setSearchClosing(false);
    // На /search продолжаем с текущего запроса, а не с пустого поля
    setSearchValue(searchParams.get('q') ?? '');
    setSearchActive(true);
  };

  const closeSearch = () => {
    setSearchClosing(true);
  };

  const saveSearchQuery = (query: string) => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return;
    }

    setSavedQueries((previousQueries) => {
      const nextQueries = [
        normalizedQuery,
        ...(previousQueries ?? seedQueries).filter(
          (previousQuery) => previousQuery !== normalizedQuery
        ),
      ].slice(0, MAX_RECENT_QUERIES);

      try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(nextQueries));
      } catch {
        // Ignore storage quota/availability errors and keep the in-memory state.
      }

      return nextQueries;
    });
  };

  const goToSearchPage = (query: string) => {
    saveSearchQuery(query);
    closeSearch();
    navigate(`${ROUTES.search}?q=${encodeURIComponent(query)}`);
  };

  const clearSearchHistory = () => {
    setSavedQueries([]);

    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch {
      // Ignore storage availability errors.
    }
  };

  useEffect(() => {
    if (!searchActive) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSearch();
      }
    };

    const searchButton = searchButtonRef.current;

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      // Возвращаем фокус на кнопку, с которой оверлей открыли
      searchButton?.focus();
    };
  }, [searchActive]);

  return (
    <header className={clsx(styles.header, searchActive && styles.searchMode)}>
      <div className={styles.container}>
        {/* LOGO */}
        <NavLink to={ROUTES.home} className={styles.logo}>
          <img src={logo} alt={t('common.brand')} />
          <span>{t('common.brand')}</span>
        </NavLink>

        {/* NAVIGATION */}
        <nav
          className={clsx(styles.nav, menuOpen && styles.navOpen, searchActive && styles.navHidden)}
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === ROUTES.home}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              {t(link.labelKey)}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={clsx(styles.ControlsBar, searchActive && styles.controlsHidden)}>
            {/* SEARCH */}
            <button
              ref={searchButtonRef}
              className={styles.searchButton}
              onClick={() => {
                if (searchActive) {
                  closeSearch();
                  return;
                }

                openSearch();
              }}
              aria-label={searchActive ? t('header.closeSearch') : t('header.openSearch')}
              type="button"
            >
              <img src={searchIcon} alt="" />
            </button>

            {/* LANGUAGES */}
            <div
              className={styles.SegmentedControl}
              role="group"
              aria-label={t('language.switcherLabel')}
            >
              {LANGS.map((code) => (
                <SegmentedControl
                  key={code}
                  label={LANG_LABELS[code]}
                  lang={code}
                  active={lang === code}
                  onClick={() => setLang(code)}
                />
              ))}
            </div>
          </div>

          {/* BURGER */}
          <button
            className={styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t('header.openMenu')}
            type="button"
          >
            ☰
          </button>
        </div>
      </div>

      {/* SEARCH */}
      {searchActive && (
        <div
          className={clsx(styles.activeSearch, searchClosing && styles.searchClosing)}
          role="dialog"
          aria-modal="true"
          aria-label={t('search.placeholder')}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) {
              closeSearch();
            }
          }}
          onAnimationEnd={(event) => {
            if (searchClosing && event.target === event.currentTarget) {
              setSearchActive(false);
              setSearchClosing(false);
              setSearchValue('');
            }
          }}
        >
          <div className={styles.searchTop}>
            {/* LOGO */}
            <NavLink to={ROUTES.home} className={styles.searchLogo}>
              <img src={logo} alt={t('common.brand')} />
              <span>{t('common.brand')}</span>
            </NavLink>

            {/* INPUT */}
            <div className={styles.searchContainer}>
              <img src={searchIcon} alt="" />
              <input
                type="text"
                autoFocus
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter') {
                    return;
                  }

                  if (showSuggestions) {
                    goToSearchPage(trimmedSearchValue);
                    return;
                  }

                  closeSearch();
                }}
                placeholder={t('search.placeholder')}
                aria-label={t('search.placeholder')}
              />
            </div>

            <span className={styles.escapeHint}>{t('search.escapeHint')}</span>

            <button className={styles.cancelBottom} onClick={closeSearch} type="button">
              {t('search.cancel')}
            </button>
          </div>

          {/* SUGGESTIONS */}
          <div className={styles.searchSuggestions}>
            {showSuggestions ? (
              <>
                <div className={styles.suggestionsTitle}>{t('search.suggestions')}</div>

                {suggestions.length > 0
                  ? suggestions.map((item) => (
                      <NavLink
                        key={`${item.type}-${item.id}`}
                        to={getSearchItemPath(item)}
                        className={styles.suggestion}
                        onClick={() => {
                          saveSearchQuery(trimmedSearchValue);
                          closeSearch();
                        }}
                      >
                        <div className={styles.suggestionType}>
                          {t(`search.types.${item.type}`)}
                        </div>
                        <div className={styles.suggestionContent}>
                          <div className={styles.suggestionTitle}>{item.title}</div>
                          <div className={styles.suggestionMeta}>{formatSearchMeta(item)}</div>
                        </div>
                      </NavLink>
                    ))
                  : // Пока ответ не пришёл, «ничего не найдено» не показываем — только после него
                    suggest && (
                      <div className={styles.suggestionEmpty}>{t('search.nothingFound')}</div>
                    )}

                <div className={styles.allResultsRow}>
                  <button
                    className={styles.allResults}
                    type="button"
                    onClick={() => goToSearchPage(trimmedSearchValue)}
                  >
                    {t('search.allResults', { query: trimmedSearchValue })}
                  </button>

                  {suggest && (
                    <span className={styles.resultsCount}>
                      {t('search.foundCount', { count: foundCount })}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.searchStart}>
                {recentQueries.length > 0 && (
                  <>
                    <div className={styles.searchStartHeader}>
                      <span>{t('search.recent')}</span>
                      <button type="button" onClick={clearSearchHistory}>
                        {t('search.clearHistory')}
                      </button>
                    </div>

                    <div className={styles.recentQueries}>
                      {recentQueries.map((query) => (
                        <button key={query} type="button" onClick={() => setSearchValue(query)}>
                          {query}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <div className={styles.popularTitle}>{t('search.popular')}</div>
                <div className={styles.popularQueries}>
                  {POPULAR_SEARCH_SECTIONS.map((section) => (
                    <NavLink key={section.labelKey} to={section.to} onClick={closeSearch}>
                      {t(section.labelKey)}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
