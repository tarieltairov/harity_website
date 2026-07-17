import type { ReactNode } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline" | 'noborder' ;

}

export function Button({
  children,
  variant = "primary",

  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}