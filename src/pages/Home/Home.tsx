import { AboutFund } from './components/AboutFund';
import { HomeHero } from './components/HomeHero';
import styles from './Home.module.scss';

export function Home() {
  return (
    <div className={styles.pageContainer}>
      <HomeHero />

      <AboutFund />

      <section className={styles.projects_section}>Ключевые проекты</section>

      <section className={styles.news_section}>Последние новости</section>
    </div>
  );
}
