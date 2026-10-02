import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '@components/Container';
import { Gallery } from '@ui/Gallery';
import { CTABanner } from '@ui/CTABanner';
import { Badge } from '@ui/Badge';
import { Button } from '@ui/Button';
import { Loader } from '@ui/Loader';
import { ContentCard } from '@components/ContentCard';
import { NotFound } from '@pages/NotFound';
import { isNotFoundError, useProject } from '@/api';
import { getDetailPath, parseDetailId, ROUTES } from '@/config/routes';
import { useFormat } from '@/i18n';
import styles from './Project.module.scss';

export function Project() {
  const { t } = useTranslation();
  const { formatDate, formatPeriod } = useFormat();
  const { id } = useParams();
  const navigate = useNavigate();
  const projectId = parseDetailId(id);
  const { data: project, error } = useProject(projectId);

  // Битый id в адресе или NOT_FOUND от API — страница 404 (экран 15);
  // остальные ошибки уходят в ErrorBoundary → страница 500
  if (projectId === undefined || isNotFoundError(error)) {
    return <NotFound />;
  }

  if (!project) {
    return <Loader />;
  }

  return (
    <section className={styles.project}>
      <Container>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.meta}>
              <Badge className={styles.status}>{t(`projects.status.${project.status}`)}</Badge>

              {project.period && <span>{formatPeriod(project.period)}</span>}
            </div>

            <h1 className={styles.title}>{project.title}</h1>

            <p className={styles.lead}>{project.lead}</p>

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

        {project.stats.length > 0 && (
          <div className={styles.stats}>
            {project.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {project.body.length > 0 && (
          <section className={styles.description}>
            {project.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        )}

        {project.gallery.length > 0 && (
          <div className={styles.gallerySection}>
            <Gallery images={project.gallery} sectionTitle={t('projects.detail.gallery')} />
          </div>
        )}

        {project.news.length > 0 && (
          <section className={styles.news}>
            <h2>{t('projects.detail.news')}</h2>

            <div className={styles.newsGrid}>
              {project.news.map((news) => (
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
