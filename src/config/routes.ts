export const ROUTES = {
  home: '/',
  about: '/about',
  news: '/news',
  projects: '/projects',
  reports: '/reports',
  partners: '/partners',
  contacts: '/contacts',
  uiKit: '/ui-kit',
  search: '/search',
} as const;

export const NAV_LINKS = [
  { to: ROUTES.home, label: 'Главная' },
  { to: ROUTES.about, label: 'О фонде' },
  { to: ROUTES.news, label: 'Новости' },
  { to: ROUTES.projects, label: 'Проекты' },
  { to: ROUTES.reports, label: 'Отчёты' },
  { to: ROUTES.partners, label: 'Партнёры' },
  { to: ROUTES.contacts, label: 'Контакты' },
];
