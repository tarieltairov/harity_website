import { queryOptions, useQuery } from '@tanstack/react-query';
import { useLang } from '@/i18n';
import type { Lang } from '@/i18n';
import type { DocumentFile, ReportsByYear } from '@/types';
import { request } from './client';
import type { QueryOpts } from './types';

export const reportsOptions = (lang: Lang) =>
  queryOptions({
    queryKey: ['reports', lang],
    queryFn: ({ signal }) => request<ReportsByYear[]>('/reports', { query: { lang }, signal }),
  });

/** Страница «Отчёты»: годы по убыванию, внутри — файлы */
export function useReports(options?: QueryOpts<ReportsByYear[]>) {
  const lang = useLang();

  return useQuery({ ...reportsOptions(lang), ...options });
}

export const fundDocumentsOptions = (lang: Lang) =>
  queryOptions({
    queryKey: ['documents', lang],
    queryFn: ({ signal }) => request<DocumentFile[]>('/documents', { query: { lang }, signal }),
  });

/** Блок «Документы фонда» на странице «О фонде» */
export function useFundDocuments(options?: QueryOpts<DocumentFile[]>) {
  const lang = useLang();

  return useQuery({ ...fundDocumentsOptions(lang), ...options });
}
