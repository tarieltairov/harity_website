import styles from '../../Home.module.scss';
import Hero from '../../../../assets/Hero.jpg';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';

export function HomeHero() {
  return (
    <section>
      <main>
        <div className={styles.hero}>
          <img src={Hero} alt="Hero" className={styles.images} />
          <div className={styles.content}>
            <Badge className={styles.badge_color}>Общественный фонд</Badge>
            <h2 className={styles.text}>Помогаем людям строить <br /> лучшую жизнь</h2>
            <p className={styles.text1}>Поддержка семей, образование и медицина в регионах Кыргызстана.</p>
            <div className={styles.btn}>
            <Button className={styles.btn1}>Наши Проекты</Button>
            <Button className={styles.btnbg}>Помочь фонду</Button>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
