export type SearchResultType = 'Новость' | 'Проект' | 'Документ' | 'Страница';

/** Живая подсказка в оверлее поиска (патч 2, экран 10) */
export interface SearchSuggestion {
  type: SearchResultType;
  title: string;
  /** Дата, статус проекта или размер файла */
  meta: string;
}

/** Результат на странице поиска (патч 2, экран 11) */
export interface SearchResult {
  type: SearchResultType;
  meta: string;
  title: string;
  snippet: string;
}
