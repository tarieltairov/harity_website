import type { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './Form.module.scss';

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={clsx(styles.baseInput, className)} {...props} />;
}
