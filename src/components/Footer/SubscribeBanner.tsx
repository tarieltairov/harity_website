import { useState } from 'react';
import { Button } from '@ui/Button';
import { SubscriptionStatus } from '@ui/SubscriptionStatus';
import styles from './Footer.module.scss';

export function SubscribeBanner() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    console.log('Подписка оформлена для:', email);
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <div className={styles.subscribeBanner}>
      <div className={styles.subscribeInfo}>
        <h3 className={styles.subscribeTitle}>Новости фонда на почту</h3>
        <p className={styles.subscribeDescription}>
          Одно письмо в месяц: проекты, отчёты и истории людей, <br />
          которым помог фонд.
        </p>
      </div>

      {isSubscribed ? (
        <SubscriptionStatus />
      ) : (
        <form className={styles.subscribeForm} onSubmit={handleSubscribe}>
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
            Нажимая кнопку, вы соглашаетесь с политикой <br /> конфиденциальности.
          </p>
        </form>
      )}
    </div>
  );
}
