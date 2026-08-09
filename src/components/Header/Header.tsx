import styles from './Header.module.scss';
import logo from '@assets/jpeg/logo.jpeg';
import searchIcon from '@assets/icons/Search.svg';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
import { NAV_LINKS, ROUTES } from '@/config/routes';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to={ROUTES.home} className={styles.logo}>
          <img src={logo} alt="Алтын Мурас" />
          <span>Алтын Мурас</span>
        </NavLink>
        <nav className={clsx(styles.nav, menuOpen && styles.navOpen)}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === ROUTES.home}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.right}>
          <img src={searchIcon} alt="Поиск" />
          <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
