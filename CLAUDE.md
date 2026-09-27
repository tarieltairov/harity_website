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

- **Маршруты** объявлены в `src/config/routes.ts` (`ROUTES` + `NAV_LINKS`), дерево — в `src/App.tsx`. Роуты: `/`, `/about`, `/news`, `/news/:id`, `/projects`, `/projects/:id`, `/reports`, `/partners`, `/contacts`, `/search?q=`, `/500`, `*` (404), `/ui-kit`. Все страницы рендерятся внутри `Layout` (Header + BreadCrumbs + ErrorBoundary + Outlet + Footer), кроме `/ui-kit` — это витрина компонентов вне Layout. Страницы подключены через `React.lazy` (по чанку на роут); Suspense-фоллбек — `@ui/Loader`: в Layout вокруг Outlet, в App — fullScreen для роутов вне Layout. Новые страницы подключать так же лениво.
- **Ошибки рендера**: `Layout` оборачивает Outlet в `@components/ErrorBoundary` с фоллбеком `pages/ServerError` и `key={location.pathname}` (состояние ошибки сбрасывается при переходе). `/500` — отдельный роут только для просмотра страницы; ошибок API пока нет.
- **Деталки и крошки**: пути деталок собирать через `getDetailPath(ROUTES.newsDetail, id)` / `getDetailPath(ROUTES.project, id)` (внутри `generatePath`), не строками. Хлебные крошки рендерит `Layout` → `BreadCrumbs`, на страницах их не верстать; названия — из `NAV_LINKS` + словарь `CRUMB_LABELS` в `BreadCrumbs.tsx` (новой деталке — одна строка со своим резолвером; обе текущие деталки там уже есть). Деталки свёрстаны: `pages/NewsDetails` (экран 08) и `pages/Project` (экран 09).
- **Слой данных** (разделён по сущностям, по файлу на сущность):
  - `src/types/` — типы: `news`, `project`, `partner`, `team`, `document`, `stats`, `contacts`, `search`. Поля деталок/модалок (патч 2) — опциональные (`lead`, `body`, `gallery`, `stats`…). Подписи статусов проекта — `PROJECT_STATUS_LABEL` из `types/project`.
  - `src/mocks/` — данные тех же сущностей, контент взят из макетов. Связи между сущностями — по id (`relatedIds`, `newsIds`, `projectIds`) + хелперы `getNewsById` / `getProjectById`. Полностью заполненные «эталонные» записи для деталок и модалок: новость id 1 (центр в Оше), проект id 2 (мобильные бригады), партнёр id 9, член команды id 1.
  - **Поиск**: `mocks/searchIndex.ts` собирает `SEARCH_INDEX` из новостей, проектов и отчётов (`SearchIndexItem`: тип «Новость»/«Проект»/«Документ», год, `route`), экспортирует `searchIndex(query)` — единый матчер для оверлея в `Header` и `pages/SearchPage`, плюс `SEARCH_TYPES`, `SEARCH_YEARS`, `MIN_SEARCH_QUERY_LENGTH` (2, как в контракте). `mocks/search.ts` — «Вы искали» (`RECENT_SEARCH_QUERIES`, дальше история в `localStorage` под ключом `altyn-muras-search-history`) и «Популярные разделы» (`POPULAR_SEARCH_SECTIONS` — ссылки на разделы, не запросы).
  - Новые захардкоженные массивы в страницах не заводить — данные кладутся в `mocks`, типы в `types`.
  - Бэкенд пишется параллельно по контракту от фронта — `docs/api-contract.md` (источник правды по эндпоинтам и схемам; при изменении сущностей или полей форм обновлять и его).
- **Компоненты по слоям**: `src/ui/` — примитивы (Button, Badge, FilterChip, Pagination, SegmentedControl, Modal, BottomSheet, Gallery, Skeleton, Download, Loader, CTABanner, SubscriptionStatus, form/), `src/components/` — составные блоки (ContentCard + ContentCardSkeleton, SectionWithCards, BreadCrumbs, StatsBlock, PersonCard, PartnerCardList, FeedbackModal, SuccessModal, ErrorBoundary…), секции конкретной страницы — в `pages/<Page>/components/`. Каждый компонент — папка `Component.tsx` + `Component.module.scss` + `index.ts`.
- **Модалки**: на десктопе `@ui/Modal` (Esc, блокировка скролла, анимация закрытия), на мобильном `@ui/BottomSheet` (обёртка над `vaul`). Переключение по `matchMedia('(max-width: 992px)')` — образец в `components/PersonCard`; данные и флаг открытия держать в разных стейтах, чтобы контент не исчезал до конца анимации. `FeedbackModal` (экран 12) валидирует форму сама и открывает `SuccessModal`.
- **`Button`** умеет рендериться ссылкой (`to`, опционально `replace`) и принимать `icon`; варианты: primary / secondary / ghost / outline / noborder.
- **Скелетоны**: `@ui/Skeleton` (`SkeletonText` / `SkeletonBlock` / `SkeletonCircle`), `ContentCard` с `isLoading` рендерит `ContentCardSkeleton`.
- **Стили**: SCSS-модули; все цвета/шрифты/сетка — CSS-переменные из `src/styles/variables.scss` (`var(--color-accent)` и т.д.), сырые значения в стилях не писать; для новых цветов из макета — добавлять токен с hex-комментарием. Шрифты: Lora (заголовки), Manrope (текст).

## Соглашения и грабли

- Импорты только через алиасы (`@/`, `@components/`, `@ui/`, `@pages/`, `@assets/`, `@styles/`) — правило `@limegrass/import-alias` переписывает относительные `../` автоматически через `yarn fix`.
- В tsconfig включён `verbatimModuleSyntax` — типы импортировать через `import type`.
- Тексты интерфейса на русском, с буквой «ё» (как в макетах). Пропс бейджа у `ContentCard` — `badgeTitle`.
- Новый переиспользуемый компонент в `ui/` или `components/` — сразу добавлять секцией на страницу `/ui-kit` (демо-данные из `@/mocks`), в том же PR.
- Windows; путь к репозиторию содержит кириллицу и пробел («Алтын Мурас») — в shell-командах пути брать в кавычки.

## Макеты (источник правды по дизайну)

Лежат вне репозитория: `C:\Users\User\Desktop\Алтын Мурас\Макеты\` — четыре файла «… (офлайн).html»: «UI Kit и токены», «Макеты сайта» (патч 1, экраны 01–07 — свёрстан), «Макеты патч 2» (экраны 08–14), «Технические экраны» (экраны 15–18). Каждый экран в трёх брейкпоинтах: 390 / 834 / 1440.

Формат — self-extracting HTML-бандлы из Claude Design (3–4 МБ, в основном base64-ассеты — целиком не читать). Полный HTML страницы лежит JSON-строкой в `<script type="__bundler/template">…</script>`: вырезать содержимое тега, `JSON.parse` — дальше обычный HTML; мок-данные экранов — в инлайн-`<script>` внутри этого шаблона.

Состояние по экранам:

- Патч 2, сделано: 08 деталка новости, 09 деталка проекта, 10 поиск-оверлей, 11 страница результатов (фильтры по типу и году, подсветка, пустые состояния, пагинация десктоп/«Показать ещё» на мобайле), 12 модалка «Написать нам» + экран успеха, 13 модалка/шторка члена команды, 14 подписка в футере.
- Технические экраны, сделано: 15 (404, `pages/NotFound`), 17 (500, `pages/ServerError`), 18 (скелетоны).
- Осталось: переключатель языка ky/ru/en с URL-префиксами (экран 14; сейчас `SegmentedControl` в `Header` только меняет локальный стейт), модалка партнёра (13; `PartnerCardList` статичный), пагинация ленты новостей (компонент стоит, список не нарезан; 9 карточек на страницу), пустые состояния лент «Новости»/«Проекты» (16), подключение `FeedbackModal` ко всем CTA (часть ведёт на `/contacts`).
- Вне скоупа (следующие заходы): админка, политика конфиденциальности и cookie-баннер, превью PDF в «Отчётах», подключение API.

## Git

Git flow: фичевые ветки (`feat/...`, `fix/...`) → PR в `main`; `dev` — текущая ветка разработки. Коммиты и названия PR — на английском (см. историю), UI-тексты в коде — на русском.
