import styles from '@components/BreadCrumbs/BreadCrumbs.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { Container } from '@components/Container';

const breadCrumbsNames: Record<string, string> = {
  news: 'Новости',
  projects: 'Проекты',
  reports: 'Отчеты',
  partners: 'Партнеры',
  contacts: 'Контакты',
  about: 'О фонде',
};

export function BreadCrumbs() {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  if (location.pathname === '/' || pathParts.length === 0) {
    return null;
  }

  return (
    <Container>
      <div className={styles.breadcrumbs}>
        <div className={styles.container}>
          <Link to="/" className={styles.link}>
            Главная
          </Link>
          {pathParts.map((part, index) => {
            const path = `/${pathParts.slice(0, index + 1).join('/')}`;
            const name = breadCrumbsNames[part] || part;
            const isLast = index === pathParts.length - 1;

            return (
              <span key={path}>
                <span className={styles.separator}> / </span>
                {isLast ? (
                  <span className={styles.current}>{name}</span>
                ) : (
                  <Link to={path} className={styles.link}>
                    {name}
                  </Link>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
