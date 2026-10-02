import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { keepPreviousData, useQueries } from '@tanstack/react-query';

import { Container } from '@components/Container';
import { Loader } from '@ui/Loader';
import { Pagination } from '@ui/Pagination';
import { searchOptions, useSearch } from '@/api';
import {
  getSearchItemPath,
  MIN_SEARCH_QUERY_LENGTH,
  POPULAR_SEARCH_SECTIONS,
  SEARCH_TYPES,
} from '@/config/search';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useFormat, useLang } from '@/i18n';
import type { SearchItem, SearchType } from '@/types';

import styles from './SearchPage.module.scss';

type TypeFilter = 'all' | SearchType;
type PeriodFilter = 'all' | number;

// Подписи фильтров — `search.typeFilters`, во множественном числе, в отличие
// от бейджа на карточке результата («Новость» на карточке vs «Новости» в фильтре).
const typeFilters: TypeFilter[] = ['all', ...SEARCH_TYPES];

// Брейкпоинт накопительной выдачи — тот же, что в SearchPage.module.scss (.mobileResultsGroup)
const MOBILE_QUERY = '(max-width: 700px)';

export function SearchPage() {
  const { t } = useTranslation();
  const lang = useLang();
  const { formatSearchMeta } = useFormat();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  const query = searchParams.get('q') ?? '';
  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length >= MIN_SEARCH_QUERY_LENGTH;

  // Поле поиска пишет прямо в адрес — в API запрос уходит с задержкой, а не на каждый символ
  const debouncedQuery = useDebouncedValue(trimmedQuery, 300);
  const canSearch = hasQuery && debouncedQuery.length >= MIN_SEARCH_QUERY_LENGTH;

  const [activeType, setActiveType] = useState<TypeFilter>('all');
  const [activePeriod, setActivePeriod] = useState<PeriodFilter>('all');

  // Десктоп/планшет — номера страниц, по одной странице результатов за раз.
  const [page, setPage] = useState(1);
  // Мобильный — накопительная подгрузка: страницы 1…loadedPages, «Показать ещё» докладывает следующую.
  const [loadedPages, setLoadedPages] = useState(1);

  const resetPagination = () => {
    setPage(1);
    setLoadedPages(1);
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
    setLoadedPages(1);
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

  // Фильтры по типу и году применяет бэк; счётчики в ответе не зависят от типа (контракт)
  const baseParams = {
    q: debouncedQuery,
    type: activeType === 'all' ? undefined : activeType,
    year: activePeriod === 'all' ? undefined : activePeriod,
  };

  const desktopResult = useSearch({ ...baseParams, page }, { enabled: canSearch && !isMobile });

  const mobileResults = useQueries({
    queries:
      canSearch && isMobile
        ? Array.from({ length: loadedPages }, (_, index) => ({
            ...searchOptions({ ...baseParams, page: index + 1 }, lang),
            placeholderData: keepPreviousData,
          }))
        : [],
  });

  // Счётчики, годы и итоги — из первой страницы; у десктопа она же текущая
  const firstPage = isMobile ? mobileResults[0]?.data : desktopResult.data;
  const results: SearchItem[] = isMobile
    ? mobileResults.flatMap((result) => result.data?.items ?? [])
    : (desktopResult.data?.items ?? []);
  const isLoadingMore = isMobile && mobileResults.some((result) => result.isPending);

  const hasActiveFilters = activeType !== 'all' || activePeriod !== 'all';
  // «Ничего не нашлось» — только без фильтров: с фильтрами показываем их и кнопку сброса
  const hasMatches = firstPage !== undefined && (firstPage.total > 0 || hasActiveFilters);

  const total = firstPage?.total ?? 0;
  const totalPages = firstPage?.totalPages ?? 1;
  const typeCounts = firstPage?.counts;
  const periodFilters: PeriodFilter[] = ['all', ...(firstPage?.years ?? [])];

  const remainingMobileCount = Math.max(total - results.length, 0);
  const nextMobileBatch = Math.min(firstPage?.pageSize ?? 0, remainingMobileCount);

  const renderResultItem = (result: SearchItem) => (
    <li key={`${result.type}-${result.id}`} className={styles.resultItem}>
      <div className={styles.resultMetaTop}>
        <span className={styles.resultType}>{t(`search.types.${result.type}`)}</span>
        <span className={styles.resultDate}>{formatSearchMeta(result)}</span>
      </div>

      <Link to={getSearchItemPath(result)} className={styles.resultTitle}>
        {highlight(result.title, trimmedQuery)}
      </Link>

      <p className={styles.resultDescription}>{highlight(result.snippet, trimmedQuery)}</p>
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
        {POPULAR_SEARCH_SECTIONS.map((section) => (
          <Link key={section.labelKey} to={section.to} className={styles.placeholderSection}>
            {t(section.labelKey)}
          </Link>
        ))}
      </div>
    </>
  );

  const renderTypeFilterLabel = (type: TypeFilter) => t(`search.typeFilters.${type}`);

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
            <p className={styles.subtitle}>{t('search.page.subtitle', { count: total })}</p>
          </>
        )}

        {hasQuery && !firstPage ? (
          // Первая загрузка выдачи
          <Loader />
        ) : hasMatches ? (
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
                  {renderTypeFilterLabel(type)}
                  <span className={styles.pillCount}>{typeCounts?.[type] ?? 0}</span>
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
                        <span>{renderTypeFilterLabel(type)}</span>
                        <span className={styles.count}>{typeCounts?.[type] ?? 0}</span>
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
                {total === 0 ? (
                  // Запрос что-то находит, но текущие фильтры — нет. Фильтры остаются
                  // на месте, иначе из этого состояния некуда вернуться.
                  <div className={styles.empty}>
                    <p>{t('search.page.emptyFilters')}</p>
                    <button type="button" className={styles.emptyReset} onClick={resetFilters}>
                      {t('search.page.resetFilters')}
                    </button>
                  </div>
                ) : isMobile ? (
                  // Мобильный: накопительная выдача + «Показать ещё»
                  <div className={styles.mobileResultsGroup}>
                    <ul className={styles.results}>{results.map(renderResultItem)}</ul>

                    {remainingMobileCount > 0 && (
                      <div className={styles.loadMore}>
                        <button
                          type="button"
                          className={styles.loadMoreButton}
                          disabled={isLoadingMore}
                          onClick={() => setLoadedPages((prev) => Math.min(prev + 1, totalPages))}
                        >
                          {t('search.page.showMore', { count: nextMobileBatch })}
                        </button>

                        <span className={styles.loadMoreStatus}>
                          {t('search.page.shown', { visible: results.length, total })}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  // Десктоп/планшет: одна страница результатов + номера страниц
                  <div className={styles.desktopResultsGroup}>
                    <ul className={styles.results}>{results.map(renderResultItem)}</ul>

                    {totalPages > 1 && (
                      <Pagination
                        className={styles.pagination}
                        currentPage={Math.min(page, totalPages)}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        showPrevArrow
                      />
                    )}
                  </div>
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
