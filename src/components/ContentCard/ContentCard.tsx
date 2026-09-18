import clsx from 'clsx';
import { Badge } from '@ui/Badge';
import { Link } from 'react-router-dom';
import { ContentCardSkeleton } from './ContentCardSkeleton';
import styles from './ContentCard.module.scss';

interface ContentCardContentProps {
  isLoading?: false;
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

interface ContentCardLoadingProps {
  /** Состояние загрузки: вместо карточки рендерится ContentCardSkeleton той же геометрии */
  isLoading: true;
  /** Резервировать строку под «Читать далее →», как у карточки с `showReadMore` */
  showReadMore?: boolean;
}

// Размеченное объединение: в загруженном состоянии `image` обязателен,
// в состоянии загрузки остальные пропсы не нужны
type ContentCardProps = ContentCardContentProps | ContentCardLoadingProps;

export function ContentCard(props: ContentCardProps) {
  if (props.isLoading) {
    return <ContentCardSkeleton showReadMore={props.showReadMore} />;
  }

  const { image, badgeTitle, date, title, description, to, showReadMore = false } = props;

  const content = (
    <>
      <img src={image} alt={title} className={styles.card__image} />
      <div className={styles.card__content}>
        {badgeTitle && <Badge>{badgeTitle}</Badge>}
        {date && <span className={styles.card__date}>{date}</span>}

        {title && <h3 className={styles.card__title}>{title}</h3>}
        {description && <p className={styles.card__description}>{description}</p>}
        {to && showReadMore && <span className={styles.moreBtn}>Читать далее →</span>}
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
