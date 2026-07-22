import { forwardRef, type TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Form.module.scss';

// Используем импортированный тип TextareaHTMLAttributes напрямую
type CustomTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

// Убрали React. перед forwardRef
export const Textarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        // Заменили шаблонную строку на безопасный clsx
        className={clsx(styles.baseInput, styles.textarea, className)}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
