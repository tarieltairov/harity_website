import { Badge } from '@ui/Badge';
import styles from './NewsCard.module.scss';
import { Link } from 'react-router-dom';
import { getDetailPath, ROUTES } from '@/config/routes';

interface NewsCardProps {
  id?: number;
  image: string;
  badgeTitle?: string;
  date?: string;
  title?: string;
  description?: string;
  showBtn?: boolean;
}

export function NewsCard({
  id,
  image,
  badgeTitle,
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
          {badgeTitle && <Badge className={styles.card__badge}>{badgeTitle}</Badge>}
          {date && <span className={styles.card__date}>{date}</span>}

          {title && <h3 className={styles.card__title}>{title}</h3>}
          {description && <p className={styles.card__description}>{description}</p>}
          {showBtn && id !== undefined && (
            <Link className={styles.moreBtn} to={getDetailPath(ROUTES.newsDetail, id)}>
              Читать далее →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
