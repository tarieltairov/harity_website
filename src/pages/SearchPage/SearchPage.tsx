import { Link, useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';

import { Container } from '@components/Container';
import { Pagination } from '@ui/Pagination';
import {
  MIN_SEARCH_QUERY_LENGTH,
  POPULAR_SEARCH_SECTIONS,
  SEARCH_TYPES,
  SEARCH_YEARS,
  searchIndex,
} from '@/mocks';
import type { SearchIndexItem, SearchResultType } from '@/types';

import styles from './SearchPage.module.scss';

type TypeFilter = 'Все' | SearchResultType;
type PeriodFilter = 'Все' | number;

const typeFilters: TypeFilter[] = ['Все', ...SEARCH_TYPES];
const periodFilters: PeriodFilter[] = ['Все', ...SEARCH_YEARS];

// Подписи фильтров — во множественном числе, в отличие от бейджа на карточке
// результата («Новость» на карточке vs «Новости» в фильтре).
const TYPE_FILTER_LABELS: Record<TypeFilter, string> = {
  Все: 'Все',
  Новость: 'Новости',
  Проект: 'Проекты',
  Документ: 'Документы',
};

const periodLabel = (period: PeriodFilter) => (period === 'Все' ? 'За всё время' : `${period} год`);

// Макет экрана 11: 5 результатов на страницу.
// Контракт (docs/api-contract.md) закладывает pageSize=10 — поменяется вместе с API.
const PER_PAGE = 5;

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') ?? '';
  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length >= MIN_SEARCH_QUERY_LENGTH;

  const [activeType, setActiveType] = useState<TypeFilter>('Все');
  const [activePeriod, setActivePeriod] = useState<PeriodFilter>('Все');

  // Десктоп/планшет — номера страниц, по одной странице результатов за раз.
  const [page, setPage] = useState(1);
  // Мобильный — накопительная подгрузка по PER_PAGE за нажатие.
  const [mobileVisibleCount, setMobileVisibleCount] = useState(PER_PAGE);

  const resetPagination = () => {
    setPage(1);
    setMobileVisibleCount(PER_PAGE);
  };

  const resetFilters = () => {
    setActiveType('Все');
    setActivePeriod('Все');
    resetPagination();
  };

  // Запрос может смениться и снаружи (поиск из шапки, кнопка «назад»), а страница
  // при этом не перемонтируется. Сбрасываем фильтры и пагинацию прямо в рендере —
  // так React отрабатывает смену за один проход, без лишнего кадра со старым состоянием.
  const [renderedQuery, setRenderedQuery] = useState(query);

  if (renderedQuery !== query) {
    setRenderedQuery(query);
    setActiveType('Все');
    setActivePeriod('Все');
    setPage(1);
    setMobileVisibleCount(PER_PAGE);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;

    // replace, иначе каждый введённый символ оседает отдельной записью в истории
    setSearchParams(nextValue.trim() ? { q: nextValue } : {}, { replace: true });
    resetPagination();
  };

  const clearSearch = () => {
    setSearchParams({}, { replace: true });
    resetFilters();
  };

  const queryMatches = useMemo(
    () => (hasQuery ? searchIndex(trimmedQuery) : []),
    [hasQuery, trimmedQuery]
  );

  const hasMatches = queryMatches.length > 0;

  // Результаты по запросу и периоду, но без фильтра по типу:
  // из них считаются счётчики, которые в макете не зависят от выбранного типа.
  const resultsBeforeTypeFilter = useMemo(
    () => queryMatches.filter((result) => activePeriod === 'Все' || result.year === activePeriod),
    [queryMatches, activePeriod]
  );

  const filteredResults = useMemo(
    () =>
      resultsBeforeTypeFilter.filter(
        (result) => activeType === 'Все' || result.type === activeType
      ),
    [resultsBeforeTypeFilter, activeType]
  );

  const typeCounts = useMemo(() => {
    const counts = { Все: resultsBeforeTypeFilter.length } as Record<TypeFilter, number>;

    for (const type of SEARCH_TYPES) {
      counts[type] = resultsBeforeTypeFilter.filter((result) => result.type === type).length;
    }

    return counts;
  }, [resultsBeforeTypeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredResults.length / PER_PAGE));
  // Фильтр мог сократить выдачу сильнее, чем ожидала текущая страница
  const currentPage = Math.min(page, totalPages);

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * PER_PAGE;

    return filteredResults.slice(startIndex, startIndex + PER_PAGE);
  }, [filteredResults, currentPage]);

  const mobileResults = useMemo(
    () => filteredResults.slice(0, mobileVisibleCount),
    [filteredResults, mobileVisibleCount]
  );

  const visibleMobileCount = mobileResults.length;
  const remainingMobileCount = filteredResults.length - visibleMobileCount;

  const renderResultItem = (result: SearchIndexItem) => (
    <li key={result.id} className={styles.resultItem}>
      <div className={styles.resultMetaTop}>
        <span className={styles.resultType}>{result.type}</span>
        <span className={styles.resultDate}>{result.date}</span>
      </div>

      <Link to={result.route} className={styles.resultTitle}>
        {highlight(result.title, trimmedQuery)}
      </Link>

      <p className={styles.resultDescription}>{highlight(result.description, trimmedQuery)}</p>
    </li>
  );

  // Три пустых состояния: запроса нет, запрос короче минимальной длины
  // и «ничего не нашлось» по нормальному запросу (экран 11).
  const isTooShortQuery = trimmedQuery.length > 0 && !hasQuery;

  const placeholderTitle = hasQuery
    ? 'Ничего не нашлось'
    : isTooShortQuery
      ? 'Слишком короткий запрос'
      : 'Что будем искать?';

  const placeholderText = hasQuery
    ? `По запросу «${trimmedQuery}» материалов нет. Проверьте написание или попробуйте более короткий запрос.`
    : isTooShortQuery
      ? `Для поиска нужно хотя бы ${MIN_SEARCH_QUERY_LENGTH} символа.`
      : 'Введите запрос — мы поищем по новостям, проектам и документам фонда.';

  const renderPopularSections = () => (
    <>
      <div className={styles.placeholderHint}>Возможно, вам нужно</div>
      <div className={styles.placeholderSections}>
        {POPULAR_SEARCH_SECTIONS.map((section) => (
          <Link key={section.label} to={section.to} className={styles.placeholderSection}>
            {section.label}
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <Container className="page">
      <div className={styles.searchPage}>
        <div className={styles.searchTop}>
          <div className={styles.searchBox}>
            <svg
              className={styles.searchIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
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

        {/* На экране «ничего не нашлось» заголовок и счётчик не показываем — как в макете */}
        {hasMatches && (
          <>
            <h1 className={styles.title}>Результаты по запросу «{trimmedQuery}»</h1>
            <p className={styles.subtitle}>
              Найдено {filteredResults.length} материалов · сортировка: по релевантности
            </p>
          </>
        )}

        {hasMatches ? (
          <>
            {/* Мобильная строка фильтров по типу: на мобильном сайдбар не показываем */}
            <div className={styles.mobileFilters}>
              {typeFilters.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`${styles.filterPill} ${
                    activeType === type ? styles.filterPillActive : ''
                  }`}
                  onClick={() => {
                    setActiveType(type);
                    resetPagination();
                  }}
                >
                  {TYPE_FILTER_LABELS[type]}
                  <span className={styles.pillCount}>{typeCounts[type]}</span>
                </button>
              ))}
            </div>

            <div className={styles.content}>
              <aside className={styles.sidebar}>
                <div className={styles.filterBlock}>
                  <div className={styles.filterTitle}>ТИП МАТЕРИАЛА</div>

                  <div className={styles.typeList}>
                    {typeFilters.map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`${styles.typeButton} ${
                          activeType === type ? styles.active : ''
                        }`}
                        onClick={() => {
                          setActiveType(type);
                          resetPagination();
                        }}
                      >
                        <span>{TYPE_FILTER_LABELS[type]}</span>
                        <span className={styles.count}>{typeCounts[type]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.sidebarDivider} />

                <div className={styles.filterBlock}>
                  <div className={styles.filterTitle}>ПЕРИОД</div>

                  <div className={styles.periodList}>
                    {periodFilters.map((period) => (
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
                        {periodLabel(period)}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              <section className={styles.resultsWrapper}>
                {filteredResults.length === 0 ? (
                  // Запрос что-то находит, но текущие фильтры — нет. Фильтры остаются
                  // на месте, иначе из этого состояния некуда вернуться.
                  <div className={styles.empty}>
                    <p>По выбранным фильтрам ничего не найдено.</p>
                    <button type="button" className={styles.emptyReset} onClick={resetFilters}>
                      Сбросить фильтры
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Десктоп/планшет: одна страница результатов + номера страниц */}
                    <div className={styles.desktopResultsGroup}>
                      <ul className={styles.results}>{paginatedResults.map(renderResultItem)}</ul>

                      {totalPages > 1 && (
                        <Pagination
                          className={styles.pagination}
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={setPage}
                          showPrevArrow
                        />
                      )}
                    </div>

                    {/* Мобильный: накопительная выдача + «Показать ещё» */}
                    <div className={styles.mobileResultsGroup}>
                      <ul className={styles.results}>{mobileResults.map(renderResultItem)}</ul>

                      {remainingMobileCount > 0 && (
                        <div className={styles.loadMore}>
                          <button
                            type="button"
                            className={styles.loadMoreButton}
                            onClick={() => setMobileVisibleCount((prev) => prev + PER_PAGE)}
                          >
                            Показать ещё {Math.min(PER_PAGE, remainingMobileCount)}
                          </button>

                          <span className={styles.loadMoreStatus}>
                            Показано {visibleMobileCount} из {filteredResults.length}
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </section>
            </div>
          </>
        ) : (
          <div className={styles.placeholder}>
            <h2 className={styles.placeholderTitle}>{placeholderTitle}</h2>
            <p className={styles.placeholderText}>{placeholderText}</p>
            {renderPopularSections()}
          </div>
        )}
      </div>
    </Container>
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlight(text: string, query: string) {
  if (!query) {
    return text;
  }

  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');

  // split с группой захвата: совпадения оказываются на нечётных позициях
  return text
    .split(regex)
    .map((part, index) => (index % 2 === 1 ? <mark key={index}>{part}</mark> : part));
}
