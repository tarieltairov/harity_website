import styles from './AboutFund.module.scss';
import aboutFundImg from '@assets/jpeg/aboutfund.jpg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/config/routes';

export function AboutFund() {
  const { t } = useTranslation();

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img src={aboutFundImg} alt={t('home.about.imageAlt')} className={styles.image} />
        </div>

        <div className={styles.content}>
          <span className={styles.tag}>{t('home.about.tag')}</span>
          <h2 className={styles.title}>{t('home.about.title')}</h2>
          <p className={styles.description}>{t('home.about.description')}</p>
          <Link to={ROUTES.about} className={styles.link}>
            {t('home.about.more')} <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
