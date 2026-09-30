import { getDetailPath, ROUTES } from '@/config/routes';
import { DEFAULT_LANG } from '@/i18n';
import type { Lang } from '@/i18n';
import type { Project, SearchIndexItem, SearchResultType } from '@/types';

import { getNewsArticles } from './news';
import { getProjects } from './projects';
import { getReportsByYear } from './documents';
import { memoizeByLang } from './localize';
import type { LocalizedText } from './localize';

const CURRENT_YEAR = new Date().getFullYear();

/** Год из ISO-даты или месяца: «2026-07-03» → 2026, «2024-03» → 2024 */
const yearOf = (isoDate: string) => Number(isoDate.slice(0, 4));

/**
 * У проекта нет даты публикации — берём год начала периода.
 * Без периода активный проект считаем текущим.
 */
function extractProjectYear(project: Project): number {
  if (project.period) {
    return yearOf(project.period.from);
  }

  return project.status === 'active' ? CURRENT_YEAR : CURRENT_YEAR - 1;
}

// Описание документа — это текст сниппета, поэтому оно здесь, а не в словаре интерфейса
const documentDescription = (year: number): LocalizedText => ({
  ru: `Документ из раздела «Отчёты» за ${year} год.`,
  ky: `«Отчеттор» бөлүмүнөн ${year}-жылдагы документ.`,
  en: `A document from the “Reports” section for ${year}.`,
});

function buildSearchIndex(lang: Lang): SearchIndexItem[] {
  return [
    ...getNewsArticles(lang).map((article): SearchIndexItem => ({
      id: `news-${article.id}`,
      type: 'news',
      title: article.title,
      description: article.excerpt,
      publishedAt: article.publishedAt,
      year: yearOf(article.publishedAt),
      route: getDetailPath(ROUTES.newsDetail, article.id),
    })),
    ...getProjects(lang).map((project): SearchIndexItem => ({
      id: `project-${project.id}`,
      type: 'project',
      title: project.title,
      description: project.excerpt,
      status: project.status,
      year: extractProjectYear(project),
      route: getDetailPath(ROUTES.project, project.id),
    })),
    ...getReportsByYear(lang).flatMap((group) =>
      group.files.map((file, index): SearchIndexItem => ({
        id: `document-${group.year}-${index}`,
        type: 'document',
        title: file.title,
        description: documentDescription(group.year)[lang],
        format: file.type,
        sizeBytes: file.sizeBytes,
        year: group.year,
        route: ROUTES.reports,
      }))
    ),
  ];
}

const getSearchIndex = memoizeByLang(buildSearchIndex);

/** Типы материалов для фильтра «Тип материала» — в порядке из макета (экран 11) */
export const SEARCH_TYPES: SearchResultType[] = ['news', 'project', 'document'];

/** Годы для фильтра «Период» — из самого индекса, по убыванию. От языка не зависят */
export const SEARCH_YEARS: number[] = [
  ...new Set(getSearchIndex(DEFAULT_LANG).map((item) => item.year)),
].sort((a, b) => b - a);

/**
 * Минимальная длина запроса — из контракта (`docs/api-contract.md`, §Поиск):
 * более короткий запрос бэк отклонит с 400, поэтому и на фронте не ищем.
 */
export const MIN_SEARCH_QUERY_LENGTH = 2;

/**
 * Поиск по названию и описанию на текущем языке, без учёта регистра.
 * Единый матчер для оверлея и /search
 */
export function searchIndex(query: string, lang: Lang): SearchIndexItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.length < MIN_SEARCH_QUERY_LENGTH) {
    return [];
  }

  return getSearchIndex(lang).filter((item) =>
    `${item.title} ${item.description}`.toLowerCase().includes(normalizedQuery)
  );
}
