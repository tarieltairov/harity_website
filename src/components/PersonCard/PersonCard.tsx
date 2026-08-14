import type { TeamMember } from '@/types';
import styles from './PersonCard.module.scss';

interface PersonCardProp {
  items: TeamMember[];
}

export const PersonCard = ({ items }: PersonCardProp) => (
  <div className={styles.stats}>
    {items.map((item) => (
      <div className={styles.stats__item} key={item.id}>
        <div className={styles.stats__ImgWrapper}>
          <img src={item.photo} alt={item.name} />
        </div>
        <div className={styles.stats__Info}>
          <span className={styles.stats__Info_Name}>{item.name}</span>
          <span className={styles.stats__Info_Role}>{item.role}</span>
        </div>
      </div>
    ))}
  </div>
);
