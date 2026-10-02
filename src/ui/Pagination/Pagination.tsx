import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Стрелка «назад» перед номерами — нужна в результатах поиска (патч 2, экран 11) */
  showPrevArrow?: boolean;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showPrevArrow = false,
  className,
}: PaginationProps) => {
  const { t } = useTranslation();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={clsx(styles.paginationContainer, className)}>
      {showPrevArrow && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={clsx(styles.paginationItem, styles.arrow)}
          aria-label={t('pagination.prev')}
        >
          &larr;
        </button>
      )}

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={clsx(styles.paginationItem, {
            [styles.active]: page === currentPage,
          })}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx(styles.paginationItem, styles.arrow)}
        aria-label={t('pagination.next')}
      >
        &rarr;
      </button>
    </div>
  );
};
