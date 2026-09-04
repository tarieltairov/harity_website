import clsx from 'clsx';
import type { StatItem } from '@/types';
import styles from './StatsBlock.module.scss';

interface StatsBlockProps {
  items: StatItem[];
  className?: string;
}

export const StatsBlock = ({ items, className }: StatsBlockProps) => (
  <section className={clsx(styles.stats, className)}>
    {items.map((item) => (
      <div className={styles.stats__item} key={item.label}>
        <h2 className={styles.stats__value}>{item.value}</h2>
        <p className={styles.stats__label}>{item.label}</p>
      </div>
    ))}
  </section>
);
