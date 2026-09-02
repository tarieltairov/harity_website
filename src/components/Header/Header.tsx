import styles from './Header.module.scss';
import logo from '@assets/jpeg/logo.jpeg';
import searchIcon from '@assets/icons/Search.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { NAV_LINKS, ROUTES } from '@/config/routes';
import { SegmentedControl } from '@ui/SegmentedControl';

const searchSuggestions = [
  {
    route: 'news',
    type: 'Новость',
    title: 'В Оше открылся новый центр поддержки семей',
    date: '3 июля 2026',
  },
  {
    route: 'projects',
    type: 'Проект',
    title: 'Центры поддержки семей',
    date: 'Активный проект',
  },
  {
    route: 'reports',
    type: 'Документ',
    title: 'Отчёт о работе центров за 2025 год',
    date: 'PDF · 1,2 МБ',
  },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('РУ');
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

  const items = [{ lang: 'КЫ' }, { lang: 'РУ' }, { lang: 'EN' }];

  useEffect(() => {
    if (!searchActive) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchActive(false);
        setSearchValue('');
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
              onClick={() => setSearchActive(true)}
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
        <div className={styles.activeSearch}>
          <div className={styles.searchTop}>
            {/* LOGO */}
            <NavLink
              to={ROUTES.home}
              className={styles.searchLogo}
              onClick={() => {
                setSearchActive(false);
                setSearchValue('');
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
                placeholder="Поиск"
              />
            </div>

            {/* CLOSE */}
            <button
              className={styles.hintBottom}
              onClick={() => {
                setSearchActive(false);
                setSearchValue('');
              }}
              type="button"
            >
              Esc — закрыть
            </button>

            <button
              className={styles.cancelBottom}
              onClick={() => {
                setSearchActive(false);
                setSearchValue('');
              }}
              type="button"
            >
              Отмена
            </button>
          </div>

          {/* SUGGESTIONS */}
          <div className={styles.searchSuggestions}>
            <div className={styles.suggestionsTitle}>ПОДСКАЗКИ</div>

            {searchSuggestions.map((item) => (
              <NavLink
                key={item.title}
                to={`/${encodeURIComponent(item.route)}`}
                className={styles.suggestion}
                onClick={() => {
                  setSearchActive(false);
                  setSearchValue('');
                }}
              >
                <div className={styles.suggestionType}>{item.type}</div>
                <div className={styles.suggestionContent}>
                  <div className={styles.suggestionTitle}>{item.title}</div>
                  <div className={styles.suggestionMeta}>{item.date}</div>
                </div>
              </NavLink>
            ))}

            {/* КНОПКА ВСЕ РЕЗУЛЬТАТЫ */}
            <button
              className={styles.allResults}
              type="button"
              onClick={() => {
                const finalQuery = searchValue || 'центр';

                setSearchActive(false);
                // SearchPage reads its query from the "q" param
                // (useSearchParams().get('q')) — must match here, otherwise
                // the input on /search stays empty and nothing highlights.
                navigate(`/search?q=${encodeURIComponent(finalQuery)}`);
              }}
            >
              Все результаты по «{searchValue || 'центр'}» →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
