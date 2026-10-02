import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { ParseKeys } from 'i18next';
import clsx from 'clsx';
import { FooterColumn } from './FooterColumn';
import { SubscribeBanner } from './SubscribeBanner';
import { ROUTES } from '@/config/routes';
import { useContacts } from '@/api';
import styles from './Footer.module.scss';

interface FooterProps {
  className?: string;
}

// Подписи — ключи словаря, переводятся при рендере
type RouterLinkItem = { labelKey: ParseKeys; to: string };
type ExternalLinkItem = { labelKey: ParseKeys; href: string };
type NavLinkItem = RouterLinkItem | ExternalLinkItem;

interface NavSection {
  titleKey: ParseKeys;
  links: NavLinkItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    titleKey: 'footer.sections',
    links: [
      { labelKey: 'nav.about', to: ROUTES.about },
      { labelKey: 'nav.news', to: ROUTES.news },
      { labelKey: 'nav.projects', to: ROUTES.projects },
    ],
  },
  {
    titleKey: 'footer.resources',
    links: [
      { labelKey: 'footer.reportsAndDocuments', to: ROUTES.reports },
      { labelKey: 'nav.partners', to: ROUTES.partners },
    ],
  },
];

export function Footer({ className }: FooterProps) {
  const { t } = useTranslation();
  // Футер вне ErrorBoundary: без контактов просто не показываем колонку, а не роняем сайт
  const { data: contacts } = useContacts({ throwOnError: false });

  return (
    <footer className={clsx(styles.footer, className)}>
      <div className={styles.container}>
        <SubscribeBanner />

        {/* Навигация */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>{t('common.brand')}</span>
            <p className={styles.description}>{t('footer.tagline')}</p>

            {contacts && contacts.socials.length > 0 && (
              <div className={styles.socials}>
                {contacts.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialIcon}
                    aria-label={social.label}
                  />
                ))}
              </div>
            )}
          </div>

          {NAV_SECTIONS.map((section) => (
            <FooterColumn key={section.titleKey} title={t(section.titleKey)}>
              {section.links.map((link) => {
                if ('to' in link) {
                  return (
                    <Link key={link.to} to={link.to}>
                      {t(link.labelKey)}
                    </Link>
                  );
                }
                return (
                  <a key={link.href} href={link.href}>
                    {t(link.labelKey)}
                  </a>
                );
              })}
            </FooterColumn>
          ))}

          {contacts && (
            <FooterColumn title={t('footer.contacts')}>
              <span>{contacts.address}</span>
              <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            </FooterColumn>
          )}
        </div>

        <div className={styles.bottom}>
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
