import { ROUTES } from '@/config/routes';
import type { SearchSection } from '@/types';
import { createLocalized } from './localize';

/**
 * «Вы искали» — стартовое наполнение истории запросов (патч 2, экран 10).
 * Дальше история живёт в localStorage, бэку она не нужна (см. docs/api-contract.md).
 */
export const getRecentSearchQueries = createLocalized<string[]>([
  { ru: 'финансовый отчёт 2025', ky: 'каржылык отчет 2025', en: 'financial report 2025' },
  { ru: 'стипендии', ky: 'стипендиялар', en: 'scholarships' },
  { ru: 'вакансии', ky: 'вакансиялар', en: 'vacancies' },
]);

/**
 * «Популярные разделы» — это навигация по сайту, а не поисковые запросы:
 * в макете блок так и называется, а в индексе записей типа «Страница» нет.
 */
export const getPopularSearchSections = createLocalized<SearchSection[]>([
  { label: { ru: 'Отчёты', ky: 'Отчеттор', en: 'Reports' }, to: ROUTES.reports },
  {
    label: { ru: 'Проекты в Оше', ky: 'Оштогу долбоорлор', en: 'Projects in Osh' },
    to: ROUTES.projects,
  },
  {
    label: { ru: 'Как помочь', ky: 'Кантип жардам берүү', en: 'How to help' },
    to: ROUTES.contacts,
  },
  { label: { ru: 'Партнёрам', ky: 'Өнөктөштөргө', en: 'For partners' }, to: ROUTES.partners },
  { label: { ru: 'Пресс-релизы', ky: 'Пресс-релиздер', en: 'Press releases' }, to: ROUTES.news },
]);
