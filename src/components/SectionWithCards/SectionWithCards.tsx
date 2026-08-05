import React from 'react';
import styles from './SectionWithCards.module.scss';

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

export const SectionWithCards: React.FC<SectionWithCardsProps> = ({
  title,
  buttonText,
  buttonLink,
  cards,
}) => {
  return (
    <section className={styles.section}>
      {/* Заголовок секции и ссылка справа */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <a href={buttonLink} className={styles.link}>
          {buttonText} <span className={styles.arrow}>→</span>
        </a>
      </div>

      {/* Сетка из 3 карточек */}
      <div className={styles.grid}>
        {cards.map((card) => (
          <article key={card.id} className={styles.card}>
            {/* Картинка карточки */}
            <div className={styles.imageWrapper}>
              <img src={card.image} alt={card.title} className={styles.image} />
            </div>

            {/* Контентная область */}
            <div className={styles.content}>
              {/* Дата (если есть) */}
              {card.date && <p className={styles.date}>{card.date}</p>}

              {/* Статус/Бэйдж (если есть) */}
              {card.badge && <span className={styles.badge}>{card.badge}</span>}

              {/* Заголовок */}
              <h3 className={styles.cardTitle}>{card.title}</h3>

              {/* Описание (если есть) */}
              {card.description && <p className={styles.description}>{card.description}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
