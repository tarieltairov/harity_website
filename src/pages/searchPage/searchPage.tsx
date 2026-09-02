import { Link, useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';

import styles from './SearchPage.module.scss';

type ResultType = 'Все' | 'Новость' | 'Проект' | 'Документ';
type Period = 'Все' | '2026' | '2025';

interface SearchResult {
  id: number;
  type: Exclude<ResultType, 'Все'>;
  title: string;
  description: string;
  date: string;
  year: number;
  route: string;
}

const mockResults: SearchResult[] = [
  {
    id: 1,
    type: 'Новость',
    title: 'В Оше открылся новейший центр поддержки семей',
    description:
      'Третий по счёту центр поддержки семей открылся в Ошской области — здесь бесплатно принимают юрист, психолог и социальный работник.',
    date: '3 июля 2026',
    year: 2026,
    route: '/news',
  },
  {
    id: 2,
    type: 'Проект',
    title: 'Центры поддержки семей',
    description:
      'Психологическая и юридическая помощь многодетным семьям. Работают Центры в Бишкеке, Оше и Нарыне.',
    date: 'Активный проект',
    year: 2026,
    route: '/projects',
  },
  {
    id: 3,
    type: 'Документ',
    title: 'Отчёт о работе центров за 2025 год',
    description:
      'Посещаемость, структура обращений и расходы по каждому центру за отчётный период.',
    date: 'PDF · 1,2 МБ',
    year: 2025,
    route: '/reports',
  },
  {
    id: 4,
    type: 'Новость',
    title: 'Стартовал образовательный курс для сельских учителей',
    description: 'Занятия проходят на базе в Нарыне: 90 учителей из 24 школ.',
    date: '5 июня 2026',
    year: 2026,
    route: '/news',
  },
  {
    id: 5,
    type: 'Документ',
    title: 'Как устроена работа центров фонда',
    description: 'Основные направления работы и порядок оказания помощи в центрах фонда.',
    date: '2025',
    year: 2025,
    route: '/reports',
  },
];

const types: ResultType[] = ['Все', 'Новость', 'Проект', 'Документ'];

// Sidebar / filter-pill labels differ from the singular type badges shown
// on each result card ("Новость" on the card vs "Новости" in the filter).
const typeLabels: Record<ResultType, string> = {
  Все: 'Все',
  Новость: 'Новости',
  Проект: 'Проекты',
  Документ: 'Документы',
};

const periods: Period[] = ['Все', '2026', '2025'];

const PER_PAGE = 3;

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') ?? '';

  const [activeType, setActiveType] = useState<ResultType>('Все');
  const [activePeriod, setActivePeriod] = useState<Period>('Все');

  // Desktop / tablet: numbered pagination, one page of results at a time.
  const [page, setPage] = useState(1);
  // Mobile: cumulative "load more" — grows by PER_PAGE each tap.
  const [mobileVisibleCount, setMobileVisibleCount] = useState(PER_PAGE);

  const resetPagination = () => {
    setPage(1);
    setMobileVisibleCount(PER_PAGE);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      q: event.target.value,
    });

    resetPagination();
  };

  const clearSearch = () => {
    setSearchParams({});
    resetPagination();
  };

  const filteredResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return mockResults.filter((result) => {
      const searchableText = `
        ${result.title}
        ${result.description}
      `.toLowerCase();

      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);

      const matchesType = activeType === 'Все' || result.type === activeType;

      const matchesPeriod = activePeriod === 'Все' || result.year.toString() === activePeriod;

      return matchesQuery && matchesType && matchesPeriod;
    });
  }, [query, activeType, activePeriod]);

  const totalPages = Math.ceil(filteredResults.length / PER_PAGE);

  const paginatedResults = useMemo(() => {
    const startIndex = (page - 1) * PER_PAGE;

    return filteredResults.slice(startIndex, startIndex + PER_PAGE);
  }, [filteredResults, page]);

  const mobileResults = useMemo(
    () => filteredResults.slice(0, mobileVisibleCount),
    [filteredResults, mobileVisibleCount]
  );

  const hasMoreMobileResults = mobileVisibleCount < filteredResults.length;

  const typeCounts = useMemo(() => {
    return {
      Все: filteredResults.length,
      Новость: filteredResults.filter((item) => item.type === 'Новость').length,
      Проект: filteredResults.filter((item) => item.type === 'Проект').length,
      Документ: filteredResults.filter((item) => item.type === 'Документ').length,
    };
  }, [filteredResults]);

  const renderResultItem = (result: SearchResult) => (
    <li key={result.id} className={styles.resultItem}>
      <div className={styles.resultMetaTop}>
        <span className={styles.resultType}>{result.type}</span>
        <span className={styles.resultDate}>{result.date}</span>
      </div>

      <Link to={result.route} className={styles.resultTitle}>
        {highlight(result.title, query)}
      </Link>

      <p className={styles.resultDescription}>{highlight(result.description, query)}</p>
    </li>
  );

  return (
    <main className={styles.searchPage}>
      <div className={styles.searchTop}>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
            <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Поиск"
            aria-label="Поиск"
          />

          {query && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={clearSearch}
              aria-label="Очистить поиск"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <h1 className={styles.title}>Результаты по запросу «{query}»</h1>

      <p className={styles.subtitle}>
        Найдено {filteredResults.length} материалов · сортировка: по релевантности
      </p>

      {/* Mobile-only horizontally scrollable filter pills */}
      <div className={styles.mobileFilters}>
        {types.map((type) => (
          <button
            key={type}
            type="button"
            className={`${styles.filterPill} ${activeType === type ? styles.filterPillActive : ''}`}
            onClick={() => {
              setActiveType(type);
              resetPagination();
            }}
          >
            {typeLabels[type]}
            <span className={styles.pillCount}>{typeCounts[type]}</span>
          </button>
        ))}
      </div>

      <div className={styles.mobileFilters}>
        {periods.map((period) => (
          <button
            key={period}
            type="button"
            className={`${styles.filterPill} ${
              activePeriod === period ? styles.filterPillActive : ''
            }`}
            onClick={() => {
              setActivePeriod(period);
              resetPagination();
            }}
          >
            {period === 'Все' ? 'За всё время' : `${period} год`}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <div className={styles.filterBlock}>
            <div className={styles.filterTitle}>ТИП МАТЕРИАЛА</div>

            <div className={styles.typeList}>
              {types.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`${styles.typeButton} ${activeType === type ? styles.active : ''}`}
                  onClick={() => {
                    setActiveType(type);
                    resetPagination();
                  }}
                >
                  <span>{typeLabels[type]}</span>
                  <span className={styles.count}>{typeCounts[type]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sidebarDivider} />

          <div className={styles.filterBlock}>
            <div className={styles.filterTitle}>ПЕРИОД</div>

            <div className={styles.periodList}>
              {periods.map((period) => (
                <button
                  key={period}
                  type="button"
                  className={`${styles.periodButton} ${
                    activePeriod === period ? styles.periodActive : ''
                  }`}
                  onClick={() => {
                    setActivePeriod(period);
                    resetPagination();
                  }}
                >
                  {period === 'Все' ? 'За всё время' : `${period} год`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className={styles.resultsWrapper}>
          {/* Desktop / tablet: single page of results + numbered pagination */}
          <div className={styles.desktopResultsGroup}>
            {paginatedResults.length > 0 ? (
              <ul className={styles.results}>{paginatedResults.map(renderResultItem)}</ul>
            ) : (
              <div className={styles.empty}>По вашему запросу ничего не найдено.</div>
            )}

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  type="button"
                  className={styles.paginationArrow}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page === 1}
                  aria-label="Предыдущая страница"
                >
                  ←
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    className={page === pageNumber ? styles.paginationActive : ''}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  className={styles.paginationArrow}
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={page === totalPages}
                  aria-label="Следующая страница"
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Mobile: cumulative results + "load more" button */}
          <div className={styles.mobileResultsGroup}>
            {mobileResults.length > 0 ? (
              <ul className={styles.results}>{mobileResults.map(renderResultItem)}</ul>
            ) : (
              <div className={styles.empty}>По вашему запросу ничего не найдено.</div>
            )}

            {hasMoreMobileResults && (
              <button
                type="button"
                className={styles.loadMoreButton}
                onClick={() => setMobileVisibleCount((prev) => prev + PER_PAGE)}
              >
                Показать ещё
                <span className={styles.loadMoreCount}>
                  {filteredResults.length - mobileVisibleCount}
                </span>
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlight(text: string, query: string) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return text;
  }

  const regex = new RegExp(`(${escapeRegExp(normalizedQuery)})`, 'gi');

  return text.split(regex).map((part, index) => {
    const isMatch = part.toLowerCase() === normalizedQuery.toLowerCase();

    return isMatch ? <mark key={index}>{part}</mark> : part;
  });
}
