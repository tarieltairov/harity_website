import styles from './AboutFund.module.scss';
import aboutFundImg from '@assets/jpeg/aboutfund.jpg';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

export function AboutFund() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img src={aboutFundImg} alt="Дети фонда" className={styles.image} />
        </div>

        <div className={styles.content}>
          <span className={styles.tag}>О ФОНДЕ</span>
          <h2 className={styles.title}>Работаем открыто и честно уже 12 лет</h2>
          <p className={styles.description}>
            Наша миссия — системная помощь нуждающимся семьям и развитие сообществ через
            образование, медицину и социальную поддержку в самых отдалённых регионах страны.
          </p>
          <Link to={ROUTES.about} className={styles.link}>
            Подробнее о фонде <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
