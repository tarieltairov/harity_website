import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ContentCard } from '@components/ContentCard';
import { Container } from '@components/Container';
import { SearchField } from '@ui/form';
import { FilterChip } from '@ui/FilterChip';
import styles from './News.module.scss';
import { CTABanner } from '@ui/CTABanner/CTABanner';
import { Pagination } from '@ui/Pagination/Pagination';
import { getNewsArticles, getPopularNews, NEWS_CATEGORIES } from '@/mocks';
import { getDetailPath, ROUTES } from '@/config/routes';
import { useFormat, useLang } from '@/i18n';
import type { NewsCategory } from '@/types';

type CategoryFilter = NewsCategory | 'all';

const CATEGORY_FILTERS: CategoryFilter[] = ['all', ...NEWS_CATEGORIES];

export function News() {
  const { t } = useTranslation();
  const lang = useLang();
  const { formatDate } = useFormat();
  const navigate = useNavigate();
  const [searchNews, setSearchNews] = useState('');
  const [selected, setSelected] = useState<CategoryFilter>('all');

  const articles = getNewsArticles(lang);

  const categories = useMemo(
    () =>
      CATEGORY_FILTERS.map((category) => ({
        category,
        count:
          category === 'all'
            ? articles.length
            : articles.filter((article) => article.category === category).length,
      })),
    [articles]
  );

  const filteredNews = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchNews.toLowerCase());
    const matchesFilter = selected === 'all' || article.category === selected;
    return matchesSearch && matchesFilter;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchNews(event.target.value);
  };

  const handleFilterChange = (category: CategoryFilter) => {
    setSelected(category);
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
            {CATEGORY_FILTERS.map((category) => (
              <FilterChip
                key={category}
                isActive={selected === category}
                onClick={() => handleFilterChange(category)}
              >
                {t(`news.categories.${category}`)}
              </FilterChip>
            ))}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.cards}>
            {filteredNews.map((article) => (
              <ContentCard
                key={article.id}
                image={article.image}
                badgeTitle={t(`news.categories.${article.category}`)}
                date={formatDate(article.publishedAt)}
                title={article.title}
                description={article.excerpt}
                to={getDetailPath(ROUTES.newsDetail, article.id)}
                showReadMore
              />
            ))}
          </div>

          <aside className={styles.sidebar}>
            <section className={styles.sidebarBlock}>
              <h3 className={styles.sidebarTitle}>{t('news.categoriesTitle')}</h3>

              <ul className={styles.categoryList}>
                {categories.map((item) => (
                  <li key={item.category}>
                    <button
                      type="button"
                      className={styles.categoryButton}
                      onClick={() => handleFilterChange(item.category)}
                      aria-pressed={selected === item.category}
                    >
                      <span className={styles.categoryItemLabel}>
                        {t(`news.categories.${item.category}`)}
                      </span>
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
                {getPopularNews(lang).map((item) => (
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
      <div>
        <Pagination
          className={styles.paginationNews}
          currentPage={1}
          totalPages={3}
          onPageChange={() => {}}
        />
      </div>
    </Container>
  );
}
