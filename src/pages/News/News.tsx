import React, { useState, useMemo } from 'react';
import { NewsCard } from '@components/NewsCard';
import { Container } from '@components/Container';
import { SearchField } from '@ui/form';
import { FilterChip } from '@ui/FilterChip';
import styles from './News.module.scss';
import { CTABanner } from '@ui/CTABanner/CTABanner';
import { Pagination } from '@ui/Pagination/Pagination';
import { NEWS_ARTICLES, NEWS_CATEGORIES, POPULAR_NEWS } from '@/mocks';

export function News() {
  const [searchNews, setSearchNews] = useState('');
  const [selected, setSelected] = useState<string>('Все');

  const categories = useMemo(
    () =>
      NEWS_CATEGORIES.map((name) => ({
        name,
        count:
          name === 'Все'
            ? NEWS_ARTICLES.length
            : NEWS_ARTICLES.filter((article) => article.category === name).length,
      })),
    []
  );

  const filteredNews = NEWS_ARTICLES.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchNews.toLowerCase());
    const matchesFilter = selected === 'Все' || article.category === selected;
    return matchesSearch && matchesFilter;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchNews(event.target.value);
  };

  const handleFilterChange = (label: string) => {
    setSelected(label);
  };

  return (
    <Container className="page">
      <div className={styles.breadcrumbs}>
        <h1 className={styles.newsfund}>Новости фонда</h1>
        <p className={styles.history}>Истории, отчёты и события — из первых рук.</p>
      </div>
      <section className={styles.news}>
        <div className={styles.toolbar}>
          <SearchField
            placeholder="Поиск по новостям"
            aria-label="Поиск по новостям"
            value={searchNews}
            onChange={handleSearchChange}
          />

          <div className={styles.filters}>
            {NEWS_CATEGORIES.map((label) => (
              <FilterChip
                key={label}
                isActive={selected === label}
                onClick={() => handleFilterChange(label)}
              >
                {label}
              </FilterChip>
            ))}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.cards}>
            {filteredNews.map((article) => (
              <NewsCard
                key={article.id}
                id={article.id}
                image={article.image}
                badgeTitle={article.category}
                date={article.date}
                title={article.title}
                description={article.excerpt}
                showBtn
              />
            ))}
          </div>

          <aside className={styles.sidebar}>
            <section className={styles.sidebarBlock}>
              <h3 className={styles.sidebarTitle}>Категории</h3>

              <ul className={styles.categoryList}>
                {categories.map((item) => (
                  <li key={item.name}>
                    <button
                      type="button"
                      className={styles.categoryButton}
                      onClick={() => handleFilterChange(item.name)}
                      aria-pressed={selected === item.name}
                    >
                      <span className={styles.categoryItemLabel}>{item.name}</span>
                      <span
                        className={styles.categoryCount}
                        data-active={selected === item.name ? 'true' : 'false'}
                      >
                        {item.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.sidebarBlock}>
              <h3 className={styles.sidebarTitle}>Популярное</h3>

              <ul className={styles.popularList}>
                {POPULAR_NEWS.map((item) => (
                  <li
                    key={item.title}
                    onClick={() => (window.location.href = `/news/${item.title}`)}
                    className={styles.popularItem}
                  >
                    <img src={item.image} alt={item.title} className={styles.popularImage} />

                    <div>
                      <p className={styles.popularTitle}>{item.title}</p>
                      <p className={styles.popularDate}>{item.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <CTABanner
              title="Присоединяйтесь к нам"
              description="Вопросы по проектам или партнёрству — пишите нам."
              buttonText="Написать нам"
              onBtnClick={() => (window.location.href = '/contacts')}
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
