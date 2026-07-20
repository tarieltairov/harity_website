
import clsx from 'clsx';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // Генерируем массив со страницами [1, 2, 3...]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.paginationContainer}>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={clsx(styles.paginationItem, {
            [styles.active]: page === currentPage,
          })}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx(styles.paginationItem, styles.arrow)}
        aria-label="Next page"
      >
        &rarr;
      </button>
    </div>
  );
};

Pagination.displayName = 'Pagination';
