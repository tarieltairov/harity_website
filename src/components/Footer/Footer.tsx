import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { FooterColumn } from './FooterColumn';
import styles from './Footer.module.scss';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={clsx(styles.footer, className)}>
      <div className={styles.container}>
        {/* Верхний блок */}
        <div className={styles.top}>
          {/* Бренд */}
          <div className={styles.brand}>
            <span className={styles.logo}>Алтын Мурас</span>
            <p className={styles.description}>Общественный фонд. Открыто. Честно. Для людей.</p>

            <div className={styles.socials}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={styles.socialIcon}
                aria-label="Instagram"
              />
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className={styles.socialIcon}
                aria-label="Facebook"
              />
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className={styles.socialIcon}
                aria-label="Telegram"
              />
            </div>
          </div>

          {/* Колонки */}
          <FooterColumn title="Разделы">
            <Link to="/about">О фонде</Link>
            <Link to="/news">Новости</Link>
            <Link to="/projects">Проекты</Link>
          </FooterColumn>

          <FooterColumn title="Ресурсы">
            <a href="#reports">Отчёты и документы</a>
            <Link to="/partners">Партнёры</Link>
          </FooterColumn>

          <FooterColumn title="Контакты">
            <span>г. Бишкек, ул. Абдрахманова, 145</span>
            <a href="mailto:info@altyn-muras.kg">info@altyn-muras.kg</a>
          </FooterColumn>
        </div>

        {/* Нижний блок */}
        <div className={styles.bottom}>
          <p>© 2026 Общественный фонд «Алтын Мурас». Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
