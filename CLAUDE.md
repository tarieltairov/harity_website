# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Сайт благотворительного фонда «Алтын Мурас». SPA без бэкенда: сейчас идёт этап вёрстки по HTML-макетам, все данные — моки. Общая документация для людей — в [README.md](README.md); здесь — то, что нужно для продуктивной работы агенту.

## Команды

Пакетный менеджер — Yarn 1 (`yarn.lock`).

```bash
yarn dev          # dev-сервер (http://localhost:5173)
yarn build        # tsc -b (проверка типов) + vite build — основная проверка, тестов в проекте нет
yarn lint         # ESLint
yarn fix          # ESLint --fix + Prettier — прогонять перед коммитом
```

Pre-commit хук (husky + lint-staged) гоняет ESLint с `--max-warnings=0` по `ts/tsx` и `prettier --check` по staged-файлам (включая `scss`, `json`, `html`, `md` — правки доки тоже должны проходить Prettier): любой warning валит коммит, поэтому после правок запускай `yarn fix`, затем проверяй `yarn build`.

## Архитектура

Поток данных: `src/mocks` (данные) → страницы `src/pages` → компоненты. API нет; когда появится бэкенд, замене подлежит только слой `mocks`.

- **Локализация (ky / ru / en)** — `i18next` + `react-i18next`, всё в `src/i18n/`:
  - URL всегда с префиксом: `/ru/news`, `/ky/news`, `/en/news`. Префикс — это `basename` роутера (`components/LocaleRouter` — тот же BrowserRouter, только basename выводится из первого сегмента адреса), поэтому в коде пути пишутся **без языка** (`ROUTES.news`, `<Link to={ROUTES.contacts}>`, `navigate(...)`). Не использовать `<a href="/...">` и `window.location` для внутренних переходов — они минуют basename. Адрес без префикса редиректится на язык из localStorage → браузера → `ru`. Смена языка — `useLanguage().setLang(lang)`: обычный переход по истории на тот же путь с другим префиксом; роутер и страницы не пересоздаются (стейт фильтров, форм и скролл сохраняются), «назад» через границу языка отрабатывает история.
  - Строки UI — только через `t()` из `useTranslation()`. Словари `src/i18n/locales/{ru,ky,en}.ts`; `ru` — эталон, по нему типизированы ключи (опечатка в ключе или пропущенный ключ в `ky`/`en` — ошибка `tsc`). Плюралы — суффиксы `_one/_few/_many/_other` (в ky/en достаточно `_one/_other`). Разметку внутри строки — через `<Trans components={...}>`. Типы ключей наружу — из `@/i18n` (`Dictionary`, `FeedbackErrorKey`), напрямую `locales/ru` в компонентах не импортировать.
  - Константы на уровне модуля (фильтры, меню) хранят ключи/слаги, а не подписи: `NAV_LINKS[].labelKey`, категории новостей — слаги (`news.categories.<slug>`), статусы проектов — `projects.status.<status>`.
  - Даты (ISO), период проекта (`{ from: 'YYYY-MM', to: 'YYYY-MM' | null }`), размеры файлов (байты; единицы и хелперы `kb()`/`mb()` — `src/utils/bytes.ts`), мета поиска форматируются `useFormat()` — сырые строки «3 июля 2026», «март 2024 — сейчас» в данные не класть.
  - `ky.ts` — черновой перевод, нужна вычитка носителем.

- **Маршруты** объявлены в `src/config/routes.ts` (`ROUTES` + `NAV_LINKS`), дерево — в `src/App.tsx`. Роуты (без языкового префикса): `/`, `/about`, `/news`, `/news/:id`, `/projects`, `/projects/:id`, `/reports`, `/partners`, `/contacts`, `/search?q=`, `/500`, `*` (404), `/ui-kit`. Все страницы рендерятся внутри `Layout` (Header + BreadCrumbs + ErrorBoundary + Outlet + Footer), кроме `/ui-kit` — это витрина компонентов вне Layout. Страницы подключены через `React.lazy` (по чанку на роут); Suspense-фоллбек — `@ui/Loader`: в Layout вокруг Outlet, в App — fullScreen для роутов вне Layout. Новые страницы подключать так же лениво.
- **Ошибки рендера**: `Layout` оборачивает Outlet в `@components/ErrorBoundary` с фоллбеком `pages/ServerError` и `key={location.pathname}` (состояние ошибки сбрасывается при переходе). `/500` — отдельный роут только для просмотра страницы; ошибок API пока нет.
- **Деталки и крошки**: пути деталок собирать через `getDetailPath(ROUTES.newsDetail, id)` / `getDetailPath(ROUTES.project, id)` (внутри `generatePath`), не строками. Хлебные крошки рендерит `Layout` → `BreadCrumbs`, на страницах их не верстать; названия — из `NAV_LINKS` + словарь `CRUMB_LABELS` в `BreadCrumbs.tsx` (новой деталке — одна строка со своим резолвером; обе текущие деталки там уже есть). Деталки свёрстаны: `pages/NewsDetails` (экран 08) и `pages/Project` (экран 09).
- **Слой данных** (разделён по сущностям, по файлу на сущность):
  - `src/types/` — типы: `news`, `project`, `partner`, `team`, `document`, `stats`, `contacts`, `search`. Поля деталок/модалок (патч 2) — опциональные (`lead`, `body`, `gallery`, `stats`…). Подписи статусов, категорий и типов материалов — в словарях, а не в типах.
  - `src/mocks/` — данные тех же сущностей, контент взят из макетов. Текстовые поля пишутся как `{ ru, ky, en }` и оборачиваются в `createLocalized` (`mocks/localize.ts`; там же `memoizeByLang` для любых других данных «по языку») — наружу отдаются геттеры по языку: `getNewsArticles(lang)`, `getProjects(lang)`, `getFundContacts(lang)`… (язык — `useLang()`). Связи между сущностями — по id (`relatedIds`, `newsIds`, `projectIds`) + хелперы `getNewsById(id, lang)` / `getProjectById(id, lang)`. Полностью заполненные «эталонные» записи для деталок и модалок: новость id 1 (центр в Оше), проект id 2 (мобильные бригады), партнёр id 9, член команды id 1. Контакты фонда (адрес, почта, телефон) — только из `getFundContacts(lang)`, копий в компонентах не заводить.
  - **Поиск**: `mocks/searchIndex.ts` собирает индекс отдельно для каждого языка из новостей, проектов и отчётов (`SearchIndexItem`: тип `news`/`project`/`document`, год, `route`), экспортирует `searchIndex(query, lang)` — единый матчер для оверлея в `Header` и `pages/SearchPage`, плюс `SEARCH_TYPES`, `SEARCH_YEARS`, `MIN_SEARCH_QUERY_LENGTH` (2, как в контракте). `mocks/search.ts` — «Вы искали» (`getRecentSearchQueries(lang)` — стартовое наполнение, пока нет истории в `localStorage` под ключом `altyn-muras-search-history`) и «Популярные разделы» (`getPopularSearchSections(lang)` — ссылки на разделы, не запросы).
  - Новые захардкоженные массивы в страницах не заводить — данные кладутся в `mocks`, типы в `types`.
  - Бэкенд пишется параллельно по контракту от фронта — `docs/api-contract.md` (источник правды по эндпоинтам и схемам; при изменении сущностей или полей форм обновлять и его). Реализация лежит рядом, в отдельном git-репозитории `../backend` (GitHub: `tarieltairov/harity_website_backend`; NestJS 12 + MongoDB/Mongoose, ESM; своя документация в `backend/docs/` и `backend/CLAUDE.md`): `yarn start:dev` без `.env` поднимает API на `http://localhost:3000/api/v1` с базой в памяти и контентом макетов, `yarn test:e2e` — контрактные тесты. Общая база — MongoDB Atlas, строка подключения только в `backend/.env` (в репозиторий и доку не переносить). Фронт к API ещё не подключён (следующий этап: слой `src/api/` вместо `mocks`, типы по разделу 4 контракта, страницы по одной); при изменении контракта править обе стороны.
- **Компоненты по слоям**: `src/ui/` — примитивы (Button, Badge, FilterChip, Pagination, SegmentedControl, Modal, BottomSheet, Gallery, Skeleton, Download, Loader, CTABanner, SubscriptionStatus, form/), `src/components/` — составные блоки (ContentCard + ContentCardSkeleton, SectionWithCards, BreadCrumbs, StatsBlock, PersonCard, PartnerCardList, FeedbackModal, SuccessModal, ErrorBoundary…), секции конкретной страницы — в `pages/<Page>/components/`. Каждый компонент — папка `Component.tsx` + `Component.module.scss` + `index.ts`.
- **Модалки**: на десктопе `@ui/Modal` (Esc, блокировка скролла, анимация закрытия), на мобильном `@ui/BottomSheet` (обёртка над `vaul`). Переключение по `matchMedia('(max-width: 992px)')` — образец в `components/PersonCard`; данные и флаг открытия держать в разных стейтах, чтобы контент не исчезал до конца анимации. `FeedbackModal` (экран 12) валидирует форму сама и открывает `SuccessModal`.
- **`Button`** умеет рендериться ссылкой (`to`, опционально `replace`) и принимать `icon`; варианты: primary / secondary / ghost / outline / noborder.
- **Скелетоны**: `@ui/Skeleton` (`SkeletonText` / `SkeletonBlock` / `SkeletonCircle`), `ContentCard` с `isLoading` рендерит `ContentCardSkeleton`.
- **Стили**: SCSS-модули; все цвета/шрифты/сетка — CSS-переменные из `src/styles/variables.scss` (`var(--color-accent)` и т.д.), сырые значения в стилях не писать; для новых цветов из макета — добавлять токен с hex-комментарием. Шрифты: Lora (заголовки), Manrope (текст).

## Соглашения и грабли

- Импорты только через алиасы (`@/`, `@components/`, `@ui/`, `@pages/`, `@assets/`, `@styles/`) — правило `@limegrass/import-alias` переписывает относительные `../` автоматически через `yarn fix`.
- В tsconfig включён `verbatimModuleSyntax` — типы импортировать через `import type`.
- Тексты интерфейса — в словарях `src/i18n/locales` (русский — с буквой «ё», как в макетах), не хардкодом в JSX; это касается и витрины `/ui-kit` (секция `uiKit`). Новый текст — ключ сразу во все три словаря. Пропс бейджа у `ContentCard` — `badgeTitle`.
- Новый переиспользуемый компонент в `ui/` или `components/` — сразу добавлять секцией на страницу `/ui-kit` (демо-данные из `@/mocks`), в том же PR.
- Windows; путь к репозиторию содержит кириллицу и пробел («Алтын Мурас») — в shell-командах пути брать в кавычки.

## Макеты (источник правды по дизайну)

Лежат вне репозитория: `C:\Users\User\Desktop\Алтын Мурас\Макеты\` — четыре файла «… (офлайн).html»: «UI Kit и токены», «Макеты сайта» (патч 1, экраны 01–07 — свёрстан), «Макеты патч 2» (экраны 08–14), «Технические экраны» (экраны 15–18). Каждый экран в трёх брейкпоинтах: 390 / 834 / 1440.

Формат — self-extracting HTML-бандлы из Claude Design (3–4 МБ, в основном base64-ассеты — целиком не читать). Полный HTML страницы лежит JSON-строкой в `<script type="__bundler/template">…</script>`: вырезать содержимое тега, `JSON.parse` — дальше обычный HTML; мок-данные экранов — в инлайн-`<script>` внутри этого шаблона.

Состояние по экранам:

- Патч 2, сделано: 08 деталка новости, 09 деталка проекта, 10 поиск-оверлей, 11 страница результатов (фильтры по типу и году, подсветка, пустые состояния, пагинация десктоп/«Показать ещё» на мобайле), 12 модалка «Написать нам» + экран успеха, 13 модалка/шторка члена команды, 14 подписка в футере и переключатель языка ky/ru/en с URL-префиксами (см. «Локализация»).
- Технические экраны, сделано: 15 (404, `pages/NotFound`), 17 (500, `pages/ServerError`), 18 (скелетоны).
- Осталось: модалка партнёра (13; `PartnerCardList` статичный), пагинация ленты новостей (компонент стоит, список не нарезан; 9 карточек на страницу), пустые состояния лент «Новости»/«Проекты» (16), подключение `FeedbackModal` ко всем CTA (часть ведёт на `/contacts`).
- Вне скоупа (следующие заходы): админка, политика конфиденциальности и cookie-баннер, превью PDF в «Отчётах», подключение API.

## Git

Git flow: фичевые ветки (`feat/...`, `fix/...`) → PR в `main`; `dev` — текущая ветка разработки. Коммиты и названия PR — на английском (см. историю), UI-тексты в коде — на русском.
