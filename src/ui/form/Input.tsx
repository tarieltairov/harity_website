import React from 'react';
import styles from './form.module.css';

// Обращаемся к типу напрямую через React.
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Обращаемся к компоненту напрямую через React.forwardRef
export const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`${styles.baseInput} ${className || ''}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';
