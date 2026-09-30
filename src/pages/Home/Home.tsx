import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SectionWithCards } from '@components/SectionWithCards';
import { AboutFund } from './components/AboutFund';
import { HomeHero } from './components/HomeHero';
import styles from './Home.module.scss';
import { CTABanner } from '@ui/CTABanner';
import { Container } from '@components/Container';
import { getNewsArticles, getProjects } from '@/mocks';
import { getDetailPath, ROUTES } from '@/config/routes';
import { useFormat, useLang } from '@/i18n';
import { FeedbackModal } from '@components/FeedbackModal';

export function Home() {
  const { t } = useTranslation();
  const lang = useLang();
  const { formatDate } = useFormat();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Секция «Ключевые проекты» — первые три проекта из общих моков
  const projectCards = getProjects(lang)
    .slice(0, 3)
    .map((project) => ({
      id: project.id,
      to: getDetailPath(ROUTES.project, project.id),
      image: project.image,
      badge: t(`projects.status.${project.status}`),
      title: project.title,
      description: project.excerpt,
    }));

  // Секция «Последние новости» — первые три новости из общих моков
  const newsCards = getNewsArticles(lang)
    .slice(0, 3)
    .map((article) => ({
      id: article.id,
      to: getDetailPath(ROUTES.newsDetail, article.id),
      image: article.image,
      date: formatDate(article.publishedAt),
      title: article.title,
    }));

  return (
    <div className={styles.pageContainer}>
      <HomeHero />
      <AboutFund />
      <SectionWithCards
        title={t('home.keyProjects')}
        buttonText={t('home.allProjects')}
        buttonLink={ROUTES.projects}
        cards={projectCards}
      />
      <SectionWithCards
        title={t('home.latestNews')}
        buttonText={t('home.allNews')}
        buttonLink={ROUTES.news}
        cards={newsCards}
      />

      <Container className={styles.bannerContainer}>
        <CTABanner
          title={t('home.cta.title')}
          description={t('home.cta.description')}
          buttonText={t('home.cta.button')}
          onBtnClick={() => setIsFeedbackOpen(true)}
        />
      </Container>

      {/* Модалка обратной связи */}
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </div>
  );
}
