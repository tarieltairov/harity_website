import { getDetailPath, ROUTES } from '@/config/routes';
import { DEFAULT_LANG } from '@/i18n';
import type { Lang } from '@/i18n';
import type { Project, SearchIndexItem, SearchResultType } from '@/types';

import { getNewsArticles } from './news';
import { getProjects } from './projects';
import { getReportsByYear } from './documents';
import type { LocalizedText } from './localize';

const CURRENT_YEAR = new Date().getFullYear();

/** Год из ISO-даты или периода («2026-07-03», «март 2024 — сейчас» → первый год) */
function extractYear(text: string): number | undefined {
  const match = text.match(/\d{4}/);
  return match ? Number(match[0]) : undefined;
}

/**
 * У проекта нет даты публикации — берём первый год из периода.
 * Без периода активный проект считаем текущим.
 */
function extractProjectYear(project: Project): number {
  const periodYear = project.period ? extractYear(project.period) : undefined;

  if (periodYear) {
    return periodYear;
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
      year: extractYear(article.publishedAt) ?? CURRENT_YEAR,
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

const searchIndexCache = new Map<Lang, SearchIndexItem[]>();

function getSearchIndex(lang: Lang): SearchIndexItem[] {
  let index = searchIndexCache.get(lang);

  if (!index) {
    index = buildSearchIndex(lang);
    searchIndexCache.set(lang, index);
  }

  return index;
}

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
