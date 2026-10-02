import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '@components/Container';
import { Download } from '@ui/Download';
import { Loader } from '@ui/Loader';
import { NotFound } from '@pages/NotFound';
import { isNotFoundError, useNewsArticle } from '@/api';
import { getDetailPath, parseDetailId, ROUTES } from '@/config/routes';
import { useFormat } from '@/i18n';
import styles from './NewsDetails.module.scss';
import { SectionWithCards } from '@components/SectionWithCards';
import { Gallery } from '@ui/Gallery';

// Кнопки «Поделиться» (патч 2, экран 08) — подписи в словаре `news.detail.shareTargets`
const SHARE_TARGETS = ['telegram', 'whatsapp', 'facebook', 'copy'] as const;

export function NewsDetails() {
  const { t } = useTranslation();
  const { formatDate } = useFormat();
  const { id } = useParams<{ id: string }>();
  const articleId = parseDetailId(id);
  const { data: article, error } = useNewsArticle(articleId);

  // Битый id в адресе или NOT_FOUND от API — страница 404 (экран 15);
  // остальные ошибки уходят в ErrorBoundary → страница 500
  if (articleId === undefined || isNotFoundError(error)) {
    return <NotFound />;
  }

  if (!article) {
    return <Loader />;
  }

  const relatedArticles = article.related.map((item) => ({
    id: item.id,
    to: getDetailPath(ROUTES.newsDetail, item.id),
    image: item.image,
    date: formatDate(item.publishedAt),
    title: item.title,
  }));

  return (
    <Container className="page">
      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>{article.category.title}</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          </div>
          <h1>{article.title}</h1>
        </header>

        <figure className={styles.hero}>
          <img src={article.image} alt={article.title} />
          {article.imageCaption && <figcaption>{article.imageCaption}</figcaption>}
        </figure>

        <div className={styles.content}>
          <p className={styles.lead}>{article.lead}</p>
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {article.quote && (
            <blockquote>
              <p>«{article.quote.text}»</p>
              <cite>{article.quote.author}</cite>
            </blockquote>
          )}
        </div>
        <Gallery
          className={styles.gallery}
          images={article.gallery}
          sectionTitle={t('news.detail.gallery')}
        />

        {article.documents.length > 0 && (
          <section className={styles.documents}>
            <div className={styles.documentsList}>
              <h2 className={styles.documentsTitle}>{t('news.detail.documents')}</h2>
              {article.documents.map((document) => (
                <Download
                  key={document.id}
                  title={document.title}
                  format={document.format}
                  sizeBytes={document.sizeBytes}
                  url={document.url}
                  className={styles.documentItem}
                />
              ))}
            </div>
          </section>
        )}

        <div className={styles.shareWrap}>
          <div className={styles.shareInner}>
            <span className={styles.shareTitle}>{t('news.detail.share')}</span>
            <div className={styles.shareButtons}>
              {SHARE_TARGETS.map((target) => (
                <button key={target} type="button" className={styles.shareButton}>
                  {t(`news.detail.shareTargets.${target}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <SectionWithCards cards={relatedArticles} title={t('news.detail.related')} />
        )}
      </article>
    </Container>
  );
}
