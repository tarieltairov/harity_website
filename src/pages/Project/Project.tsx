import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '@components/Container';
import { Gallery } from '@ui/Gallery';
import { CTABanner } from '@ui/CTABanner';
import { Badge } from '@ui/Badge';
import { Button } from '@ui/Button';
import { ContentCard } from '@components/ContentCard';
import { getNewsById, getProjectById } from '@/mocks';
import { getDetailPath, ROUTES } from '@/config/routes';
import { useFormat, useLang } from '@/i18n';
import styles from './Project.module.scss';

export function Project() {
  const { t } = useTranslation();
  const lang = useLang();
  const { formatDate } = useFormat();
  const { id } = useParams();
  const navigate = useNavigate();

  const project = getProjectById(Number(id), lang);

  if (!project) {
    return <p>{t('projects.detail.notFound')}</p>;
  }
  const projectNews = (project.newsIds ?? [])
    .map((newsId) => getNewsById(newsId, lang))
    .filter((news) => news !== undefined);

  return (
    <section className={styles.project}>
      <Container>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.meta}>
              <Badge className={styles.status}>{t(`projects.status.${project.status}`)}</Badge>

              {project.period && <span>{project.period}</span>}
            </div>

            <h1 className={styles.title}>{project.title}</h1>

            {project.lead && <p className={styles.lead}>{project.lead}</p>}

            <div className={styles.actions}>
              <Button
                type="button"
                className={styles.supportButton}
                onClick={() => navigate(ROUTES.contacts)}
              >
                {t('projects.detail.support')}
              </Button>

              <Link to={ROUTES.reports} className={styles.reportButton}>
                {t('projects.detail.reports')}
              </Link>
            </div>
          </div>

          <img src={project.image} alt={project.title} className={styles.heroImage} />
        </div>

        {project.stats && project.stats.length > 0 && (
          <div className={styles.stats}>
            {project.stats?.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {project.body && project.body.length > 0 && (
          <section className={styles.description}>
            {project.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <div className={styles.gallerySection}>
            <Gallery images={project.gallery} sectionTitle={t('projects.detail.gallery')} />
          </div>
        )}

        {projectNews.length > 0 && (
          <section className={styles.news}>
            <h2>{t('projects.detail.news')}</h2>

            <div className={styles.newsGrid}>
              {projectNews.map((news) => (
                <ContentCard
                  key={news.id}
                  to={getDetailPath(ROUTES.newsDetail, news.id)}
                  image={news.image}
                  date={formatDate(news.publishedAt)}
                  title={news.title}
                />
              ))}
            </div>
          </section>
        )}
        {project.supportNote && (
          <div className={styles.supportBanner}>
            <CTABanner
              title={t('projects.detail.ctaTitle')}
              description={t('projects.detail.ctaDescription', { note: project.supportNote })}
              buttonText={t('common.writeUs')}
              onBtnClick={() => navigate(ROUTES.contacts)}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
