import { queryOptions, useQuery } from '@tanstack/react-query';
import { useLang } from '@/i18n';
import type { Lang } from '@/i18n';
import type { Contacts } from '@/types';
import { request } from './client';
import type { QueryOpts } from './types';

export const contactsOptions = (lang: Lang) =>
  queryOptions({
    queryKey: ['contacts', lang],
    queryFn: ({ signal }) => request<Contacts>('/contacts', { query: { lang }, signal }),
  });

/** Контакты фонда — единственный источник адреса, почты и телефона на всех страницах */
export function useContacts(options?: QueryOpts<Contacts>) {
  const lang = useLang();

  return useQuery({ ...contactsOptions(lang), ...options });
}

/** Бэк отдаёт ссылку на карту без языка подписей — добавляем `hl` текущего языка сайта */
export function localizeMapSrc(src: string, lang: Lang): string {
  const url = new URL(src);
  url.searchParams.set('hl', lang);

  return url.toString();
}
