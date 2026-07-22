import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Form.module.scss';

// Используем импортированный тип InputHTMLAttributes напрямую
interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {}

// Убрали приставку React. перед forwardRef
export const Input = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        // Заменили шаблонную строку на чистый и безопасный clsx
        className={clsx(styles.baseInput, className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
