import type { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './Form.module.scss';

import searchIcon from '@assets/icons/Search.svg';

export function SearchField({ className, ...props }: ComponentProps<'input'>) {
  return (
    <div className={styles.searchWrapper}>
      <span className={styles.iconWrapper}>
        <img src={searchIcon} alt="" className={styles.searchIcon} />
      </span>

      <input
        type="text"
        className={clsx(styles.baseInput, styles.searchInput, className)}
        {...props}
      />
    </div>
  );
}
