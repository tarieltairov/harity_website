import { ROUTES } from '@/config/routes';
import type { SearchSection } from '@/types';

/**
 * «Вы искали» — стартовое наполнение истории запросов (патч 2, экран 10).
 * Дальше история живёт в localStorage, бэку она не нужна (см. docs/api-contract.md).
 */
export const RECENT_SEARCH_QUERIES = ['финансовый отчёт 2025', 'стипендии', 'вакансии'];

/**
 * «Популярные разделы» — это навигация по сайту, а не поисковые запросы:
 * в макете блок так и называется, а в индексе записей типа «Страница» нет.
 */
export const POPULAR_SEARCH_SECTIONS: SearchSection[] = [
  { label: 'Отчёты', to: ROUTES.reports },
  { label: 'Проекты в Оше', to: ROUTES.projects },
  { label: 'Как помочь', to: ROUTES.contacts },
  { label: 'Партнёрам', to: ROUTES.partners },
  { label: 'Пресс-релизы', to: ROUTES.news },
];
