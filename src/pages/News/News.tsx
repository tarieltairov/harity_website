import React, { useState, useMemo } from 'react';
import { NewsCard } from '@components/NewsCard';
import { Container } from '@components/Container';
import { SearchField } from '@ui/form';
import { FilterChip } from '@ui/FilterChip';
import styles from './News.module.scss';
import { CTABanner } from '@ui/CTABanner/CTABanner';
import image1 from '@assets/jpeg/image1.jpeg';
import image2 from '@assets/jpeg/image2.jpeg';
import image3 from '@assets/jpeg/image3.jpeg';
import image4 from '@assets/jpeg/image4.jpeg';
import image5 from '@assets/jpeg/image5.jpeg';
import image6 from '@assets/jpeg/image6.jpeg';
import image7 from '@assets/jpeg/image7.jpeg';
import image8 from '@assets/jpeg/image8.jpeg';
import { Pagination } from '@ui/Pagination/Pagination';

const filters = ['Все', 'Проекты', 'Отчёты', 'Мероприятия', 'Партнёрство', 'Пресс-релизы'];

const articles = [
  {
    category: 'Проекты',
    date: '3 июля 2026',
    title: 'В Оше открылся новый центр поддержки семей',
    description:
      'Центр будет оказывать психологическую и юридическую помощь многодетным и малообеспеченным семьям региона.',
    image: image1,
  },
  {
    category: 'Отчёты',
    date: '29 июня 2026',
    title: 'Опубликован финансовый отчёт фонда за 2025 год',
    description:
      'В отчёте - подробная информация о расходах, грантах и реализованных проектах прошлого года.',
    image: image2,
  },
  {
    category: 'Мероприятия',
    date: '24 июня 2026',
    title: 'Волонтёры собрали более тонны вещей для многодетных семей',
    description: 'Акция прошла в трёх городах при поддержке местных сообществ и партнёров фонда.',
    image: image4,
  },
  {
    category: 'Партнёрство',
    date: '24 июня 2026',
    title: 'Фонд подписал меморандум с международной организацией',
    description:
      'Соглашение предполагает совместную работу над программами образования и здравоохранения.',
    image: image3,
  },
  {
    category: 'Пресс-релизы',
    date: '12 июня 2026',
    title: 'Запущена программа стипендий для студентов из регионов',
    description: 'В 2026 году стипендии получат 40 студентов из малообеспеченных семей.',
    image: image5,
  },
  {
    category: 'Проекты',
    date: '5 июня 2026',
    title: 'Стартовал образовательный курс для сельских учителей',
    description: 'Курс повышения квалификации пройдут более 100 педагогов из отдалённых школ.',
    image: image6,
  },
  {
    category: 'Мероприятия',
    date: '1 июня 2026',
    title: 'Благотворительный забег собрал более 500 участников',
    description:
      'Средства, вырученные с регистрационных взносов, направят на строительство детской площадки.',
    image: image7,
  },
  {
    category: 'Отчёты',
    date: '29 мая 2026',
    title: 'Годовой отчёт о проектах в сфере здравоохранения',
    description:
      'Фонд подвёл итоги трёх лет работы мобильных медицинских бригад в отдалённых сёлах.',
    image: image8,
  },
];

const popular = [
  {
    title: 'В Оше открылся новый центр поддержки семей',
    date: '3 июля 2026',
    image:
      'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=300&q=80',
  },
  {
    title: 'Волонтёры собрали более тонны вещей для многодетных семей',
    date: '24 июня 2026',
    image:
      'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=300&q=80',
  },
  {
    title: 'Запущена программа стипендий для студентов из регионов',
    date: '12 июня 2026',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80',
  },
];

export function News() {
  const [searchNews, setSearchNews] = useState('');
  const [selected, setSelected] = useState('Все');

  const categories = useMemo(
    () =>
      filters.map((name) => ({
        name,
        count:
          name === 'Все'
            ? articles.length
            : articles.filter((article) => article.category === name).length,
      })),
    []
  );

  const filteredNews = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchNews.toLowerCase());
    const matchesFilter = selected === 'Все' || article.category === selected;
    const result = matchesSearch && matchesFilter;
    return result;
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
            {filters.map((label) => (
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
                key={article.title}
                image={article.image}
                badgetitle={article.category}
                date={article.date}
                title={article.title}
                description={article.description}
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
                {popular.map((item) => (
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
