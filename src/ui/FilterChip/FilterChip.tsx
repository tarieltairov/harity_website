import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./FilterChip.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function FilterChip({
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={clsx(styles.filterChip, className)}
      {...props}
    >
      {children}
    </button>
  );
}


