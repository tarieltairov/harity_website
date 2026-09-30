import { generatePath } from 'react-router-dom';

// Пути без языкового префикса: /ru, /ky, /en добавляет роутер (basename в LocaleRouter)
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
  search: '/search',
  serverError: '/500',
} as const;

// Роуты деталок — те, у которых в паттерне есть параметр :id
type DetailRoute = Extract<(typeof ROUTES)[keyof typeof ROUTES], `${string}/:id`>;

// Универсальный построитель пути деталки для любой сущности:
// getDetailPath(ROUTES.newsDetail, 1) → '/news/1'
export const getDetailPath = (route: DetailRoute, id: number | string) =>
  generatePath(route, { id: String(id) });

// Подписи — ключи словаря (`t(link.labelKey)`), а не готовые строки: меню на трёх языках
export const NAV_LINKS = [
  { to: ROUTES.home, labelKey: 'nav.home' },
  { to: ROUTES.about, labelKey: 'nav.about' },
  { to: ROUTES.news, labelKey: 'nav.news' },
  { to: ROUTES.projects, labelKey: 'nav.projects' },
  { to: ROUTES.reports, labelKey: 'nav.reports' },
  { to: ROUTES.partners, labelKey: 'nav.partners' },
  { to: ROUTES.contacts, labelKey: 'nav.contacts' },
] as const;
