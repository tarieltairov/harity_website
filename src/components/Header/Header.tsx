import styles from './Header.module.scss';
import logo from '@assets/jpeg/logo.jpeg';
import searchIcon from '@assets/icons/Search.svg';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { NAV_LINKS, ROUTES } from '@/config/routes';
import {
  MIN_SEARCH_QUERY_LENGTH,
  POPULAR_SEARCH_SECTIONS,
  RECENT_SEARCH_QUERIES,
  searchIndex,
} from '@/mocks';
import { SegmentedControl } from '@ui/SegmentedControl';

const MAX_SUGGESTIONS = 3;
const SEARCH_HISTORY_KEY = 'altyn-muras-search-history';
const MAX_RECENT_QUERIES = 5;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('РУ');
  const [searchActive, setSearchActive] = useState(false);
  const [searchClosing, setSearchClosing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [recentQueries, setRecentQueries] = useState<string[]>(() => {
    try {
      // getItem тоже внутри try: при заблокированных данных сайта он бросает
      // SecurityError, и хедер падал бы целиком
      const savedQueries = localStorage.getItem(SEARCH_HISTORY_KEY);

      if (!savedQueries) {
        return RECENT_SEARCH_QUERIES;
      }

      const parsedQueries: unknown = JSON.parse(savedQueries);

      return Array.isArray(parsedQueries)
        ? parsedQueries.filter((query): query is string => typeof query === 'string')
        : RECENT_SEARCH_QUERIES;
    } catch {
      return RECENT_SEARCH_QUERIES;
    }
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Чтобы вернуть фокус на иконку поиска после закрытия оверлея
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const items = [{ lang: 'КЫ' }, { lang: 'РУ' }, { lang: 'EN' }];

  const trimmedSearchValue = searchValue.trim();

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

    setRecentQueries((previousQueries) => {
      const nextQueries = [
        normalizedQuery,
        ...previousQueries.filter((previousQuery) => previousQuery !== normalizedQuery),
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
    setRecentQueries([]);

    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch {
      // Ignore storage availability errors.
    }
  };

  const matchedResults = useMemo(() => searchIndex(trimmedSearchValue), [trimmedSearchValue]);

  const suggestions = matchedResults.slice(0, MAX_SUGGESTIONS);

  // Запрос короче минимальной длины — оверлей остаётся в стартовом состоянии
  const showSuggestions = trimmedSearchValue.length >= MIN_SEARCH_QUERY_LENGTH;

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
          <img src={logo} alt="Алтын Мурас" />
          <span>Алтын Мурас</span>
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
              {link.label}
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
              aria-label={searchActive ? 'Закрыть поиск' : 'Открыть поиск'}
              type="button"
            >
              <img src={searchIcon} alt="" />
            </button>

            {/* LANGUAGES */}
            <div className={styles.SegmentedControl}>
              {items.map((item) => (
                <SegmentedControl
                  key={item.lang}
                  lang={item.lang}
                  active={activeLang === item.lang}
                  onClick={() => setActiveLang(item.lang)}
                />
              ))}
            </div>
          </div>

          {/* BURGER */}
          <button
            className={styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Открыть меню"
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
          aria-label="Поиск по сайту"
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
              <img src={logo} alt="Алтын Мурас" />
              <span>Алтын Мурас</span>
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
                placeholder="Поиск по сайту"
                aria-label="Поиск по сайту"
              />
            </div>

            <span className={styles.escapeHint}>Esc — закрыть</span>

            <button className={styles.cancelBottom} onClick={closeSearch} type="button">
              Отмена
            </button>
          </div>

          {/* SUGGESTIONS */}
          <div className={styles.searchSuggestions}>
            {showSuggestions ? (
              <>
                <div className={styles.suggestionsTitle}>ПОДСКАЗКИ</div>

                {suggestions.length > 0 ? (
                  suggestions.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.route}
                      className={styles.suggestion}
                      onClick={() => {
                        saveSearchQuery(trimmedSearchValue);
                        closeSearch();
                      }}
                    >
                      <div className={styles.suggestionType}>{item.type}</div>
                      <div className={styles.suggestionContent}>
                        <div className={styles.suggestionTitle}>{item.title}</div>
                        <div className={styles.suggestionMeta}>{item.date}</div>
                      </div>
                    </NavLink>
                  ))
                ) : (
                  <div className={styles.suggestionEmpty}>Ничего не найдено</div>
                )}

                <div className={styles.allResultsRow}>
                  <button
                    className={styles.allResults}
                    type="button"
                    onClick={() => goToSearchPage(trimmedSearchValue)}
                  >
                    Все результаты по «{trimmedSearchValue}» →
                  </button>

                  <span className={styles.resultsCount}>
                    Найдено {matchedResults.length} материалов
                  </span>
                </div>
              </>
            ) : (
              <div className={styles.searchStart}>
                {recentQueries.length > 0 && (
                  <>
                    <div className={styles.searchStartHeader}>
                      <span>ВЫ ИСКАЛИ</span>
                      <button type="button" onClick={clearSearchHistory}>
                        Очистить
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

                <div className={styles.popularTitle}>ПОПУЛЯРНЫЕ РАЗДЕЛЫ</div>
                <div className={styles.popularQueries}>
                  {POPULAR_SEARCH_SECTIONS.map((section) => (
                    <NavLink key={section.label} to={section.to} onClick={closeSearch}>
                      {section.label}
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
