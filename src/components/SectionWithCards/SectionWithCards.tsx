import { Link } from 'react-router-dom';
import styles from './SectionWithCards.module.scss';
import { ContentCard } from '@components/ContentCard';

export interface CardItem {
  id: string | number;
  to?: string; // Ссылка на деталку — карточка кликабельна
  image: string;
  title: string;
  date?: string; // Для секции «Новости»
  badge?: string; // Для секции «Проекты» ("Активный", "Завершён")
  description?: string; // Для секции «Проекты»
}

interface SectionWithCardsProps {
  title: string; // "Последние новости" или "Ключевые проекты"
  buttonText?: string; // "Все новости →" или "Все проекты →"
  buttonLink?: string; // URL ссылки
  cards: CardItem[]; // Массив карточек
  /** Данные ещё грузятся — вместо карточек рендерятся скелетоны той же сетки */
  isLoading?: boolean;
  /** Сколько скелетонов показать на время загрузки (по макету в секции три карточки) */
  skeletonCount?: number;
}

export function SectionWithCards({
  title,
  buttonText,
  buttonLink,
  cards,
  isLoading = false,
  skeletonCount = 3,
}: SectionWithCardsProps) {
  return (
    <section className={styles.section}>
      {/* Заголовок секции и ссылка справа */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {buttonText && buttonLink && (
          <Link to={buttonLink} className={styles.link}>
            {buttonText} <span className={styles.arrow}>→</span>
          </Link>
        )}
      </div>

      {/* Сетка из карточек */}
      <div className={styles.grid}>
        {isLoading
          ? Array.from({ length: skeletonCount }, (_, index) => (
              <ContentCard key={index} isLoading />
            ))
          : cards.map((card) => (
              <ContentCard
                key={card.id}
                to={card.to}
                image={card.image}
                badgeTitle={card.badge}
                date={card.date}
                title={card.title}
                description={card.description}
              />
            ))}
      </div>
    </section>
  );
}
