import styles from './Header.module.scss';
import logo from '../../assets/jpeg/logo.jpeg';
import searchIcon from '../../assets/icons/Search.svg';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const links = [
  {
    to: '/',
    label: 'Главная',
  },
  {
    to: '/about',
    label: 'О фонде',
  },
  {
    to: '/news',
    label: 'Новости',
  },
  {
    to: '/projects',
    label: 'Проекты',
  },
  {
    to: '/reports',
    label: 'Отчёты',
  },
  {
    to: '/partners',
    label: 'Партнёры',
  },
  {
    to: '/contacts',
    label: 'Контакты',
  },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <img src={logo} alt="Алтын Мурас" />
          <span>Алтын Мурас</span>
        </NavLink>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
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
