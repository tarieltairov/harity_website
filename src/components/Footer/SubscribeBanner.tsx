import { useState } from 'react';
import clsx from 'clsx';
import { Button } from '@ui/Button';
import { SubscriptionStatus } from '@ui/SubscriptionStatus';
import styles from './Footer.module.scss';

interface SubscribeBannerProps {
  className?: string;
}

export function SubscribeBanner({ className }: SubscribeBannerProps) {
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
        <h3 className={styles.subscribeTitle}>Новости фонда на почту</h3>
        <p className={styles.subscribeDescription}>
          Одно письмо в месяц: проекты, отчёты и истории людей, <br />
          которым помог фонд.
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
                placeholder="Ваш e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
              <Button type="submit" variant="primary">
                Подписаться
              </Button>
            </div>
            <p className={styles.disclaimer}>
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
