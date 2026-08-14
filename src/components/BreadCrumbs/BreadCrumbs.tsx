import { Link, useLocation } from 'react-router-dom';
import { Container } from '@components/Container';
import { NAV_LINKS, ROUTES } from '@/config/routes';
import styles from './BreadCrumbs.module.scss';

// Названия берём из NAV_LINKS, чтобы не дублировать словарь путей
const LABEL_BY_PATH: Record<string, string> = Object.fromEntries(
  NAV_LINKS.map((link) => [link.to, link.label])
);

interface BreadCrumbsProps {
  /** Переопределяет путь из роутера — для демонстрации вне реальных страниц (UI Kit) */
  pathname?: string;
}

export function BreadCrumbs({ pathname: pathnameOverride }: BreadCrumbsProps = {}) {
  const location = useLocation();
  const pathname = pathnameOverride ?? location.pathname;
  const pathParts = pathname.split('/').filter(Boolean);

  // Не показываем на главной и на неизвестных путях (404)
  if (pathParts.length === 0 || !LABEL_BY_PATH[`/${pathParts[0]}`]) {
    return null;
  }

  return (
    <Container>
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
        <Link to={ROUTES.home} className={styles.link}>
          Главная
        </Link>
        {pathParts.map((part, index) => {
          const path = `/${pathParts.slice(0, index + 1).join('/')}`;
          const name = LABEL_BY_PATH[path] ?? part;
          const isLast = index === pathParts.length - 1;

          return (
            <span key={path} className={styles.item}>
              <span className={styles.separator}>/</span>
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {name}
                </span>
              ) : (
                <Link to={path} className={styles.link}>
                  {name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </Container>
  );
}
