import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./FilterChip.module.scss";


interface FilterChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
}

export function FilterChip({
  className,
  children,
  isActive = false,
  ...props
}: FilterChipProps) {
  return (
    <button
      className={clsx(styles.filterChip, { [styles.active]: isActive }, className)}
      {...props}
    >
      {children}
    </button>
  );
}


