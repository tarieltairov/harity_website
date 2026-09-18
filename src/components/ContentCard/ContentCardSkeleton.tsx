import clsx from 'clsx';
import { SkeletonBlock, SkeletonText } from '@ui/Skeleton';
import cardStyles from './ContentCard.module.scss';
import styles from './ContentCardSkeleton.module.scss';

interface ContentCardSkeletonProps {
  className?: string;
  /** Резервировать строку под «Читать далее →», как у карточки с `showReadMore` */
  showReadMore?: boolean;
}

/**
 * Плейсхолдер ContentCard на время загрузки. Повторяет геометрию карточки
 * (картинка 260px, бейдж с датой, по две строки заголовка и описания), чтобы сетка не прыгала.
 */
export function ContentCardSkeleton({ className, showReadMore = false }: ContentCardSkeletonProps) {
  return (
    <article
      className={clsx(cardStyles.card, styles.card, className)}
      aria-busy="true"
      aria-label="Загрузка карточки"
    >
      <SkeletonBlock className={clsx(cardStyles.card__image, styles.image)} />
      <div className={cardStyles.card__content}>
        <div className={styles.meta}>
          <SkeletonBlock className={styles.badge} />
          <SkeletonText className={styles.date} />
        </div>
        <div className={styles.title}>
          <SkeletonText />
          <SkeletonText />
        </div>
        <div className={styles.description}>
          <SkeletonText />
          <SkeletonText />
        </div>
        {showReadMore && (
          <div className={styles.more}>
            <SkeletonText />
          </div>
        )}
      </div>
    </article>
  );
}
