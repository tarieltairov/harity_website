import type { DocumentFileType } from './document';
import type { ProjectStatus } from './project';

/**
 * Тип материала в поисковом индексе (патч 2, экраны 10–11) — как `type` в контракте.
 * Контракт знает ещё `page` («Страница») — статических страниц в индексе пока нет,
 * они вынесены в «Популярные разделы» оверлея.
 */
export type SearchResultType = 'news' | 'project' | 'document';

interface SearchIndexItemBase {
  id: string;
  title: string;
  description: string;
  year: number;
  route: string;
}

/**
 * Единая запись поискового индекса — и для оверлея в Header, и для страницы /search.
 * Мета зависит от типа (дата, статус или формат с размером) — подпись на текущем
 * языке собирает useFormat().formatSearchMeta.
 */
export type SearchIndexItem = SearchIndexItemBase &
  (
    | { type: 'news'; publishedAt: string }
    | { type: 'project'; status: ProjectStatus }
    | { type: 'document'; format: DocumentFileType; sizeBytes: number }
  );

/** Быстрая ссылка в пустом состоянии оверлея («Популярные разделы») */
export interface SearchSection {
  label: string;
  to: string;
}
