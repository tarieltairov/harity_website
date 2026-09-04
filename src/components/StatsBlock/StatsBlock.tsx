import styles from './StatsBlock.module.scss';

export interface StatItem {
  value: string;
  label: string;
}

interface StatsBlockProps {
  items: StatItem[];
}

export const StatsBlock = ({ items }: StatsBlockProps) => (
  <section className={styles.stats}>
    {items.map((item) => (
      <div className={styles.stats__item} key={item.label}>
        <h2 className={styles.stats__value}>{item.value}</h2>
        <p className={styles.stats__label}>{item.label}</p>
      </div>
    ))}
  </section>
);
