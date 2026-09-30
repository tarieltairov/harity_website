import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@components/Container';
import { FilterChip } from '@ui/FilterChip';
import { ContentCard } from '@components/ContentCard';
import { getProjects } from '@/mocks';
import type { ProjectStatus } from '@/types';
import { getDetailPath, ROUTES } from '@/config/routes';
import { useLang } from '@/i18n';
import styles from './Projects.module.scss';

type ProjectFilter = ProjectStatus | 'all';

// Подписи — в словаре `projects.filters`
const FILTERS: ProjectFilter[] = ['all', 'active', 'completed'];

export function Projects() {
  const { t } = useTranslation();
  const lang = useLang();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');

  const filteredProjects = getProjects(lang).filter(
    (project) => activeFilter === 'all' || project.status === activeFilter
  );

  return (
    <section className={styles.projects}>
      <Container>
        <div className={styles.content}>
          <h1 className={styles.title}>{t('projects.title')}</h1>

          <p className={styles.description}>{t('projects.subtitle')}</p>
        </div>

        <div className={styles.filters}>
          {FILTERS.map((filter) => (
            <FilterChip
              key={filter}
              isActive={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {t(`projects.filters.${filter}`)}
            </FilterChip>
          ))}
        </div>

        <div className={styles.projectGrid}>
          {filteredProjects.map((project) => (
            <ContentCard
              key={project.id}
              to={getDetailPath(ROUTES.project, project.id)}
              image={project.image}
              badgeTitle={t(`projects.status.${project.status}`)}
              title={project.title}
              description={project.excerpt}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
