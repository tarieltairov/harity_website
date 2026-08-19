import { Link, matchPath, useLocation } from 'react-router-dom';
import { Container } from '@components/Container';
import { NAV_LINKS, ROUTES } from '@/config/routes';
import { getNewsById, getProjectById } from '@/mocks';
import styles from './BreadCrumbs.module.scss';

type CrumbParams = Record<string, string | undefined>;

// Единый словарь названий крошек. Ключ — паттерн роута, значение — функция,
// получающая params из matchPath, поэтому динамический сегмент может стоять
// в любом месте паттерна и на любой глубине вложенности.
// Статические названия разделов берутся из NAV_LINKS — их не дублируем.
const CRUMB_LABELS: Record<string, (params: CrumbParams) => string | undefined> = {
  ...Object.fromEntries(NAV_LINKS.map((link) => [link.to, () => link.label])),
  [ROUTES.newsDetail]: ({ id }) => getNewsById(Number(id))?.title,
  [ROUTES.project]: ({ id }) => getProjectById(Number(id))?.title,
};

function resolveLabel(path: string): string | undefined {
  for (const [pattern, getLabel] of Object.entries(CRUMB_LABELS)) {
    const match = matchPath(pattern, path);
    if (match) {
      return getLabel(match.params);
    }
  }
  return undefined;
}

interface BreadCrumbsProps {
  /** Переопределяет путь из роутера — для демонстрации вне реальных страниц (UI Kit) */
  pathname?: string;
}

export function BreadCrumbs({ pathname: pathnameOverride }: BreadCrumbsProps = {}) {
  const location = useLocation();
  const pathname = pathnameOverride ?? location.pathname;
  const pathParts = pathname.split('/').filter(Boolean);

  // Каждый префикс пути — потенциальная крошка: /a → /a/b → /a/b/c.
  // Сегменты без названия (неизвестный id и т.п.) в цепочку не попадают.
  const crumbs = pathParts
    .map((_, index) => {
      const path = `/${pathParts.slice(0, index + 1).join('/')}`;
      return { path, label: resolveLabel(path) };
    })
    .filter((crumb): crumb is { path: string; label: string } => Boolean(crumb.label));

  // На главной и на неизвестных путях (404) крошки не показываем
  if (crumbs.length === 0) {
    return null;
  }

  return (
    <Container>
      <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
        <Link to={ROUTES.home} className={styles.link}>
          Главная
        </Link>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <span key={crumb.path} className={styles.item}>
              <span className={styles.separator}>/</span>
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.path} className={styles.link}>
                  {crumb.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </Container>
  );
}
