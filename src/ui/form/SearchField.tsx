import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Form.module.scss';

import searchIcon from '../../assets/icons/Search.svg';

type CustomSearchFieldProps = InputHTMLAttributes<HTMLInputElement>;

export const SearchField = forwardRef<HTMLInputElement, CustomSearchFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={styles.searchWrapper}>
        {/* Обёртка для иконки с абсолютным позиционированием */}
        <span className={styles.iconWrapper}>
          <img src={searchIcon} alt="search-icon" className={styles.searchIcon} />
        </span>

        <input
          ref={ref}
          type="text"
          className={clsx(styles.baseInput, styles.searchInput, className)}
          {...props}
        />
      </div>
    );
  }
);

SearchField.displayName = 'SearchField';
