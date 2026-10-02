import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Footer.module.scss';

interface FooterColumnProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function FooterColumn({ title, children, className }: FooterColumnProps) {
  return (
    <div className={clsx(styles.column, className)}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
