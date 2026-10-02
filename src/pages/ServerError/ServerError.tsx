import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@components/Container';
import { Button } from '@ui/Button';
import { useContacts } from '@/api';
import { ROUTES } from '@/config/routes';
import styles from './ServerError.module.scss';

// Код вида ERR–500–2026–0904–1432 (ERR–500–ГГГГ–ММДД–ЧЧММ): по нему поддержка
// находит обращение. Собираем из момента показа ошибки.
function formatSupportCode(date: Date) {
  const pad = (value: number) => String(value).padStart(2, '0');

  return [
    'ERR',
    '500',
    date.getFullYear(),
    `${pad(date.getMonth() + 1)}${pad(date.getDate())}`,
    `${pad(date.getHours())}${pad(date.getMinutes())}`,
  ].join('–');
}

export function ServerError() {
  const { t } = useTranslation();
  // Это фоллбек ErrorBoundary: если API лежит, контактов не будет —
  // блок «Нужно срочно?» просто не показываем, а ошибку не пробрасываем (иначе зациклимся)
  const { data: fundContacts } = useContacts({ throwOnError: false });
  const supportCode = useMemo(() => formatSupportCode(new Date()), []);

  const contacts = fundContacts
    ? [
        {
          label: t('serverError.emailLabel'),
          value: fundContacts.email,
          href: `mailto:${fundContacts.email}`,
          action: t('serverError.write'),
        },
        {
          label: t('serverError.phoneLabel'),
          value: fundContacts.phone,
          href: `tel:${fundContacts.phone.replace(/[^+\d]/g, '')}`,
          action: t('serverError.call'),
        },
      ]
    : [];

  return (
    <div className={styles.wrapper}>
      <Container className="page">
        <div className={styles.error}>
          <div className={styles.main}>
            <p className={styles.overline}>{t('serverError.overline')}</p>
            {/* Крупная цифра — декоративная: то же самое уже сказано в оверлайне */}
            <p className={styles.code} aria-hidden="true">
              500
            </p>
            <h1 className={styles.title}>{t('serverError.title')}</h1>
            <p className={styles.description}>{t('serverError.description')}</p>

            <div className={styles.actions}>
              <Button
                type="button"
                onClick={() => window.location.reload()}
                icon={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 11.5a8 8 0 1 1-2.35-5.65" />
                    <path d="M20 4v5h-5" />
                  </svg>
                }
              >
                {t('serverError.reload')}
              </Button>

              <Button to={ROUTES.home} variant="outline" className={styles.homeLink} replace>
                {t('serverError.home')}
              </Button>
            </div>

            <p className={styles.support}>{t('serverError.supportCode', { code: supportCode })}</p>
          </div>

          {contacts.length > 0 && (
            <aside className={styles.help}>
              <h2 className={styles.helpTitle}>{t('serverError.helpTitle')}</h2>
              <p className={styles.helpText}>{t('serverError.helpText')}</p>

              <ul className={styles.contactList}>
                {contacts.map((contact) => (
                  <li className={styles.contactRow} key={contact.label}>
                    <span className={styles.contactInfo}>
                      <span className={styles.contactLabel}>{contact.label}</span>
                      <span className={styles.contactValue}>{contact.value}</span>
                    </span>
                    <a className={styles.contactAction} href={contact.href}>
                      {contact.action}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </Container>
    </div>
  );
}
