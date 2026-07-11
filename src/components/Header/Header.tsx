import styles from './Header.module.scss';
import logo from "../../../public/лого АМ.jpeg"
import image from "../../../public/images.png"
import { NavLink } from 'react-router-dom';
import { useState } from 'react';


export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <img src={logo} alt="Алтын Мурас" />
          <span>Алтын Мурас</span>
        </NavLink>

        <nav
          className={`${styles.nav} ${
            menuOpen ? styles.navOpen : ""
          }`}
        >
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Главная
          </NavLink>

          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            О фонде
          </NavLink>

          <NavLink to="/news" onClick={() => setMenuOpen(false)}>
            Новости
          </NavLink>

          <NavLink to="/projects" onClick={() => setMenuOpen(false)}>
            Проекты
          </NavLink>

          <NavLink to="/reports" onClick={() => setMenuOpen(false)}>
            Отчёты
          </NavLink>

          <NavLink to="/partners" onClick={() => setMenuOpen(false)}>
            Партнёры
          </NavLink>

          <NavLink to="/contacts" onClick={() => setMenuOpen(false)}>
            Контакты
          </NavLink>
        </nav>

        <div className={styles.right}>
          <img src={image} alt="Поиск" />

          <button
            className={styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}