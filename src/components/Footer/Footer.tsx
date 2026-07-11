export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Левая колонка */}
        <div className="footer-column brand-info">
          <h2 className="footer-logo">Алтын Мурас</h2>
          <p className="footer-description">
            Общественный фонд. Открыто. Честно.
            <br />
            Для людей.
          </p>
        </div>

        {/* Средняя колонка */}
        <div className="footer-column">
          <h3>Разделы</h3>
          <ul>
            <li><a href="#about">О фонде</a></li>
            <li><a href="#news">Новости</a></li>
            <li><a href="#projects">Проекты</a></li>
          </ul>
        </div>

        {/* Правая колонка */}
        <div className="footer-column">
          <h3>Ресурсы</h3>
          <ul>
            <li><a href="#reports">Отчёты и документы</a></li>
            <li><a href="#partners">Партнёры</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Общественный фонд «Алтын Мурас». Все права защищены.</p>
      </div>
    </footer>
  );
}
