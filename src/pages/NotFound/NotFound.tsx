import { Link } from 'react-router-dom';
import { Container } from '@components/Container';
import { ROUTES } from '@/config/routes';
import styles from './NotFound.module.scss';

// Список быстрых ссылок с использованием ваших токенов роутов
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

export function NotFound() {
  return (
    <Container className={styles.page}>
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
            <Link to={ROUTES.home} className={styles.btnPrimary}>
              На главную
            </Link>
            <Link to="/search" className={styles.btnSecondary}>
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
              Найти на сайте
            </Link>
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
