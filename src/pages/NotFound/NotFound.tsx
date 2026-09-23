import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Container } from '@components/Container';
import { Button } from '@ui/Button';
import { ROUTES } from '@/config/routes';
import styles from './NotFound.module.scss';

const QUICK_LINKS = [
  {
    title: 'Новости фонда',
    description: 'Последние публикации и пресс-релизы',
    href: ROUTES.news,
  },
  {
    title: 'Проекты',
    description: 'Что делаем сейчас и где',
    href: ROUTES.projects,
  },
  {
    title: 'Отчёты и документы',
    description: 'Финансовые и годовые отчёты',
    href: ROUTES.reports,
  },
  {
    title: 'Партнёры',
    description: 'Наши партнёры и поддержка',
    href: ROUTES.partners,
  },
  {
    title: 'Контакты',
    description: 'Адрес, почта, телефон',
    href: ROUTES.contacts,
  },
];

interface NotFoundProps {
  className?: string;
}

export function NotFound({ className }: NotFoundProps) {
  return (
    <Container className={clsx(styles.page, className)}>
      <div className={styles.content}>
        {/* Левая колонка */}
        <div className={styles.main}>
          <span className={styles.badge}>ОШИБКА 404</span>
          <h1 className={styles.code}>404</h1>
          <h2 className={styles.title}>Такой страницы нет</h2>
          <p className={styles.text}>
            Возможно, материал переехал или в адресе опечатка. Проверьте ссылку или начните с
            главной — всё нужное найдётся через поиск.
          </p>

          <div className={styles.actions}>
            {/* 1. Кнопка с replace (не позволяет вернуться назад) */}
            <Button to={ROUTES.home} replace variant="primary">
              На главную
            </Button>

            {/* 2. Кнопка с переданной иконкой */}
            <Button
              to="/search"
              variant="secondary"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              }
            >
              Найти на сайте
            </Button>
          </div>
        </div>

        {/* Правая колонка — блок «Чаще всего ищут» */}
        <aside className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>ЧАЩЕ ВСЕГО ИЩУТ</h3>
          <ul className={styles.linksList}>
            {QUICK_LINKS.map((item, index) => (
              <li key={index} className={styles.linkItem}>
                <Link to={item.href} className={styles.cardLink}>
                  <div className={styles.linkInfo}>
                    <span className={styles.linkTitle}>{item.title}</span>
                    <span className={styles.linkDesc}>{item.description}</span>
                  </div>
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Container>
  );
}
