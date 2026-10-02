import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query';
import { useLang } from '@/i18n';
import type { Lang } from '@/i18n';
import type {
  NewsArticle,
  NewsCategory,
  NewsCategoryCount,
  NewsListItem,
  NewsPreview,
  Paginated,
} from '@/types';
import { request } from './client';
import { isValidId } from './types';
import type { QueryOpts } from './types';

/** Размер страницы ленты по контракту (`pageSize` по умолчанию 9) */
export const NEWS_PAGE_SIZE = 9;

/** Сколько карточек в «Популярном» (контракт: `?limit=3`) */
export const POPULAR_NEWS_LIMIT = 3;

export interface NewsListParams {
  category?: NewsCategory;
  /** Поиск по заголовку */
  q?: string;
  page?: number;
  pageSize?: number;
}

export const newsListOptions = (params: NewsListParams, lang: Lang) =>
  queryOptions({
    queryKey: ['news', 'list', lang, params],
    queryFn: ({ signal }) =>
      request<Paginated<NewsListItem>>('/news', { query: { ...params, lang }, signal }),
  });

/** Лента новостей; при смене страницы или фильтра старые карточки остаются до прихода новых */
export function useNewsList(params: NewsListParams, options?: QueryOpts<Paginated<NewsListItem>>) {
  const lang = useLang();

  return useQuery({
    ...newsListOptions(params, lang),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export const newsCategoriesOptions = (lang: Lang) =>
  queryOptions({
    queryKey: ['news', 'categories', lang],
    queryFn: ({ signal }) =>
      request<NewsCategoryCount[]>('/news/categories', { query: { lang }, signal }),
  });

/** Категории со счётчиками — фильтры ленты и сайдбар «Категории» */
export function useNewsCategories(options?: QueryOpts<NewsCategoryCount[]>) {
  const lang = useLang();

  return useQuery({ ...newsCategoriesOptions(lang), ...options });
}

export const popularNewsOptions = (lang: Lang, limit = POPULAR_NEWS_LIMIT) =>
  queryOptions({
    queryKey: ['news', 'popular', lang, limit],
    queryFn: ({ signal }) =>
      request<NewsPreview[]>('/news/popular', { query: { limit, lang }, signal }),
  });

/** Сайдбар «Популярное» */
export function usePopularNews(options?: QueryOpts<NewsPreview[]>) {
  const lang = useLang();

  return useQuery({ ...popularNewsOptions(lang), ...options });
}

export const newsArticleOptions = (id: number, lang: Lang) =>
  queryOptions({
    queryKey: ['news', 'detail', lang, id],
    queryFn: ({ signal }) => request<NewsArticle>(`/news/${id}`, { query: { lang }, signal }),
  });

/** Деталка новости. Если `id` из URL не число, запрос не уходит — страница показывает 404 */
export function useNewsArticle(id: number | undefined, options?: QueryOpts<NewsArticle>) {
  const lang = useLang();

  return useQuery({
    ...newsArticleOptions(id ?? 0, lang),
    ...options,
    enabled: isValidId(id) && (options?.enabled ?? true),
  });
}
