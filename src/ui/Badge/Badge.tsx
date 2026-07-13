import type { ReactNode } from "react";
import styles from './Badge.module.scss';
import clsx from "clsx";

interface BadgeProps {
  children: ReactNode;
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return <span className={clsx(styles.badge, className)}>{children}</span>;
}

