import { queryOptions, useQuery } from '@tanstack/react-query';
import { useLang } from '@/i18n';
import type { Lang } from '@/i18n';
import type { Partner, PartnerDetails } from '@/types';
import { request } from './client';
import { isValidId } from './types';
import type { QueryOpts } from './types';

export const partnersOptions = (lang: Lang) =>
  queryOptions({
    queryKey: ['partners', 'list', lang],
    queryFn: ({ signal }) => request<Partner[]>('/partners', { query: { lang }, signal }),
  });

/** Карточки партнёров (без описания и проектов) */
export function usePartners(options?: QueryOpts<Partner[]>) {
  const lang = useLang();

  return useQuery({ ...partnersOptions(lang), ...options });
}

export const partnerOptions = (id: number, lang: Lang) =>
  queryOptions({
    queryKey: ['partners', 'detail', lang, id],
    queryFn: ({ signal }) =>
      request<PartnerDetails>(`/partners/${id}`, { query: { lang }, signal }),
  });

/** Полный профиль партнёра для модалки (экран 13) */
export function usePartner(id: number | undefined, options?: QueryOpts<PartnerDetails>) {
  const lang = useLang();

  return useQuery({
    ...partnerOptions(id ?? 0, lang),
    ...options,
    enabled: isValidId(id) && (options?.enabled ?? true),
  });
}
