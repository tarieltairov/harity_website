import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { FooterColumn } from './FooterColumn';
import { ROUTES } from '@/config/routes';
import styles from './Footer.module.scss';

interface FooterProps {
  className?: string;
}

type RouterLinkItem = { label: string; to: string };
type ExternalLinkItem = { label: string; href: string };
type NavLinkItem = RouterLinkItem | ExternalLinkItem;

interface NavSection {
  title: string;
  links: NavLinkItem[];
}

const SOCIAL_LINKS = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://facebook.com', label: 'Facebook' },
  { href: 'https://t.me', label: 'Telegram' },
];

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Разделы',
    links: [
      { label: 'О фонде', to: ROUTES.about },
      { label: 'Новости', to: ROUTES.news },
      { label: 'Проекты', to: ROUTES.projects },
    ],
  },
  {
    title: 'Ресурсы',
    links: [
      { label: 'Отчёты и документы', to: ROUTES.reports },
      { label: 'Партнёры', to: ROUTES.partners },
    ],
  },
];

export function Footer({ className }: FooterProps) {
  return (
    <footer className={clsx(styles.footer, className)}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>Алтын Мурас</span>
            <p className={styles.description}>Общественный фонд. Открыто. Честно. Для людей.</p>

            <div className={styles.socials}>
              {SOCIAL_LINKS.map((social) => (
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
          </div>

          {NAV_SECTIONS.map((section) => (
            <FooterColumn key={section.title} title={section.title}>
              {section.links.map((link) => {
                if ('to' in link) {
                  return (
                    <Link key={link.to} to={link.to}>
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <a key={link.href} href={link.href}>
                    {link.label}
                  </a>
                );
              })}
            </FooterColumn>
          ))}

          <FooterColumn title="Контакты">
            <span>г. Бишкек, ул. Абдрахманова, 145</span>
            <a href="mailto:info@altyn-muras.kg">info@altyn-muras.kg</a>
          </FooterColumn>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 Общественный фонд «Алтын Мурас». Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
