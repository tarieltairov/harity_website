import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container } from '@components/Container';
import { Gallery } from '@ui/Gallery';
import { CTABanner } from '@ui/CTABanner';
import { getNewsById, getProjectById } from '@/mocks';
import { PROJECT_STATUS_LABEL } from '@/types';
import { ROUTES } from '@/config/routes';
import styles from './Project.module.scss';

export function Project() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = getProjectById(Number(id));

  if (!project) {
    return <p>Проект не найден</p>;
  }
  const projectNews = (project.newsIds ?? []).map(getNewsById).filter((news) => news !== undefined);

  return (
    <section className={styles.project}>
      <Container>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.meta}>
              <span className={styles.status}>{PROJECT_STATUS_LABEL[project.status]}</span>

              {project.period && <span>{project.period}</span>}
            </div>

            <h1 className={styles.title}>{project.title}</h1>

            {project.lead && <p className={styles.lead}>{project.lead}</p>}

            <div className={styles.actions}>
              <button type="button" className={styles.supportButton}>
                Поддержать проект
              </button>

              <Link to={ROUTES.reports} className={styles.reportButton}>
                Отчёты по проекту
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
            <Gallery images={project.gallery} />
          </div>
        )}

        {projectNews.length > 0 && (
          <section className={styles.news}>
            <h2>Новости проекта</h2>

            <div className={styles.newsGrid}>
              {projectNews.map((news) => (
                <article key={news.id} className={styles.newsCard}>
                  <img src={news.image} alt={news.title} />

                  <div className={styles.newsContent}>
                    <time>{news.date}</time>
                    <h3>{news.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
        {project.supportNote && (
          <div className={styles.supportBanner}>
            <CTABanner
              title="Хотите поддержать этот проект?"
              description={`${project.supportNote} Напишите нам, расскажем о формах поддержки.`}
              buttonText="Написать нам"
              onBtnClick={() => navigate('/contacts')}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
