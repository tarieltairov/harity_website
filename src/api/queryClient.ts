import { QueryClient } from '@tanstack/react-query';
import { isApiError, isNotFoundError } from './client';
import type { ApiError } from './client';

// Все ошибки запросов — ApiError (см. request()), поэтому `error` в хуках типизирован им
declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ApiError;
  }
}

const MINUTE = 60_000;

/**
 * Общие настройки запросов. Контент сайта меняется редко: ответы живут в кеше 5 минут,
 * поэтому переключение языка туда-обратно и возврат на страницу не бьют по серверу
 * (язык входит в ключ запроса — у каждого языка свой кеш, как раньше у memoizeByLang).
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * MINUTE,
      gcTime: 30 * MINUTE,
      refetchOnWindowFocus: false,
      // Повторяем один раз только сетевые сбои и 5xx: 400/404 от повтора не изменятся
      retry: (failureCount, error) =>
        failureCount < 1 && !(isApiError(error) && error.status >= 400 && error.status < 500),
      // Любая ошибка, кроме 404, уходит в ErrorBoundary — страница 500 (экран 17).
      // 404 деталки обрабатывают сами (NotFound). Компоненты вне ErrorBoundary
      // (шапка, подвал, крошки, модалки, страница 500) передают throwOnError: false
      throwOnError: (error) => !isNotFoundError(error),
    },
  },
});
