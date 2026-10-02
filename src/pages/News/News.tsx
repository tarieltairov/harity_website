import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ContentCard } from '@components/ContentCard';
import { Container } from '@components/Container';
import { SearchField } from '@ui/form';
import { FilterChip } from '@ui/FilterChip';
import styles from './News.module.scss';
import { CTABanner } from '@ui/CTABanner/CTABanner';
import { Pagination } from '@ui/Pagination/Pagination';
import { NEWS_PAGE_SIZE, useNewsCategories, useNewsList, usePopularNews } from '@/api';
import { getDetailPath, ROUTES } from '@/config/routes';
import { useFormat } from '@/i18n';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import type { NewsCategory } from '@/types';

type CategoryFilter = NewsCategory | 'all';

export function News() {
  const { t } = useTranslation();
  const { formatDate } = useFormat();
  const navigate = useNavigate();
  const [searchNews, setSearchNews] = useState('');
  const [selected, setSelected] = useState<CategoryFilter>('all');
  const [page, setPage] = useState(1);

  // Поиск по заголовку делает бэк (`?q=`): запрос уходит с задержкой, а не на каждый символ
  const query = useDebouncedValue(searchNews.trim(), 300);

  const { data: categories } = useNewsCategories();
  const { data: popularNews } = usePopularNews();
  const { data: news } = useNewsList({
    category: selected === 'all' ? undefined : selected,
    q: query || undefined,
    page,
  });

  // Чипсы и сайдбар — из /news/categories: подписи и счётчики приходят с API,
  // в словаре только «Все». Счётчики глобальные, без учёта поиска (как в контракте)
  const categoryFilters: Array<{ category: CategoryFilter; label: string; count: number }> = [
    {
      category: 'all',
      label: t('news.categories.all'),
      count: (categories ?? []).reduce((sum, item) => sum + item.count, 0),
    },
    ...(categories ?? []).map((item) => ({
      category: item.slug,
      label: item.title,
      count: item.count,
    })),
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchNews(event.target.value);
    setPage(1);
  };

  const handleFilterChange = (category: CategoryFilter) => {
    setSelected(category);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    // Пагинация внизу ленты — новую страницу показываем с начала
    window.scrollTo(0, 0);
  };

  return (
    <Container className="page">
      <div className={styles.breadcrumbs}>
        <h1 className={styles.newsfund}>{t('news.title')}</h1>
        <p className={styles.history}>{t('news.subtitle')}</p>
      </div>
      <section className={styles.news}>
        <div className={styles.toolbar}>
          <SearchField
            placeholder={t('news.searchPlaceholder')}
            aria-label={t('news.searchPlaceholder')}
            value={searchNews}
            onChange={handleSearchChange}
          />

          <div className={styles.filters}>
            {categoryFilters.map((item) => (
              <FilterChip
                key={item.category}
                isActive={selected === item.category}
                onClick={() => handleFilterChange(item.category)}
              >
                {item.label}
              </FilterChip>
            ))}
          </div>
        </div>

        <div className={styles.content}>
          {news ? (
            news.items.length > 0 ? (
              <div className={styles.cards}>
                {news.items.map((article) => (
                  <ContentCard
                    key={article.id}
                    image={article.image}
                    badgeTitle={article.category.title}
                    date={formatDate(article.publishedAt)}
                    title={article.title}
                    description={article.excerpt}
                    to={getDetailPath(ROUTES.newsDetail, article.id)}
                    showReadMore
                  />
                ))}
              </div>
            ) : (
              <p className={styles.empty}>{t('news.empty')}</p>
            )
          ) : (
            // Первая загрузка: скелетоны той же сетки, по размеру страницы ленты
            <div className={styles.cards} aria-busy="true">
              {Array.from({ length: NEWS_PAGE_SIZE }, (_, index) => (
                <ContentCard key={index} isLoading showReadMore />
              ))}
            </div>
          )}

          <aside className={styles.sidebar}>
            <section className={styles.sidebarBlock}>
              <h3 className={styles.sidebarTitle}>{t('news.categoriesTitle')}</h3>

              <ul className={styles.categoryList}>
                {categoryFilters.map((item) => (
                  <li key={item.category}>
                    <button
                      type="button"
                      className={styles.categoryButton}
                      onClick={() => handleFilterChange(item.category)}
                      aria-pressed={selected === item.category}
                    >
                      <span className={styles.categoryItemLabel}>{item.label}</span>
                      <span
                        className={styles.categoryCount}
                        data-active={selected === item.category ? 'true' : 'false'}
                      >
                        {item.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.sidebarBlock}>
              <h3 className={styles.sidebarTitle}>{t('news.popular')}</h3>

              <ul className={styles.popularList}>
                {(popularNews ?? []).map((item) => (
                  <li
                    key={item.id}
                    onClick={() => navigate(getDetailPath(ROUTES.newsDetail, item.id))}
                    className={styles.popularItem}
                  >
                    <img src={item.image} alt={item.title} className={styles.popularImage} />

                    <div>
                      <p className={styles.popularTitle}>{item.title}</p>
                      <p className={styles.popularDate}>{formatDate(item.publishedAt)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <CTABanner
              title={t('news.cta.title')}
              description={t('news.cta.description')}
              buttonText={t('common.writeUs')}
              onBtnClick={() => navigate(ROUTES.contacts)}
            />
          </aside>
        </div>
      </section>
      {news && news.totalPages > 1 && (
        <div>
          <Pagination
            className={styles.paginationNews}
            currentPage={news.page}
            totalPages={news.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </Container>
  );
}
