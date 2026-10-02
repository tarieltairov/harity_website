import { queryOptions, useQuery } from '@tanstack/react-query';
import { useLang } from '@/i18n';
import type { Lang } from '@/i18n';
import type { TeamMember } from '@/types';
import { request } from './client';
import type { QueryOpts } from './types';

export const teamOptions = (lang: Lang) =>
  queryOptions({
    queryKey: ['team', lang],
    queryFn: ({ signal }) => request<TeamMember[]>('/team', { query: { lang }, signal }),
  });

/** Команда фонда — полные профили, модалка открывается без дополнительного запроса */
export function useTeam(options?: QueryOpts<TeamMember[]>) {
  const lang = useLang();

  return useQuery({ ...teamOptions(lang), ...options });
}
