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

// id деталки из параметра роута: «12» → 12; «abc», «1.5», «-3» → undefined
// (страница сразу показывает 404, запрос в API не уходит)
export const parseDetailId = (raw: string | undefined): number | undefined => {
  if (raw === undefined || !/^\d+$/.test(raw)) return undefined;

  const id = Number(raw);
  return Number.isSafeInteger(id) && id > 0 ? id : undefined;
};

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
