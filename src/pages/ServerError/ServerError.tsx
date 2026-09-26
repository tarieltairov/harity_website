import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@components/Container';
import { Button } from '@ui/Button';
import { FUND_CONTACTS } from '@/mocks';
import { ROUTES } from '@/config/routes';
import styles from './ServerError.module.scss';

// Код вида ERR–500–2026–0904–1432 (ERR–500–ГГГГ–ММДД–ЧЧММ): по нему поддержка
// находит обращение. Бэкенда нет, поэтому собираем из момента показа ошибки.
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
  const supportCode = useMemo(() => formatSupportCode(new Date()), []);
  const phoneHref = `tel:${FUND_CONTACTS.phone.replace(/[^+\d]/g, '')}`;

  const contacts = [
    {
      label: 'Почта',
      value: FUND_CONTACTS.email,
      href: `mailto:${FUND_CONTACTS.email}`,
      action: 'Написать',
    },
    {
      label: 'Телефон',
      value: FUND_CONTACTS.phone,
      href: phoneHref,
      action: 'Позвонить',
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Container className="page">
        <div className={styles.error}>
          <div className={styles.main}>
            <p className={styles.overline}>Ошибка 500</p>
            {/* Крупная цифра — декоративная: то же самое уже сказано в оверлайне */}
            <p className={styles.code} aria-hidden="true">
              500
            </p>
            <h1 className={styles.title}>Что-то пошло не так на нашей стороне</h1>
            <p className={styles.description}>
              Сервер не смог показать страницу. Мы уже знаем о проблеме и исправляем её — попробуйте
              обновить страницу через минуту.
            </p>

            <div className={styles.actions}>
              <Button
                type="button"
                className={styles.reload}
                onClick={() => window.location.reload()}
              >
                <svg
                  className={styles.reloadIcon}
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
                Обновить страницу
              </Button>

              <Link to={ROUTES.home} className={styles.homeLink} replace>
                На главную
              </Link>
            </div>

            <p className={styles.support}>Код для поддержки: {supportCode}</p>
          </div>

          <aside className={styles.help}>
            <h2 className={styles.helpTitle}>Нужно срочно?</h2>
            <p className={styles.helpText}>
              Если вы не можете дождаться восстановления — напишите или позвоните, мы поможем
              напрямую.
            </p>

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
        </div>
      </Container>
    </div>
  );
}
