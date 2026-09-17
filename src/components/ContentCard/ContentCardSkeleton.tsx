import React from 'react';
import clsx from 'clsx';
import { SkeletonBlock, SkeletonText } from '@ui/Skeleton';
import styles from './ContentCard.module.scss';

interface ContentCardSkeletonProps {
  className?: string;
  showReadMore?: boolean;
}

export const ContentCardSkeleton: React.FC<ContentCardSkeletonProps> = ({
  className,
  showReadMore = false,
}) => {
  return (
    <article
      className={clsx(styles.card, className)}
      aria-busy="true"
      aria-live="polite"
      aria-label="Загрузка карточки"
    >
      {/* Прямоугольник под изображение */}
      <SkeletonBlock className={styles.card__image} />

      {/* Контентная область */}
      <div className={styles.card__content}>
        <div className={styles.card__info}>
          {/* Плашка бейджа и дата */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SkeletonBlock width="70px" height="24px" borderRadius="12px" />
            <SkeletonText className={styles.card__date} width="60px" fontSize="0.875rem" />
          </div>

          {/* Заголовок (две строки под line-clamp: 2) */}
          <div
            className={styles.card__title}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <SkeletonText fontSize="1.1rem" width="100%" />
            <SkeletonText fontSize="1.1rem" width="75%" />
          </div>

          {/* Описание (две строки под line-clamp: 2) */}
          <div
            className={styles.card__description}
            style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
          >
            <SkeletonText fontSize="13.5px" width="100%" />
            <SkeletonText fontSize="13.5px" width="85%" />
          </div>

          {/* Кнопка "Читать далее →" */}
          {showReadMore && (
            <div style={{ marginTop: '15px' }}>
              <SkeletonText className={styles.moreBtn} width="110px" fontSize="0.875rem" />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
