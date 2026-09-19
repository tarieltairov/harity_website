import { getDetailPath, ROUTES } from '@/config/routes';

import { NEWS_ARTICLES } from './news';
import { PROJECTS } from './projects';
import { REPORTS_BY_YEAR } from './documents';

export type SearchIndexType = 'Новость' | 'Проект' | 'Документ';

/** Единая запись поискового индекса — используется и в оверлее Header, и на /search */
export interface SearchIndexItem {
  id: string;
  type: SearchIndexType;
  title: string;
  description: string;
  date: string;
  year: number;
  route: string;
}

function extractYear(dateText: string): number {
  const match = dateText.match(/\d{4}/);
  return match ? Number(match[0]) : new Date().getFullYear();
}

export const SEARCH_INDEX: SearchIndexItem[] = [
  ...NEWS_ARTICLES.map((article): SearchIndexItem => ({
    id: `news-${article.id}`,
    type: 'Новость',
    title: article.title,
    description: article.excerpt,
    date: article.date,
    year: extractYear(article.date),
    route: getDetailPath(ROUTES.newsDetail, article.id),
  })),
  ...PROJECTS.map((project): SearchIndexItem => ({
    id: `project-${project.id}`,
    type: 'Проект',
    title: project.title,
    description: project.excerpt,
    date: project.status === 'active' ? 'Активный проект' : 'Завершённый проект',
    year: project.status === 'active' ? 2026 : 2025,
    route: getDetailPath(ROUTES.project, project.id),
  })),
  ...REPORTS_BY_YEAR.flatMap((group) =>
    group.files.map((file, index): SearchIndexItem => ({
      id: `document-${group.year}-${index}`,
      type: 'Документ',
      title: file.title,
      description: `${file.type} · ${file.size}`,
      date: `${file.type} · ${file.size}`,
      year: group.year,
      route: ROUTES.reports,
    }))
  ),
];

/** Поиск по названию и описанию, без учёта регистра */
export function searchIndex(query: string): SearchIndexItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return SEARCH_INDEX.filter((item) =>
    `${item.title} ${item.description}`.toLowerCase().includes(normalizedQuery)
  );
}
