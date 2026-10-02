import type { Paginated } from './api';
import type { DocumentFormat } from './document';

/** Тип материала в поиске — как `type` в контракте; `page` — статическая страница сайта */
export type SearchType = 'news' | 'project' | 'document' | 'page';

/** Элемент выдачи /search и подсказки /search/suggest */
export interface SearchItem {
  type: SearchType;
  id: number;
  title: string;
  /** Подсветку совпадений фронт делает сам по `q` */
  snippet: string;
  /** Зависит от типа: дата (news), статус (project), формат (document), путь страницы (page) */
  meta: string;
  year?: number;
  format?: DocumentFormat;
  sizeBytes?: number;
}

export type SearchCounts = Record<'all' | SearchType, number>;

export interface SearchResponse extends Paginated<SearchItem> {
  /** Счётчики по типам — с учётом `q` и `year`, но без учёта `type` (экран 11) */
  counts: SearchCounts;
  /** Годы для фильтра «Период», по убыванию */
  years: number[];
}

export interface SearchSuggestResponse {
  items: SearchItem[];
  /** Сколько всего найдено — для ссылки «Все результаты» */
  total: number;
}
