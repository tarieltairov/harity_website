import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query';
import { useLang } from '@/i18n';
import type { Lang } from '@/i18n';
import type { Paginated, Project, ProjectListItem, ProjectStatus } from '@/types';
import { request } from './client';
import { isValidId } from './types';
import type { QueryOpts } from './types';

export interface ProjectsListParams {
  status?: ProjectStatus;
  /** Только «ключевые» проекты — секция на главной */
  featured?: boolean;
  page?: number;
  pageSize?: number;
}

export const projectsListOptions = (params: ProjectsListParams, lang: Lang) =>
  queryOptions({
    queryKey: ['projects', 'list', lang, params],
    queryFn: ({ signal }) =>
      request<Paginated<ProjectListItem>>('/projects', { query: { ...params, lang }, signal }),
  });

/** Список проектов; при смене фильтра или страницы старые карточки остаются до прихода новых */
export function useProjects(
  params: ProjectsListParams,
  options?: QueryOpts<Paginated<ProjectListItem>>
) {
  const lang = useLang();

  return useQuery({
    ...projectsListOptions(params, lang),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export const projectOptions = (id: number, lang: Lang) =>
  queryOptions({
    queryKey: ['projects', 'detail', lang, id],
    queryFn: ({ signal }) => request<Project>(`/projects/${id}`, { query: { lang }, signal }),
  });

/** Деталка проекта. Если `id` из URL не число, запрос не уходит — страница показывает 404 */
export function useProject(id: number | undefined, options?: QueryOpts<Project>) {
  const lang = useLang();

  return useQuery({
    ...projectOptions(id ?? 0, lang),
    ...options,
    enabled: isValidId(id) && (options?.enabled ?? true),
  });
}
