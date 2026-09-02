import clsx from 'clsx';
import { Badge } from '@ui/Badge';
import styles from './ContentCard.module.scss';
import { Link } from 'react-router-dom';

interface ContentCardProps {
  image: string;
  badgeTitle?: string;
  date?: string;
  title?: string;
  description?: string;
  /** Ссылка на деталку — вся карточка становится кликабельной */
  to?: string;
  /** Показывать текст «Читать далее →» (имеет смысл только вместе с `to`) */
  showReadMore?: boolean;
}

export function ContentCard({
  image,
  badgeTitle,
  date,
  title,
  description,
  to,
  showReadMore = false,
}: ContentCardProps) {
  const content = (
    <>
      <img src={image} alt={title} className={styles.card__image} />
      <div className={styles.card__content}>
        <div className={styles.card__info}>
          {badgeTitle && <Badge className={styles.card__badge}>{badgeTitle}</Badge>}
          {date && <span className={styles.card__date}>{date}</span>}

          {title && <h3 className={styles.card__title}>{title}</h3>}
          {description && <p className={styles.card__description}>{description}</p>}
          {to && showReadMore && <span className={styles.moreBtn}>Читать далее →</span>}
        </div>
      </div>
    </>
  );

  return (
    <article className={clsx(styles.card, to && styles.clickable)}>
      {to ? (
        <Link className={styles.card__link} to={to}>
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  );
}
