import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SectionWithCards } from '@components/SectionWithCards';
import { AboutFund } from './components/AboutFund';
import { HomeHero } from './components/HomeHero';
import styles from './Home.module.scss';
import { CTABanner } from '@ui/CTABanner';
import { Container } from '@components/Container';
import { useNewsList, useProjects } from '@/api';
import { getDetailPath, ROUTES } from '@/config/routes';
import { useFormat } from '@/i18n';
import { FeedbackModal } from '@components/FeedbackModal';

/** По макету на главной по три карточки в каждой секции */
const HOME_CARDS_COUNT = 3;

export function Home() {
  const { t } = useTranslation();
  const { formatDate } = useFormat();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Секция «Ключевые проекты» — проекты с флагом featured (контракт: /projects?featured=true)
  const { data: projects } = useProjects({ featured: true, pageSize: HOME_CARDS_COUNT });
  // Секция «Последние новости» — первая страница ленты, свежие первыми
  const { data: news } = useNewsList({ pageSize: HOME_CARDS_COUNT });

  const projectCards = (projects?.items ?? []).map((project) => ({
    id: project.id,
    to: getDetailPath(ROUTES.project, project.id),
    image: project.image,
    badge: t(`projects.status.${project.status}`),
    title: project.title,
    description: project.excerpt,
  }));

  const newsCards = (news?.items ?? []).map((article) => ({
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
        isLoading={!projects}
        skeletonCount={HOME_CARDS_COUNT}
      />
      <SectionWithCards
        title={t('home.latestNews')}
        buttonText={t('home.allNews')}
        buttonLink={ROUTES.news}
        cards={newsCards}
        isLoading={!news}
        skeletonCount={HOME_CARDS_COUNT}
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
