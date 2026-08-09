import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Container.module.scss';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return <div className={clsx(styles.container, className)}>{children}</div>;
}
