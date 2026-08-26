import React from 'react';
import styles from './SubscriptionStatus.module.scss';

interface SubscriptionStatusProps {
  message?: string;
  className?: string;
}

export const SubscriptionStatus: React.FC<SubscriptionStatusProps> = ({
  message = 'Готово — проверьте почту и подтвердите подписку.',
  className = '',
}) => {
  return (
    <div className={`${styles.statusCard} ${className}`}>
      <div className={styles.iconWrapper}>
        {/* Иконка-галочка или зеленый круг */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#14281d"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <p className={styles.text}>{message}</p>
    </div>
  );
};

export default SubscriptionStatus;
