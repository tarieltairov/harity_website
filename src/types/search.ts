/**
 * Тип материала в поисковом индексе (патч 2, экраны 10–11).
 * Контракт знает ещё `page` («Страница») — статических страниц в индексе пока нет,
 * они вынесены в «Популярные разделы» оверлея.
 */
export type SearchResultType = 'Новость' | 'Проект' | 'Документ';

/** Единая запись поискового индекса — и для оверлея в Header, и для страницы /search */
export interface SearchIndexItem {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  /** Дата новости, статус проекта или «PDF · 2.4 МБ» для документа */
  date: string;
  year: number;
  route: string;
}

/** Быстрая ссылка в пустом состоянии оверлея («Популярные разделы») */
export interface SearchSection {
  label: string;
  to: string;
}
