import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@components/Container';
import { FilterChip } from '@ui/FilterChip';
import { Pagination } from '@ui/Pagination';
import { ContentCard } from '@components/ContentCard';
import { useProjects } from '@/api';
import type { ProjectStatus } from '@/types';
import { getDetailPath, ROUTES } from '@/config/routes';
import styles from './Projects.module.scss';

type ProjectFilter = ProjectStatus | 'all';

// Подписи — в словаре `projects.filters`
const FILTERS: ProjectFilter[] = ['all', 'active', 'completed'];

/** Скелетонов на первую загрузку — два ряда сетки по макету */
const SKELETON_COUNT = 6;

export function Projects() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [page, setPage] = useState(1);

  // Фильтр по статусу и страницы — на бэке (контракт: /projects?status=&page=)
  const { data: projects } = useProjects({
    status: activeFilter === 'all' ? undefined : activeFilter,
    page,
  });

  const handleFilterChange = (filter: ProjectFilter) => {
    setActiveFilter(filter);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo(0, 0);
  };

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
              onClick={() => handleFilterChange(filter)}
            >
              {t(`projects.filters.${filter}`)}
            </FilterChip>
          ))}
        </div>

        {projects ? (
          projects.items.length > 0 ? (
            <div className={styles.projectGrid}>
              {projects.items.map((project) => (
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
          ) : (
            <p className={styles.empty}>{t('projects.empty')}</p>
          )
        ) : (
          <div className={styles.projectGrid} aria-busy="true">
            {Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <ContentCard key={index} isLoading />
            ))}
          </div>
        )}

        {projects && projects.totalPages > 1 && (
          <Pagination
            className={styles.pagination}
            currentPage={projects.page}
            totalPages={projects.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
    </section>
  );
}
