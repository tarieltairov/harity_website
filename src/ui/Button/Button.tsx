import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { Link, type LinkProps } from 'react-router-dom';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'noborder';

interface BaseButtonProps {
  variant?: ButtonVariant;
  icon?: ReactNode; // Необязательная иконка
  children?: ReactNode;
  className?: string;
}

type AsButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never;
    replace?: never;
  };

type AsLinkProps = BaseButtonProps &
  LinkProps & {
    to: string;
    replace?: boolean;
  };

type ButtonProps = AsButtonProps | AsLinkProps;

export function Button({ children, variant = 'primary', icon, className, ...props }: ButtonProps) {
  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children && <span>{children}</span>}
    </>
  );

  const combinedClassName = clsx(styles.button, styles[variant], className);

  if ('to' in props && props.to) {
    const { to, replace, ...linkProps } = props as AsLinkProps;
    return (
      <Link to={to} replace={replace} className={combinedClassName} {...linkProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as AsButtonProps;
  return (
    <button type="button" className={combinedClassName} {...buttonProps}>
      {content}
    </button>
  );
}
