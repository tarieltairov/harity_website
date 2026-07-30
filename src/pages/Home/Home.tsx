import { HomeHero } from './components/HomeHero/HomeHero';
import styles from './Home.module.scss';

export function Home() {
  return (
    <div className={styles.pageContainer}>
      <HomeHero />

      <section className={styles.about_section}>О фонде</section>

      <section className={styles.projects_section}>Ключевые проекты</section>

      <section className={styles.news_section}>Последние новости</section>
    </div>
  );
}
