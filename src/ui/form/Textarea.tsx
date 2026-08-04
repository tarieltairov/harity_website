import type { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './Form.module.scss';

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={clsx(styles.baseInput, styles.textarea, className)} {...props} />;
}
