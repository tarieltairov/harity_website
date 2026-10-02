import type { ApiError } from './client';

/** Опции, которые страницы и компоненты могут переопределять у хуков данных */
export interface QueryOpts<T> {
  /** false — запрос не уходит (например, пока нет id или оверлей закрыт) */
  enabled?: boolean;
  /**
   * Пробрасывать ли ошибку в ErrorBoundary (страница 500). По умолчанию — всё, кроме 404;
   * компоненты вне ErrorBoundary (шапка, подвал, модалки) передают false
   */
  throwOnError?: boolean | ((error: ApiError) => boolean);
  /** Что показывать, пока нет данных по новому ключу — обычно keepPreviousData */
  placeholderData?: (previousData: T | undefined) => T | undefined;
  staleTime?: number;
}

/** Ответ форм: `201 { id }` */
export interface CreatedResponse {
  id: number;
}

/** id деталки из URL пригоден для запроса — иначе страница сразу показывает 404 */
export const isValidId = (id: number | undefined): id is number =>
  id !== undefined && Number.isInteger(id) && id > 0;
