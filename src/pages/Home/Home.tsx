import { SectionWithCards } from '@components/SectionWithCards';
import { AboutFund } from './components/AboutFund';
import { HomeHero } from './components/HomeHero';
import styles from './Home.module.scss';
import { CTABanner } from '@ui/CTABanner';
import { Container } from '@components/Container';
import { NEWS_ARTICLES, PROJECTS } from '@/mocks';
import { PROJECT_STATUS_LABEL } from '@/types';
import { ROUTES } from '@/config/routes';

// Секция «Ключевые проекты» — первые три проекта из общих моков
const projectCards = PROJECTS.slice(0, 3).map((project) => ({
  id: project.id,
  image: project.image,
  badge: PROJECT_STATUS_LABEL[project.status],
  title: project.title,
  description: project.excerpt,
}));

// Секция «Последние новости» — первые три новости из общих моков
const newsCards = NEWS_ARTICLES.slice(0, 3).map((article) => ({
  id: article.id,
  image: article.image,
  date: article.date,
  title: article.title,
}));

export function Home() {
  return (
    <div className={styles.pageContainer}>
      <HomeHero />
      <AboutFund />
      <SectionWithCards
        title="Ключевые проекты"
        buttonText="Все проекты"
        buttonLink={ROUTES.projects}
        cards={projectCards}
      />
      <SectionWithCards
        title="Последние новости"
        buttonText="Все новости"
        buttonLink={ROUTES.news}
        cards={newsCards}
      />
      <Container className={styles.bannerContainer}>
        <CTABanner
          title="Хотите помочь?"
          description="Любая поддержка — деньгами, вещами или временем — меняет чью-то жизнь."
          buttonText="Стать партнёром"
          onBtnClick={() => console.log('Клик!')}
        />
      </Container>
    </div>
  );
}
