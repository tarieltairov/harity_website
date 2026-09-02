import clsx from 'clsx';
import styles from './SubscriptionStatus.module.scss';

interface SubscriptionStatusProps {
  message?: string;
  className?: string;
}

export function SubscriptionStatus({
  message = 'Готово — проверьте почту и подтвердите подписку.',
  className,
}: SubscriptionStatusProps) {
  return (
    <div className={clsx(styles.statusCard, className)}>
      <div className={styles.iconWrapper} />
      <p className={styles.text}>{message}</p>
    </div>
  );
}

export default SubscriptionStatus;
