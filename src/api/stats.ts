import { queryOptions, useQuery } from '@tanstack/react-query';
import { useLang } from '@/i18n';
import type { Lang } from '@/i18n';
import type { StatItem } from '@/types';
import { request } from './client';
import type { QueryOpts } from './types';

export const statsOptions = (lang: Lang) =>
  queryOptions({
    queryKey: ['stats', lang],
    queryFn: ({ signal }) => request<StatItem[]>('/stats', { query: { lang }, signal }),
  });

/** Ключевые цифры фонда: hero на главной и страница «О фонде» */
export function useStats(options?: QueryOpts<StatItem[]>) {
  const lang = useLang();

  return useQuery({ ...statsOptions(lang), ...options });
}
