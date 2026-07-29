import styles from './AboutFund.module.scss';
import aboutfoundImg from '../../../../assets/jpeg/aboutfound.jpg';

export function AboutFund() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img
            src={aboutfoundImg} // Путь к вашей картинке
            alt="Дети фонда"
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <span className={styles.tag}>О ФОНДЕ</span>
          <h2 className={styles.title}>
            Работаем открыто и честно уже 12 лет
          </h2>
          <p className={styles.description}>
            Наша миссия — системная помощь нуждающимся семьям и развитие
            сообществ через образование, медицину и социальную поддержку в самых
            отдалённых регионах страны.
          </p>
          <a href="/about" className={styles.link}>
            Подробнее о фонде <span className={styles.arrow}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
