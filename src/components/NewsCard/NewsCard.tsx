import { Badge } from '@ui/Badge';
import styles from './NewsCard.module.scss';
import { Button } from '@ui/Button';

interface NewsCardProps {
  image: string;
  badgeTitle?: string;
  date?: string;
  title?: string;
  description?: string;
}

export function NewsCard({ image, badgeTitle, date, title, description }: NewsCardProps) {
  return (
    <article className={styles.card}>
      <img src={image} alt={title} className={styles.card__image} />
      <div className={styles.card__content}>
        <div className={styles.card__info}>
          <Badge className={'app-badge'}>{badgeTitle ? badgeTitle : ''}</Badge>
          <span className={styles.card__date}>{date ? date : ''}</span>

          <h3 className={styles.card__title}>{title}</h3>
          <p className={styles.card__description}>{description ? description : ''}</p>
          <Button variant="noborder" className={styles.moreBtn}>
            Читать далее →
          </Button>
        </div>
      </div>
    </article>
  );
}
