import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '80px 16px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: 72, marginBottom: 8 }}>404</h1>
      <p style={{ marginBottom: 24 }}>Страница не найдена</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}
