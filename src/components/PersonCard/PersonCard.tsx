import styles from './PersonCard.module.scss';

export interface Person {
  photo: string;
  name: string;
  role: string;
}

interface ProfilePerson {
  items: Person[];
}

export const StatsProfile = ({ items }: ProfilePerson) => (
  <section className={styles.stats}>
    {items.map((item) => (
      <div className={styles.stats__item} key={item.name}>
        <div className={styles.stats__ImgWrapper}>
          <img src={item.photo} alt="" />
        </div>
        <div className={styles.stats__Info}>
          <span className={styles.stats__Info_Name}>{item.name}</span>
          <span className={styles.stats__Info_Role}>{item.role}</span>
        </div>
      </div>
    ))}
  </section>
);
