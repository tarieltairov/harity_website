import { useState } from 'react';
import { Container } from '@components/Container';
import { FilterChip } from '@ui/FilterChip';
import styles from './Projects.module.scss';

import project1 from '@assets/jpeg/project1.jpg';
import project2 from '@assets/jpeg/project2.jpg';
import project3 from '@assets/jpeg/project3.jpg';
import project4 from '@assets/jpeg/project4.jpeg';
import project5 from '@assets/jpeg/project5.jpeg';
import project6 from '@assets/jpeg/project6.jpeg';

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'completed';
  statusLabel: string;
  image: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: 'Центры  поддержки семей',
    description: 'Психологическая и юридическая помощь многодетным семьям в 5 городах.',
    status: 'active',
    statusLabel: 'Активный',
    image: project1,
  },
  {
    id: 2,
    title: 'Мобильные медицинские бригады',
    description: 'Регулярные выезды врачей в отдалённые сёла и приграничные районы.',
    status: 'active',
    statusLabel: 'Активный',
    image: project2,
  },
  {
    id: 3,
    title: 'Стипендии для студентов',
    description: '40 студентов из малообеспеченных семей получили поддержку в 2025 году.',
    status: 'completed',
    statusLabel: 'Завершен',
    image: project3,
  },

  {
    id: 4,
    title: 'Библиотеки для сельских школ',
    description: 'Оснащены книгами и мебелью 12 школьных библиотек в отдалённых районах.',
    status: 'completed',
    statusLabel: 'Завершен',
    image: project4,
  },
  {
    id: 5,
    title: 'Программа психологической поддержки',
    description: 'Бесплатные консультации психологов для семей, переживших кризисные ситуации.',
    status: 'active',
    statusLabel: 'Активный',
    image: project5,
  },
  {
    id: 6,
    title: 'Экологическая инициатива «Чистые реки»',
    description: 'Очистка русел рек и просветительские программы для школьников.',
    status: 'active',
    statusLabel: 'Активный',
    image: project6,
  },
];
export function Projects() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'active') return project.status === 'active';
    if (activeFilter === 'completed') return project.status === 'completed';
    return true;
  });

  return (
    <section className={styles.projects}>
      <Container>
        <div className={styles.content}>
          <p className={styles.breadcrumbs}>Главная / Проекты</p>

          <h1 className={styles.title}>Проекты фонда</h1>

          <p className={styles.description}>Активные и завершённые инициативы фонда.</p>
        </div>

        <div className={styles.filters}>
          <FilterChip isActive={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>
            Все
          </FilterChip>

          <FilterChip
            isActive={activeFilter === 'active'}
            onClick={() => setActiveFilter('active')}
          >
            Активные
          </FilterChip>

          <FilterChip
            isActive={activeFilter === 'completed'}
            onClick={() => setActiveFilter('completed')}
          >
            Завершен
          </FilterChip>
        </div>
        <div className={styles.projectGrid}>
          {filteredProjects.map((project) => (
            <article className={styles.projectCard} key={project.id}>
              <img className={styles.image} src={project.image} alt={project.title} />

              <div className={styles.projectInfo}>
                <span className={`${styles.status} ${styles[project.status]}`}>
                  {project.statusLabel}
                </span>

                <h3 className={styles.projectTitle}>{project.title}</h3>

                <p className={styles.projectDescription}>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
