import styles from './SectionWithCards.module.scss';
import { NewsCard } from '@components/NewsCard';

export interface CardItem {
  id: string | number;
  image: string;
  title: string;
  date?: string; // Для секции «Новости»
  badge?: string; // Для секции «Проекты» ("Активный", "Завершён")
  description?: string; // Для секции «Проекты»
}

interface SectionWithCardsProps {
  title: string; // "Последние новости" или "Ключевые проекты"
  buttonText: string; // "Все новости →" или "Все проекты →"
  buttonLink: string; // URL ссылки
  cards: CardItem[]; // Массив карточек
}

export function SectionWithCards({ title, buttonText, buttonLink, cards }: SectionWithCardsProps) {
  return (
    <section className={styles.section}>
      {/* Заголовок секции и ссылка справа */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <a href={buttonLink} className={styles.link}>
          {buttonText} <span className={styles.arrow}>→</span>
        </a>
      </div>

      {/* Сетка из карточек */}
      <div className={styles.grid}>
        {cards.map((card) => (
          <NewsCard
            key={card.id}
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
