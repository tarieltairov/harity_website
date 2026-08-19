import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Container } from '@components/Container';
import { FilterChip } from '@ui/FilterChip';
import { NewsCard } from '@components/NewsCard';
import { PROJECTS } from '@/mocks';
import { PROJECT_STATUS_LABEL, type ProjectStatus } from '@/types';
import { getDetailPath, ROUTES } from '@/config/routes';
import styles from './Projects.module.scss';

type ProjectFilter = ProjectStatus | 'all';

const FILTERS: Array<{ title: string; value: ProjectFilter }> = [
  { title: 'Все', value: 'all' },
  { title: 'Активные', value: 'active' },
  { title: 'Завершённые', value: 'completed' },
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');

  const filteredProjects = PROJECTS.filter(
    (project) => activeFilter === 'all' || project.status === activeFilter
  );

  return (
    <section className={styles.projects}>
      <Container>
        <div className={styles.content}>
          <h1 className={styles.title}>Проекты фонда</h1>

          <p className={styles.description}>Активные и завершённые инициативы фонда.</p>
        </div>

        <div className={styles.filters}>
          {FILTERS.map((filter) => (
            <FilterChip
              key={filter.value}
              isActive={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.title}
            </FilterChip>
          ))}
        </div>

        <div className={styles.projectGrid}>
          {filteredProjects.map((project) => (
            <Link key={project.id} to={getDetailPath(ROUTES.project, project.id)}>
              <NewsCard
                image={project.image}
                badgeTitle={PROJECT_STATUS_LABEL[project.status]}
                title={project.title}
                description={project.excerpt}
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
