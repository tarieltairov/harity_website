import styles from './Home.module.scss';

export function Home() {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.hero_section}>Hero</section>

      <section className={styles.about_section}>О фонде</section>

      <section className={styles.projects_section}>Ключевые проекты</section>

      <section className={styles.news_section}>Последние новости</section>
    </div>
  );
}
