import clsx from 'clsx';
import type { StatItem } from '@/types';
import { SkeletonText } from '@ui/Skeleton';
import styles from './StatsBlock.module.scss';

/** Сколько плашек рисовать на время загрузки — как цифр фонда в макете */
const SKELETON_COUNT = 3;

interface StatsBlockProps {
  /** Данные ещё грузятся — `undefined`, тогда рендерятся скелетоны той же геометрии */
  items: StatItem[] | undefined;
  className?: string;
}

export const StatsBlock = ({ items, className }: StatsBlockProps) => (
  <section className={clsx(styles.stats, className)} aria-busy={items ? undefined : true}>
    {items
      ? items.map((item) => (
          <div className={styles.stats__item} key={item.label}>
            <h2 className={styles.stats__value}>{item.value}</h2>
            <p className={styles.stats__label}>{item.label}</p>
          </div>
        ))
      : Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <div className={styles.stats__item} key={index}>
            <h2 className={styles.stats__value}>
              <SkeletonText width="3em" />
            </h2>
            <p className={styles.stats__label}>
              <SkeletonText width="70%" />
            </p>
          </div>
        ))}
  </section>
);
