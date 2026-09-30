import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Button } from '@ui/Button';
import { SubscriptionStatus } from '@ui/SubscriptionStatus';
import styles from './Footer.module.scss';

interface SubscribeBannerProps {
  className?: string;
}

export function SubscribeBanner({ className }: SubscribeBannerProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    console.log('Подписка оформлена для:', email);
    setIsSubscribed(true);
    setEmail('');
  }

  return (
    <div className={clsx(styles.subscribeBanner, className)}>
      <div className={styles.subscribeInfo}>
        <h3 className={styles.subscribeTitle}>{t('subscribe.title')}</h3>
        <p className={styles.subscribeDescription}>
          <Trans i18nKey="subscribe.description" components={{ br: <br /> }} />
        </p>
      </div>

      <div className={styles.subscribeForm}>
        {isSubscribed ? (
          <SubscriptionStatus />
        ) : (
          <form onSubmit={handleSubscribe}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder={t('subscribe.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
              <Button type="submit" variant="primary">
                {t('subscribe.submit')}
              </Button>
            </div>
            <p className={styles.disclaimer}>{t('subscribe.disclaimer')}</p>
          </form>
        )}
      </div>
    </div>
  );
}
