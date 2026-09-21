import { getDetailPath, ROUTES } from '@/config/routes';
import type { SearchIndexItem, SearchResultType } from '@/types';

import { NEWS_ARTICLES } from './news';
import { PROJECTS } from './projects';
import { REPORTS_BY_YEAR } from './documents';

const CURRENT_YEAR = new Date().getFullYear();

/** Год из человекочитаемой даты («3 июля 2026» → 2026). */
function extractYear(dateText: string): number | undefined {
  const match = dateText.match(/\d{4}/);
  return match ? Number(match[0]) : undefined;
}

/**
 * У проекта нет даты публикации — берём первый год из периода
 * («март 2024 — сейчас» → 2024). Без периода активный проект считаем текущим.
 */
function extractProjectYear(project: (typeof PROJECTS)[number]): number {
  const periodYear = project.period ? extractYear(project.period) : undefined;

  if (periodYear) {
    return periodYear;
  }

  return project.status === 'active' ? CURRENT_YEAR : CURRENT_YEAR - 1;
}

export const SEARCH_INDEX: SearchIndexItem[] = [
  ...NEWS_ARTICLES.map((article): SearchIndexItem => ({
    id: `news-${article.id}`,
    type: 'Новость',
    title: article.title,
    description: article.excerpt,
    date: article.date,
    year: extractYear(article.date) ?? CURRENT_YEAR,
    route: getDetailPath(ROUTES.newsDetail, article.id),
  })),
  ...PROJECTS.map((project): SearchIndexItem => ({
    id: `project-${project.id}`,
    type: 'Проект',
    title: project.title,
    description: project.excerpt,
    date: project.status === 'active' ? 'Активный проект' : 'Завершённый проект',
    year: extractProjectYear(project),
    route: getDetailPath(ROUTES.project, project.id),
  })),
  ...REPORTS_BY_YEAR.flatMap((group) =>
    group.files.map((file, index): SearchIndexItem => ({
      id: `document-${group.year}-${index}`,
      type: 'Документ',
      title: file.title,
      // Описание и мета — разные строки: мета уходит в бейдж даты,
      // описание попадает в сниппет под заголовком результата.
      description: `Документ из раздела «Отчёты» за ${group.year} год.`,
      date: `${file.type} · ${file.size}`,
      year: group.year,
      route: ROUTES.reports,
    }))
  ),
];

/** Типы материалов для фильтра «Тип материала» — в порядке из макета (экран 11) */
export const SEARCH_TYPES: SearchResultType[] = ['Новость', 'Проект', 'Документ'];

/** Годы для фильтра «Период» — из самого индекса, по убыванию */
export const SEARCH_YEARS: number[] = [...new Set(SEARCH_INDEX.map((item) => item.year))].sort(
  (a, b) => b - a
);

/**
 * Минимальная длина запроса — из контракта (`docs/api-contract.md`, §Поиск):
 * более короткий запрос бэк отклонит с 400, поэтому и на фронте не ищем.
 */
export const MIN_SEARCH_QUERY_LENGTH = 2;

/** Поиск по названию и описанию, без учёта регистра. Единый матчер для оверлея и /search */
export function searchIndex(query: string): SearchIndexItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.length < MIN_SEARCH_QUERY_LENGTH) {
    return [];
  }

  return SEARCH_INDEX.filter((item) =>
    `${item.title} ${item.description}`.toLowerCase().includes(normalizedQuery)
  );
}
