import { Link } from 'react-router-dom';
import { Container } from '@components/Container';
import { ROUTES } from '@/config/routes';
import styles from './NotFound.module.scss';

export function NotFound() {
  return (
    <Container className={styles.page}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.text}>Страница не найдена</p>
      <Link to={ROUTES.home}>Вернуться на главную</Link>
    </Container>
  );
}
