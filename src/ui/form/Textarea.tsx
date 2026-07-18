import React from 'react';
import styles from './form.module.css';

// Обращаемся к типам textarea напрямую через React
interface CustomTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, CustomTextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`${styles.baseInput} ${styles.textarea} ${className || ''}`}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';
