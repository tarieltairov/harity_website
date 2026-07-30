import styles from './HomeHero.module.scss';
import Hero from '../../../../assets/Hero.jpg';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { useNavigate } from 'react-router-dom';

export function HomeHero() {
  const navigate = useNavigate();
  return (
    <section className={styles.hero}>
      <img src={Hero} alt="Hero" className={styles.images} />
      <div className={styles.content}>
        <Badge className={styles.badge}>Общественный фонд</Badge>
        <h2 className={styles.title}>
          Помогаем людям строить <br /> лучшую жизнь
        </h2>
        <p className={styles.description}>
          Поддержка семей, образование и медицина в регионах Кыргызстана.
        </p>
        <div className={styles.btns}>
          <Button onClick={() => navigate('/projects')} className={styles.btn_project}>
            Наши Проекты
          </Button>
          <Button className={styles.btn_fund}>Помочь фонду</Button>
        </div>
      </div>
    </section>
  );
}
