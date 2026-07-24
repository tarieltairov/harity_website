import styles from './StatBlock.module.scss';

const statBlock = [
  { value: '12 лет', label: 'Работы фонда' },
  { value: '48', label: 'Проектов реализовано' },
  { value: '9', label: 'Регионов охвачено' },
];

export const StatsBlock = () => (
  <section className={styles.stats}>
    {statBlock.map((item) => (
      <div className={styles.stats__item} key={item.label}>
        <h2 className={styles.stats__value}>{item.value}</h2>
        <p className={styles.stats__label}>{item.label}</p>
      </div>
    ))}
  </section>
);
