import React from 'react';
import styles from './form.module.css';

// Обращаемся к типам инпута напрямую через React
interface CustomSearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchField = React.forwardRef<HTMLInputElement, CustomSearchFieldProps>(({ className, ...props }, ref) => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <span
        style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          color: 'oklch(0.6 0 0)',
          pointerEvents: 'none',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>
      
      <input
        ref={ref}
        type="text"
        className={`${styles.baseInput} ${styles.searchInput} ${className || ''}`}
        {...props}
      />
    </div>
  );
});

SearchField.displayName = 'SearchField';
