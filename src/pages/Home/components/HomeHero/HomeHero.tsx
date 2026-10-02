import { StatsBlock } from '@components/StatsBlock';
import { Container } from '@components/Container';
import styles from './HomeHero.module.scss';
import Hero from '@assets/jpeg/Hero.jpg';
import { Badge } from '@ui/Badge';
import { Button } from '@ui/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/config/routes';
import { useStats } from '@/api';

export function HomeHero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: stats } = useStats();

  return (
    <>
      <section className={styles.hero}>
        <img src={Hero} alt="" className={styles.image} />
        <div className={styles.overlay} />
        <div className={styles.container}>
          <div className={styles.content}>
            <Badge className={styles.badge}>{t('home.hero.badge')}</Badge>
            <h2 className={styles.title}>{t('home.hero.title')}</h2>
            <p className={styles.description}>{t('home.hero.description')}</p>
            <div className={styles.btns}>
              <Button onClick={() => navigate(ROUTES.projects)} className={styles.btn_project}>
                {t('home.hero.ourProjects')}
              </Button>
              <Button className={styles.btn_fund}>{t('home.hero.helpFund')}</Button>
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
