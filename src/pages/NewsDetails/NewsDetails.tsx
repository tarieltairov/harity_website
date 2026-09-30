import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '@components/Container';
import { Download } from '@ui/Download';
import { getNewsById, getShareTargets } from '@/mocks';
import { getDetailPath, ROUTES } from '@/config/routes';
import { useFormat, useLang } from '@/i18n';
import styles from './NewsDetails.module.scss';
import { SectionWithCards } from '@components/SectionWithCards';
import { Gallery } from '@ui/Gallery';

export function NewsDetails() {
  const { t } = useTranslation();
  const lang = useLang();
  const { formatDate } = useFormat();
  const { id } = useParams<{ id: string }>();
  const article = getNewsById(Number(id), lang);

  if (!article) {
    return (
      <Container className="page">
        <div className={styles.notFound}>
          <h1>{t('news.detail.notFound')}</h1>
          <Link to={ROUTES.news} replace>
            {t('news.detail.back')}
          </Link>
        </div>
      </Container>
    );
  }

  const relatedArticles = (article.relatedIds ?? [])
    .map((relatedId) => getNewsById(relatedId, lang))
    .filter((item): item is NonNullable<typeof item> => item !== undefined)
    .slice(0, 3)
    .map((item) => ({
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
            <span className={styles.category}>{t(`news.categories.${article.category}`)}</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
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
        <Gallery
          className={styles.gallery}
          images={article.gallery ?? []}
          sectionTitle={t('news.detail.gallery')}
        />

        {article.documents && article.documents.length > 0 && (
          <section className={styles.documents}>
            <div className={styles.documentsList}>
              <h2 className={styles.documentsTitle}>{t('news.detail.documents')}</h2>
              {article.documents.map((document) => (
                <Download
                  key={`${document.title}-${document.type}`}
                  title={document.title}
                  type={document.type}
                  sizeBytes={document.sizeBytes}
                  file={document.file}
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
              {getShareTargets(lang).map((target) => (
                <button key={target.name} type="button" className={styles.shareButton}>
                  {target.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <SectionWithCards cards={relatedArticles} title={t('news.detail.related')} />
      </article>
    </Container>
  );
}
