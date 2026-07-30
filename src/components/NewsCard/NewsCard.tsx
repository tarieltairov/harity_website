import { Badge } from '@ui/Badge';
import styles from './NewsCard.module.scss';
import { Button } from '@ui/Button';

interface NewsCardProps {
  image: string;
  badgetitle: string;
  date: string;
  title: string;
  description: string;
}

export function NewsCard({ image, badgetitle, date, title, description }: NewsCardProps) {
  return (
    <article className={styles.card}>
      <img src={image} className={styles.card__image} />
      <div className={styles.card__content}>
        <div className={styles.card__info}>
          {/* <span className={styles.card__category}>
                    {badgetitle}
                </span> */}
          <Badge className={'app-badge'}>{badgetitle}</Badge>
          <span className={styles.card__date}>{date}</span>

          <h3 className={styles.card__title}>{title}</h3>
          <p className={styles.card__description}>{description}</p>
          <Button variant="noborder" className={styles.moreBtn}>
            Читать далее →
          </Button>
        </div>
      </div>
    </article>
  );
}
