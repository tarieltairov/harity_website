import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '@components/Container';
import { Button } from '@ui/Button';
import { ROUTES } from '@/config/routes';
import styles from './NotFound.module.scss';

// Блок «Чаще всего ищут»: подписи — в словаре `notFound.links.<key>`
const QUICK_LINKS = [
  { key: 'news', to: ROUTES.news },
  { key: 'projects', to: ROUTES.projects },
  { key: 'reports', to: ROUTES.reports },
  { key: 'partners', to: ROUTES.partners },
  { key: 'contacts', to: ROUTES.contacts },
] as const;

interface NotFoundProps {
  className?: string;
}

export function NotFound({ className }: NotFoundProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <Container className={clsx(styles.page, className)}>
        <div className={styles.content}>
          {/* Левая колонка */}
          <div className={styles.main}>
            <span className={styles.badge}>{t('notFound.badge')}</span>
            <h1 className={styles.code}>404</h1>
            <h2 className={styles.title}>{t('notFound.title')}</h2>
            <p className={styles.text}>{t('notFound.text')}</p>

            <div className={styles.actions}>
              {/* replace: со страницы 404 «назад» не должно возвращать на неё же */}
              <Button to={ROUTES.home} replace variant="primary">
                {t('notFound.home')}
              </Button>

              <Button
                to={ROUTES.search}
                variant="outline"
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
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                }
              >
                {t('notFound.search')}
              </Button>
            </div>
          </div>

          {/* Правая колонка — блок «Чаще всего ищут» */}
          <aside className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>{t('notFound.popularTitle')}</h3>
            <ul className={styles.linksList}>
              {QUICK_LINKS.map((item) => (
                <li key={item.key} className={styles.linkItem}>
                  <Link to={item.to} className={styles.cardLink}>
                    <div className={styles.linkInfo}>
                      <span className={styles.linkTitle}>
                        {t(`notFound.links.${item.key}.title`)}
                      </span>
                      <span className={styles.linkDesc}>
                        {t(`notFound.links.${item.key}.description`)}
                      </span>
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
    </div>
  );
}
