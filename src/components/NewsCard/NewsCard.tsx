import { Badge } from '@ui/Badge';
import styles from './NewsCard.module.scss';
import { Button } from '@ui/Button';

interface NewsCardProps {
  image: string;
  badgetitle?: string;
  date?: string;
  title?: string;
  description?: string;
  showBtn?: boolean;
}

export function NewsCard({
  image,
  badgetitle,
  date,
  title,
  description,
  showBtn = false,
}: NewsCardProps) {
  return (
    <article className={styles.card}>
      <img src={image} alt={title} className={styles.card__image} />
      <div className={styles.card__content}>
        <div className={styles.card__info}>
          {badgetitle && <Badge className={styles.card__badge}>{badgetitle}</Badge>}
          {date && <span className={styles.card__date}>{date}</span>}

          {title && <h3 className={styles.card__title}>{title}</h3>}
          {description && <p className={styles.card__description}>{description}</p>}
          {showBtn && (
            <Button variant="noborder" className={styles.moreBtn}>
              Читать далее →
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
