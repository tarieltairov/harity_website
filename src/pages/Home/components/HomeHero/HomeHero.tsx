import { StatsBlock } from '@components/StatsBlock';
import { Container } from '@components/Container';
import styles from './HomeHero.module.scss';
import Hero from '@assets/jpeg/Hero.jpg';
import { Badge } from '@ui/Badge';
import { Button } from '@ui/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

const stats = [
  { value: '12 лет', label: 'Работы фонда' },
  { value: '48', label: 'Проектов реализовано' },
  { value: '9', label: 'Регионов охвачено' },
];

export function HomeHero() {
  const navigate = useNavigate();
  return (
    <>
      <section className={styles.hero}>
        <img src={Hero} alt="" className={styles.image} />
        <div className={styles.overlay} />
        <div className={styles.container}>
          <div className={styles.content}>
            <Badge className={styles.badge}>Общественный фонд</Badge>
            <h2 className={styles.title}>Помогаем людям строить лучшую жизнь</h2>
            <p className={styles.description}>
              Поддержка семей, образование и медицина в регионах Кыргызстана.
            </p>
            <div className={styles.btns}>
              <Button onClick={() => navigate(ROUTES.projects)} className={styles.btn_project}>
                Наши проекты
              </Button>
              <Button className={styles.btn_fund}>Помочь фонду</Button>
            </div>
          </div>
        </div>
      </section>
      <Container>
        <StatsBlock items={stats} className={styles.homeStats} />
      </Container>
    </>
  );
}
