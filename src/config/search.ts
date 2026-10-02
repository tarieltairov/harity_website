import type { SearchItem, SearchType } from '@/types';
import { getDetailPath, ROUTES } from './routes';

/**
 * Минимальная длина запроса — из контракта (`docs/api-contract.md`, §Поиск):
 * более короткий запрос бэк отклоняет с 400, поэтому и не спрашиваем.
 */
export const MIN_SEARCH_QUERY_LENGTH = 2;

/** Подсказок в оверлее (экран 10) */
export const SEARCH_SUGGEST_LIMIT = 3;

/** Типы материалов для фильтра «Тип материала» — в порядке из макета (экран 11) */
export const SEARCH_TYPES: SearchType[] = ['news', 'project', 'document', 'page'];

/** «Вы искали» живёт в localStorage, бэку история не нужна */
export const SEARCH_HISTORY_KEY = 'altyn-muras-search-history';
export const MAX_RECENT_QUERIES = 5;

/**
 * «Популярные разделы» в пустом оверлее и на странице поиска — это навигация по сайту,
 * а не поисковые запросы: статика на фронте, подписи — ключи словаря `search.sections`.
 */
export const POPULAR_SEARCH_SECTIONS = [
  { labelKey: 'search.sections.reports', to: ROUTES.reports },
  { labelKey: 'search.sections.projectsOsh', to: ROUTES.projects },
  { labelKey: 'search.sections.howToHelp', to: ROUTES.contacts },
  { labelKey: 'search.sections.partners', to: ROUTES.partners },
  { labelKey: 'search.sections.press', to: ROUTES.news },
] as const;

/** Куда ведёт результат: деталка, раздел «Отчёты» или статическая страница (её путь — в `meta`) */
export function getSearchItemPath(item: SearchItem): string {
  switch (item.type) {
    case 'news':
      return getDetailPath(ROUTES.newsDetail, item.id);
    case 'project':
      return getDetailPath(ROUTES.project, item.id);
    case 'document':
      return ROUTES.reports;
    case 'page':
      return item.meta;
  }
}
