import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'noborder';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button className={clsx(styles.button, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}
