import { useState } from 'react';

import { SectionWithCards } from '@components/SectionWithCards';
import { AboutFund } from './components/AboutFund';
import { HomeHero } from './components/HomeHero';
import styles from './Home.module.scss';
import { CTABanner } from '@ui/CTABanner';
import { FeedbackModal } from '@components/FeedbackModal';

// 1. Импортируемые картинки для проектов
import project1 from '@assets/jpeg/keyprojects.jpg';
import project2 from '@assets/jpeg/keyprojects1.jpg';
import project3 from '@assets/jpeg/keyprojects2.jpg';

// 2. Импортируем картинки для новостей
import news1 from '@assets/jpeg/keyprojects3.jpg';
import news2 from '@assets/jpeg/keyprojects4.jpg';
import news3 from '@assets/jpeg/keyprojects5.jpg';
import { Container } from '@components/Container';

// Данные для секции "Ключевые проекты"
const projectCards = [
  {
    id: 1,
    image: project1,
    badge: 'Активный',
    title: 'Центры поддержки семей',
    description: 'Психологическая и юридическая помощь многодетным семьям в 5 городах.',
  },
  {
    id: 2,
    image: project2,
    badge: 'Активный',
    title: 'Мобильные медицинские бригады',
    description: 'Регулярные выезды врачей в отдалённые сёла и приграничные районы.',
  },
  {
    id: 3,
    image: project3,
    badge: 'Завершён',
    title: 'Стипендии для студентов',
    description: '40 студентов из малообеспеченных семей получили поддержку в 2025 году.',
  },
];

// Данные для секции "Последние новости"
const newsCards = [
  {
    id: 1,
    image: news1,
    date: '3 июля 2026',
    title: 'В Оше открылся новый центр поддержки семей',
  },
  {
    id: 2,
    image: news2,
    date: '29 июня 2026',
    title: 'Опубликован финансовый отчёт фонда за 2025 год',
  },
  {
    id: 3,
    image: news3,
    date: '24 июня 2026',
    title: 'Волонтёры собрали более тонны вещей для семей',
  },
];

export function Home() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <div className={styles.pageContainer}>
      <HomeHero />
      <AboutFund />

      {/* Секция проектов */}
      <SectionWithCards
        title="Ключевые проекты"
        buttonText="Все проекты"
        buttonLink="/projects"
        cards={projectCards}
      />

      {/* Секция новостей */}
      <SectionWithCards
        title="Последние новости"
        buttonText="Все новости"
        buttonLink="/news"
        cards={newsCards}
      />

      <Container className={styles.bannerContainer}>
        <CTABanner
          title="Хотите помочь?"
          description="Любая поддержка — деньгами, вещами или временем — меняет чью-то жизнь."
          buttonText="Стать партнёром"
          onBtnClick={() => setIsFeedbackOpen(true)}
        />
      </Container>

      {/* Модалка обратной связи */}
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </div>
  );
}
