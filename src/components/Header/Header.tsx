import styles from './Header.module.scss';
import logo from '@assets/jpeg/logo.jpeg';
import searchIcon from '@assets/icons/Search.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { NAV_LINKS, ROUTES } from '@/config/routes';
import { POPULAR_SEARCH_QUERIES, SEARCH_INDEX, searchIndex } from '@/mocks';
import { SegmentedControl } from '@ui/SegmentedControl';

const DEFAULT_SUGGESTIONS = SEARCH_INDEX.slice(0, 3);
const MAX_SUGGESTIONS = 5;
const SEARCH_HISTORY_KEY = 'altyn-muras-search-history';
const MAX_RECENT_QUERIES = 5;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('РУ');
  const [searchActive, setSearchActive] = useState(false);
  const [searchClosing, setSearchClosing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [recentQueries, setRecentQueries] = useState<string[]>(() => {
    const savedQueries = localStorage.getItem(SEARCH_HISTORY_KEY);

    if (!savedQueries) {
      return [];
    }

    try {
      const parsedQueries: unknown = JSON.parse(savedQueries);

      return Array.isArray(parsedQueries)
        ? parsedQueries.filter((query): query is string => typeof query === 'string')
        : [];
    } catch {
      return [];
    }
  });

  const navigate = useNavigate();

  const items = [{ lang: 'КЫ' }, { lang: 'РУ' }, { lang: 'EN' }];

  const trimmedSearchValue = searchValue.trim();

  const openSearch = () => {
    setSearchClosing(false);
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

      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(nextQueries));

      return nextQueries;
    });
  };

  const clearSearchHistory = () => {
    setRecentQueries([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  const suggestions = useMemo(
    () =>
      trimmedSearchValue
        ? searchIndex(trimmedSearchValue).slice(0, MAX_SUGGESTIONS)
        : DEFAULT_SUGGESTIONS,
    [trimmedSearchValue]
  );

  useEffect(() => {
    if (!searchActive) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSearch();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [searchActive]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* LOGO */}
        <NavLink to={ROUTES.home} className={styles.logo}>
          <img src={logo} alt="Алтын Мурас" />
          <span>Алтын Мурас</span>
        </NavLink>

        {/* NAVIGATION */}
        <nav className={clsx(styles.nav, menuOpen && styles.navOpen)}>
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
          <div className={styles.ControlsBar}>
            {/* SEARCH */}
            <button
              className={styles.searchButton}
              onClick={openSearch}
              aria-label="Открыть поиск"
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
            <NavLink
              to={ROUTES.home}
              className={styles.searchLogo}
              onClick={() => {
                closeSearch();
              }}
            >
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
                  if (event.key === 'Enter') {
                    closeSearch();

                    if (trimmedSearchValue) {
                      saveSearchQuery(trimmedSearchValue);
                      navigate(`/search?q=${encodeURIComponent(trimmedSearchValue)}`);
                    }
                  }
                }}
                placeholder="Поиск"
              />
            </div>

            <span className={styles.escapeHint}>Esc — закрыть</span>

            <button className={styles.cancelBottom} onClick={closeSearch} type="button">
              Отмена
            </button>
          </div>

          {/* SUGGESTIONS */}
          <div
            className={clsx(
              styles.searchSuggestions,
              !trimmedSearchValue && styles.searchSuggestionsInitial
            )}
          >
            {trimmedSearchValue ? (
              <>
                <div className={styles.suggestionsTitle}>СОВПАДЕНИЯ</div>

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

                {suggestions.length > 0 && (
                  <button
                    className={styles.allResults}
                    type="button"
                    onClick={() => {
                      saveSearchQuery(trimmedSearchValue);
                      closeSearch();
                      navigate(`/search?q=${encodeURIComponent(trimmedSearchValue)}`);
                    }}
                  >
                    Все результаты по «{trimmedSearchValue}» →
                  </button>
                )}
              </>
            ) : (
              <div className={styles.mobileSearchStart}>
                <div className={styles.mobileSearchHeader}>
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

                <div className={styles.popularTitle}>ПОПУЛЯРНЫЕ РАЗДЕЛЫ</div>
                <div className={styles.popularQueries}>
                  {POPULAR_SEARCH_QUERIES.map((query) => (
                    <button key={query} type="button" onClick={() => setSearchValue(query)}>
                      {query}
                    </button>
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
