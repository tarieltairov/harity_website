import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '@components/Container';
import { ROUTES } from '@/config/routes';
import styles from './NotFound.module.scss';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <Container className={styles.page}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.text}>{t('notFound.text')}</p>
      <Link to={ROUTES.home}>{t('notFound.home')}</Link>
    </Container>
  );
}
