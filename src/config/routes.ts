import { generatePath } from 'react-router-dom';

export const ROUTES = {
  home: '/',
  about: '/about',
  news: '/news',

  newsDetail: '/news/:id',

  project: '/projects/:id',

  projects: '/projects',
  reports: '/reports',
  partners: '/partners',
  contacts: '/contacts',
  uiKit: '/ui-kit',
} as const;

// Роуты деталок — те, у которых в паттерне есть параметр :id
type DetailRoute = Extract<(typeof ROUTES)[keyof typeof ROUTES], `${string}/:id`>;

// Универсальный построитель пути деталки для любой сущности:
// getDetailPath(ROUTES.newsDetail, 1) → '/news/1'
export const getDetailPath = (route: DetailRoute, id: number | string) =>
  generatePath(route, { id: String(id) });

export const NAV_LINKS = [
  { to: ROUTES.home, label: 'Главная' },
  { to: ROUTES.about, label: 'О фонде' },
  { to: ROUTES.news, label: 'Новости' },
  { to: ROUTES.projects, label: 'Проекты' },
  { to: ROUTES.reports, label: 'Отчёты' },
  { to: ROUTES.partners, label: 'Партнёры' },
  { to: ROUTES.contacts, label: 'Контакты' },
];
