import { Link, useParams } from 'react-router-dom';
import { Container } from '@components/Container';
import { getNewsById } from '@/mocks';
import { ROUTES } from '@/config/routes';
import styles from './NewsDetails.module.scss';

export function NewsDetails() {
  const { id } = useParams<{ id: string }>();
  const article = getNewsById(Number(id));

  if (!article) {
    return (
      <Container className="page">
        <div className={styles.notFound}>
          <h1>Новость не найдена</h1>
          <Link to={ROUTES.news}>Вернуться к новостям</Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="page">
      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>{article.category}</span>
            <time>{article.date}</time>
          </div>
          <h1>{article.title}</h1>
        </header>

        <figure className={styles.hero}>
          <img src={article.image} alt={article.title} />
          {article.imageCaption && <figcaption>{article.imageCaption}</figcaption>}
        </figure>

        <div className={styles.content}>
          {article.lead && <p className={styles.lead}>{article.lead}</p>}
          {article.body?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {article.quote && (
            <blockquote>
              <p>«{article.quote.text}»</p>
              <cite>{article.quote.author}</cite>
            </blockquote>
          )}
        </div>
      </article>
    </Container>
  );
}
