import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Button } from '@ui/Button';
import { SubscriptionStatus } from '@ui/SubscriptionStatus';
import { isApiError, useSubscribe } from '@/api';
import styles from './Footer.module.scss';

interface SubscribeBannerProps {
  className?: string;
}

export function SubscribeBanner({ className }: SubscribeBannerProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const subscribe = useSubscribe();

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail || subscribe.isPending) return;

    // Повторная подписка того же адреса для бэка — тоже успех (200 вместо 201)
    subscribe.mutate(trimmedEmail, { onSuccess: () => setEmail('') });
  }

  // 400 — бэк не принял адрес; остальное — сервер недоступен
  const errorText = subscribe.error
    ? isApiError(subscribe.error) && subscribe.error.isValidation
      ? t('subscribe.invalidEmail')
      : t('subscribe.error')
    : null;

  return (
    <div className={clsx(styles.subscribeBanner, className)}>
      <div className={styles.subscribeInfo}>
        <h3 className={styles.subscribeTitle}>{t('subscribe.title')}</h3>
        <p className={styles.subscribeDescription}>
          <Trans i18nKey="subscribe.description" components={{ br: <br /> }} />
        </p>
      </div>

      <div className={styles.subscribeForm}>
        {subscribe.isSuccess ? (
          <SubscriptionStatus />
        ) : (
          <form onSubmit={handleSubscribe}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder={t('subscribe.placeholder')}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // Пока адрес правят, старую ошибку не показываем
                  if (subscribe.isError) subscribe.reset();
                }}
                required
                className={clsx(styles.input, errorText && styles.inputError)}
                aria-invalid={errorText ? true : undefined}
              />
              <Button type="submit" variant="primary" disabled={subscribe.isPending}>
                {subscribe.isPending ? t('subscribe.submitting') : t('subscribe.submit')}
              </Button>
            </div>
            {errorText ? (
              <p className={styles.formError} role="alert">
                {errorText}
              </p>
            ) : (
              <p className={styles.disclaimer}>{t('subscribe.disclaimer')}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
