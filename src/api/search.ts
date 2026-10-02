import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query';
import { SEARCH_SUGGEST_LIMIT } from '@/config/search';
import { useLang } from '@/i18n';
import type { Lang } from '@/i18n';
import type { SearchResponse, SearchSuggestResponse, SearchType } from '@/types';
import { request } from './client';
import type { QueryOpts } from './types';

export interface SearchParams {
  q: string;
  /** Без параметра — все типы */
  type?: SearchType;
  /** Фильтр «Период»; без параметра — за всё время */
  year?: number;
  page?: number;
}

export const searchOptions = (params: SearchParams, lang: Lang) =>
  queryOptions({
    queryKey: ['search', 'results', lang, params],
    queryFn: ({ signal }) =>
      request<SearchResponse>('/search', { query: { ...params, lang }, signal }),
  });

/** Страница результатов (экран 11): `pageSize` приходит в ответе (по контракту 10) */
export function useSearch(params: SearchParams, options?: QueryOpts<SearchResponse>) {
  const lang = useLang();

  return useQuery({
    ...searchOptions(params, lang),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export const searchSuggestOptions = (q: string, lang: Lang, limit = SEARCH_SUGGEST_LIMIT) =>
  queryOptions({
    queryKey: ['search', 'suggest', lang, q, limit],
    queryFn: ({ signal }) =>
      request<SearchSuggestResponse>('/search/suggest', { query: { q, limit, lang }, signal }),
  });

/** Живые подсказки в оверлее (экран 10) + `total` для ссылки «Все результаты» */
export function useSearchSuggest(q: string, options?: QueryOpts<SearchSuggestResponse>) {
  const lang = useLang();

  return useQuery({
    ...searchSuggestOptions(q, lang),
    placeholderData: keepPreviousData,
    ...options,
  });
}
