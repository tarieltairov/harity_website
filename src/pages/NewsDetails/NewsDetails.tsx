import { Link, useParams } from 'react-router-dom';
import { Container } from '@components/Container';
import { Download } from '@ui/Download';
import { getNewsById, SHARE_TARGETS } from '@/mocks';
import { ROUTES } from '@/config/routes';
import styles from './NewsDetails.module.scss';
import { SectionWithCards } from '@components/SectionWithCards';

export function NewsDetails() {
  const { id } = useParams<{ id: string }>();
  const article = getNewsById(Number(id));

  if (!article) {
    return (
      <Container className="page">
        <div className={styles.notFound}>
          <h1>Новость не найдена</h1>
          <Link to={ROUTES.news} replace>
            Вернуться к новостям
          </Link>
        </div>
      </Container>
    );
  }

  const relatedArticles = (article.relatedIds ?? [])
    .map((relatedId) => getNewsById(relatedId))
    .filter((item): item is NonNullable<typeof item> => item !== undefined)
    .slice(0, 3);

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

        <div>TODO: добавить фотогаллерею как будет готово</div>

        {article.documents && article.documents.length > 0 && (
          <section className={styles.documents}>
            <div className={styles.documentsList}>
              <h2 className={styles.documentsTitle}>Документы к материалу</h2>
              {article.documents.map((document) => (
                <Download
                  key={`${document.title}-${document.type}`}
                  title={document.title}
                  type={document.type}
                  size={document.size}
                  file={document.file}
                  className={styles.documentItem}
                />
              ))}
            </div>
          </section>
        )}

        <div className={styles.shareWrap}>
          <div className={styles.shareInner}>
            <span className={styles.shareTitle}>Поделиться материалом</span>
            <div className={styles.shareButtons}>
              {SHARE_TARGETS.map((target) => (
                <button key={target.name} type="button" className={styles.shareButton}>
                  {target.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <SectionWithCards cards={relatedArticles} title="Читайте также" />
      </article>
    </Container>
  );
}
