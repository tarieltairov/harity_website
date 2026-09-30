import { Link, useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@components/Container';
import { Pagination } from '@ui/Pagination';
import { useFormat, useLang } from '@/i18n';
import {
  getPopularSearchSections,
  MIN_SEARCH_QUERY_LENGTH,
  SEARCH_TYPES,
  SEARCH_YEARS,
  searchIndex,
} from '@/mocks';
import type { SearchIndexItem, SearchResultType } from '@/types';

import styles from './SearchPage.module.scss';

type TypeFilter = 'all' | SearchResultType;
type PeriodFilter = 'all' | number;

// Подписи фильтров — `search.typeFilters`, во множественном числе, в отличие
// от бейджа на карточке результата («Новость» на карточке vs «Новости» в фильтре).
const typeFilters: TypeFilter[] = ['all', ...SEARCH_TYPES];
const periodFilters: PeriodFilter[] = ['all', ...SEARCH_YEARS];

// Макет экрана 11: 5 результатов на страницу.
// Контракт (docs/api-contract.md) закладывает pageSize=10 — поменяется вместе с API.
const PER_PAGE = 5;

export function SearchPage() {
  const { t } = useTranslation();
  const lang = useLang();
  const { formatSearchMeta } = useFormat();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') ?? '';
  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length >= MIN_SEARCH_QUERY_LENGTH;

  const [activeType, setActiveType] = useState<TypeFilter>('all');
  const [activePeriod, setActivePeriod] = useState<PeriodFilter>('all');

  // Десктоп/планшет — номера страниц, по одной странице результатов за раз.
  const [page, setPage] = useState(1);
  // Мобильный — накопительная подгрузка по PER_PAGE за нажатие.
  const [mobileVisibleCount, setMobileVisibleCount] = useState(PER_PAGE);

  const resetPagination = () => {
    setPage(1);
    setMobileVisibleCount(PER_PAGE);
  };

  const resetFilters = () => {
    setActiveType('all');
    setActivePeriod('all');
    resetPagination();
  };

  // Запрос может смениться и снаружи (поиск из шапки, кнопка «назад»), а страница
  // при этом не перемонтируется. Сбрасываем фильтры и пагинацию прямо в рендере —
  // так React отрабатывает смену за один проход, без лишнего кадра со старым состоянием.
  const [renderedQuery, setRenderedQuery] = useState(query);

  if (renderedQuery !== query) {
    setRenderedQuery(query);
    setActiveType('all');
    setActivePeriod('all');
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
    () => (hasQuery ? searchIndex(trimmedQuery, lang) : []),
    [hasQuery, trimmedQuery, lang]
  );

  const hasMatches = queryMatches.length > 0;

  // Результаты по запросу и периоду, но без фильтра по типу:
  // из них считаются счётчики, которые в макете не зависят от выбранного типа.
  const resultsBeforeTypeFilter = useMemo(
    () => queryMatches.filter((result) => activePeriod === 'all' || result.year === activePeriod),
    [queryMatches, activePeriod]
  );

  const filteredResults = useMemo(
    () =>
      resultsBeforeTypeFilter.filter(
        (result) => activeType === 'all' || result.type === activeType
      ),
    [resultsBeforeTypeFilter, activeType]
  );

  const typeCounts = useMemo(() => {
    const counts = { all: resultsBeforeTypeFilter.length } as Record<TypeFilter, number>;

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
        <span className={styles.resultType}>{t(`search.types.${result.type}`)}</span>
        <span className={styles.resultDate}>{formatSearchMeta(result)}</span>
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
    ? t('search.page.noResultsTitle')
    : isTooShortQuery
      ? t('search.page.tooShortTitle')
      : t('search.page.startTitle');

  const placeholderText = hasQuery
    ? t('search.page.noResultsText', { query: trimmedQuery })
    : isTooShortQuery
      ? t('search.page.tooShortText', { count: MIN_SEARCH_QUERY_LENGTH })
      : t('search.page.startText');

  const periodLabel = (period: PeriodFilter) =>
    period === 'all' ? t('search.page.allTime') : t('search.page.year', { year: period });

  const renderPopularSections = () => (
    <>
      <div className={styles.placeholderHint}>{t('search.page.maybe')}</div>
      <div className={styles.placeholderSections}>
        {getPopularSearchSections(lang).map((section) => (
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
              placeholder={t('search.page.placeholder')}
              aria-label={t('search.page.placeholder')}
            />

            {query && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={clearSearch}
                aria-label={t('search.page.clear')}
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* На экране «ничего не нашлось» заголовок и счётчик не показываем — как в макете */}
        {hasMatches && (
          <>
            <h1 className={styles.title}>{t('search.page.title', { query: trimmedQuery })}</h1>
            <p className={styles.subtitle}>
              {t('search.page.subtitle', { count: filteredResults.length })}
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
                  {t(`search.typeFilters.${type}`)}
                  <span className={styles.pillCount}>{typeCounts[type]}</span>
                </button>
              ))}
            </div>

            <div className={styles.content}>
              <aside className={styles.sidebar}>
                <div className={styles.filterBlock}>
                  <div className={styles.filterTitle}>{t('search.page.typeTitle')}</div>

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
                        <span>{t(`search.typeFilters.${type}`)}</span>
                        <span className={styles.count}>{typeCounts[type]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.sidebarDivider} />

                <div className={styles.filterBlock}>
                  <div className={styles.filterTitle}>{t('search.page.periodTitle')}</div>

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
                    <p>{t('search.page.emptyFilters')}</p>
                    <button type="button" className={styles.emptyReset} onClick={resetFilters}>
                      {t('search.page.resetFilters')}
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
                            {t('search.page.showMore', {
                              count: Math.min(PER_PAGE, remainingMobileCount),
                            })}
                          </button>

                          <span className={styles.loadMoreStatus}>
                            {t('search.page.shown', {
                              visible: visibleMobileCount,
                              total: filteredResults.length,
                            })}
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
