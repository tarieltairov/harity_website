import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import styles from './SubscriptionStatus.module.scss';

interface SubscriptionStatusProps {
  message?: string;
  className?: string;
}

export function SubscriptionStatus({ message, className }: SubscriptionStatusProps) {
  const { t } = useTranslation();

  return (
    <div className={clsx(styles.statusCard, className)}>
      <div className={styles.iconWrapper} />
      <p className={styles.text}>{message ?? t('subscribe.success')}</p>
    </div>
  );
}

export default SubscriptionStatus;
