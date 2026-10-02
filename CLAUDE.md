# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Сайт благотворительного фонда «Алтын Мурас». SPA, свёрстанная по HTML-макетам и подключённая к публичному API бэкенда (`../backend`): моков нет, для разработки нужен поднятый бэк. Общая документация для людей — в [README.md](README.md); здесь — то, что нужно для продуктивной работы агенту.

## Команды

Пакетный менеджер — Yarn 1 (`yarn.lock`).

```bash
yarn dev          # dev-сервер (http://localhost:5173)
yarn build        # tsc -b (проверка типов) + vite build — основная проверка, тестов в проекте нет
yarn lint         # ESLint
yarn fix          # ESLint --fix + Prettier — прогонять перед коммитом
```

Pre-commit хук (husky + lint-staged) гоняет ESLint с `--max-warnings=0` по `ts/tsx` и `prettier --check` по staged-файлам (включая `scss`, `json`, `html`, `md` — правки доки тоже должны проходить Prettier): любой warning валит коммит, поэтому после правок запускай `yarn fix`, затем проверяй `yarn build`.

Бэк для разработки: `cd ../backend && yarn start:dev` → `http://localhost:3000/api/v1` (без `backend/.env` — база в памяти с контентом макетов). Адрес API — `VITE_API_URL` (по умолчанию он же; шаблон — `.env.example`, своё — в `.env.local`).

## Архитектура

Поток данных: API бэка → `src/api` (запросы и кеш, TanStack Query) → страницы `src/pages` → компоненты. Контракт — `docs/api-contract.md`, единственный источник данных — бэк.

- **Локализация (ky / ru / en)** — `i18next` + `react-i18next`, всё в `src/i18n/`:
  - URL всегда с префиксом: `/ru/news`, `/ky/news`, `/en/news`. Префикс — это `basename` роутера (`components/LocaleRouter` — тот же BrowserRouter, только basename выводится из первого сегмента адреса), поэтому в коде пути пишутся **без языка** (`ROUTES.news`, `<Link to={ROUTES.contacts}>`, `navigate(...)`). Не использовать `<a href="/...">` и `window.location` для внутренних переходов — они минуют basename. Адрес без префикса редиректится на язык из localStorage → браузера → `ru`. Смена языка — `useLanguage().setLang(lang)`: обычный переход по истории на тот же путь с другим префиксом; роутер и страницы не пересоздаются (стейт фильтров, форм и скролл сохраняются), «назад» через границу языка отрабатывает история.
  - Строки UI — только через `t()` из `useTranslation()`. Словари `src/i18n/locales/{ru,ky,en}.ts`; `ru` — эталон, по нему типизированы ключи (опечатка в ключе или пропущенный ключ в `ky`/`en` — ошибка `tsc`). Плюралы — суффиксы `_one/_few/_many/_other` (в ky/en достаточно `_one/_other`). Разметку внутри строки — через `<Trans components={...}>`. Типы ключей наружу — из `@/i18n` (`Dictionary`, `FeedbackErrorKey`), напрямую `locales/ru` в компонентах не импортировать.
  - Константы на уровне модуля (фильтры, меню) хранят ключи/слаги, а не подписи: `NAV_LINKS[].labelKey`, категории новостей — слаги (`news.categories.<slug>`), статусы проектов — `projects.status.<status>`.
  - Даты (ISO), период проекта (`{ from: 'YYYY-MM', to: 'YYYY-MM' | null }`), размеры файлов (байты; единицы и хелперы `kb()`/`mb()` — `src/utils/bytes.ts`), мета поиска форматируются `useFormat()` — сырые строки «3 июля 2026», «март 2024 — сейчас» в данные не класть.
  - `ky.ts` — черновой перевод, нужна вычитка носителем.

- **Маршруты** объявлены в `src/config/routes.ts` (`ROUTES` + `NAV_LINKS`), дерево — в `src/App.tsx`. Роуты (без языкового префикса): `/`, `/about`, `/news`, `/news/:id`, `/projects`, `/projects/:id`, `/reports`, `/partners`, `/contacts`, `/search?q=`, `/500`, `*` (404), `/ui-kit`. Все страницы рендерятся внутри `Layout` (Header + BreadCrumbs + ErrorBoundary + Outlet + Footer), кроме `/ui-kit` — это витрина компонентов вне Layout. Страницы подключены через `React.lazy` (по чанку на роут); Suspense-фоллбек — `@ui/Loader`: в Layout вокруг Outlet, в App — fullScreen для роутов вне Layout. Новые страницы подключать так же лениво.
- **Ошибки рендера и API**: `Layout` оборачивает Outlet в `@components/ErrorBoundary` с фоллбеком `pages/ServerError` и `key={location.pathname}` (состояние ошибки сбрасывается при переходе). Ошибки запросов (сеть, 5xx, 400) туда же пробрасывает сам `queryClient` (`throwOnError` по умолчанию — всё, кроме 404), поэтому страницы их не ловят. `/500` — отдельный роут только для просмотра страницы.
- **Деталки и крошки**: пути деталок собирать через `getDetailPath(ROUTES.newsDetail, id)` / `getDetailPath(ROUTES.project, id)` (внутри `generatePath`), не строками; id из URL разбирать `parseDetailId(params.id)` (битый id → `undefined` → страница рендерит `<NotFound />`, запрос не уходит). `NOT_FOUND` от API — тоже `<NotFound />` через `isNotFoundError(error)`. Хлебные крошки рендерит `Layout` → `BreadCrumbs`, на страницах их не верстать; названия — из `NAV_LINKS` + словарь `CRUMB_LABELS` в `BreadCrumbs.tsx`; названия деталок крошки берут из тех же хуков, что и страницы (`useNewsArticle`/`useProject` с `throwOnError: false`, общий кеш — лишнего запроса нет), новой деталке — свой хук + строка в `CRUMB_LABELS`. Деталки свёрстаны: `pages/NewsDetails` (экран 08) и `pages/Project` (экран 09).
- **Слой данных** (разделён по сущностям, по файлу на сущность):
  - `src/types/` — типы ответов по §2 контракта: `NewsListItem`/`NewsArticle` (`category: { slug, title }`, `related` — готовые превью), `ProjectListItem`/`Project` (`news` — готовые превью, `stats`/`gallery`/`body` — всегда массивы), `Partner`/`PartnerDetails`, `TeamMember`, `DocumentFile` (`format`, `sizeBytes`, `url`), `ReportsByYear`, `StatItem`, `Contacts` (+ `socials`), `SearchItem`/`SearchResponse`/`SearchSuggestResponse`, конверты `Paginated<T>` и `ApiErrorBody` (`types/api.ts`). Подписи статусов и типов материалов — в словарях, названия категорий новостей приходят с API (`category.title`).
  - `src/api/` — запросы и кеш. `client.ts`: `request<T>(path, { query, method, body, signal })` и класс `ApiError` (`status`, `code`, `fields`, `isNotFound`, `isValidation`; сетевой сбой — status 0); базовый адрес `API_BASE_URL` из `VITE_API_URL`. `queryClient.ts`: `staleTime` 5 мин (язык — часть ключа, поэтому переключение туда-обратно не бьёт по серверу), `retry` один раз только для сети/5xx, `throwOnError` — всё, кроме 404. По файлу на сущность: `queryOptions`-фабрика (`newsListOptions(params, lang)`…) + хук, который сам берёт `useLang()` и кладёт его в ключ и в `?lang=`: `useNewsList(params)`, `useNewsCategories()`, `usePopularNews()`, `useNewsArticle(id)`, `useProjects(params)`, `useProject(id)`, `useReports()`, `useFundDocuments()`, `usePartners()`, `usePartner(id)`, `useTeam()`, `useStats()`, `useContacts()` (+ `localizeMapSrc` — `hl=` для карты), `useSearch(params)`, `useSearchSuggest(q)`; мутации форм — `useSendFeedback()`, `useSubscribe()` в `forms.ts` (там же `FEEDBACK_TOPIC_VALUES`: ключ темы → строка, которую ждёт бэк). Второй аргумент хуков — `QueryOpts` (`enabled`, `throwOnError`, `placeholderData`, `staleTime`). Страницы язык в хуки не передают.
  - **Загрузка и ошибки**: пока `data === undefined` — скелетоны (`ContentCard isLoading`, `SectionWithCards isLoading`, `StatsBlock` без `items`) или `@ui/Loader`; списки с фильтрами/страницами используют `placeholderData: keepPreviousData` (старые карточки до прихода новых). Пустые списки — `news.empty` / `projects.empty` (полноценный экран 16 ещё не свёрстан). Компоненты вне `ErrorBoundary` — `Header`, `Footer`, `BreadCrumbs`, `FeedbackModal`, `ServerError`, `UiKit` — обязаны передавать `throwOnError: false` и переживать отсутствие данных (иначе упадёт весь сайт или зациклится страница 500).
  - Контакты фонда (адрес, почта, телефон, соцсети) — только из `useContacts()`, копий не заводить. Эталонные записи для проверки деталок и модалок (сиды бэка, `backend/src/seed/data`): новость id 1 (центр в Оше), проект id 2 (мобильные бригады), партнёр id 9, член команды id 1.
  - **Поиск**: `src/config/search.ts` — `MIN_SEARCH_QUERY_LENGTH` (2, как в контракте), `SEARCH_TYPES` (`news`/`project`/`document`/`page`), `POPULAR_SEARCH_SECTIONS` (ссылки на разделы, подписи — `search.sections.*`), `SEARCH_HISTORY_KEY` (`altyn-muras-search-history`), `getSearchItemPath(item)` (у `page` путь лежит в `meta`). Оверлей в `Header` — `useSearchSuggest` с дебаунсом (`hooks/useDebouncedValue`); «Вы искали» — стартовое наполнение `search.recentSeed` из словаря, дальше `localStorage`. `pages/SearchPage` — `useSearch` (десктоп, по странице) и `useQueries` по `searchOptions` для страниц 1…N (мобильная «Показать ещё», переключение по `hooks/useMediaQuery` на том же брейкпоинте, что в scss); `counts`, `years`, `pageSize` — из ответа. Подсветку и мету (`useFormat().formatSearchMeta`) собирает фронт.
  - Захардкоженных массивов данных в страницах не заводить — данные приходят с API, типы в `types`; константы-списки на уровне модуля (фильтры, темы, кнопки «Поделиться») — ключи словаря.
  - Бэкенд реализует контракт `docs/api-contract.md` (источник правды по эндпоинтам и схемам; при изменении сущностей или полей форм обновлять и его, и обе стороны). Лежит рядом, в отдельном git-репозитории `../backend` (GitHub: `tarieltairov/harity_website_backend`; NestJS 12 + MongoDB/Mongoose, ESM; своя документация в `backend/docs/` и `backend/CLAUDE.md`): `yarn start:dev` без `.env` поднимает API на `http://localhost:3000/api/v1` с базой в памяти и контентом макетов, `yarn test:e2e` — контрактные тесты. Общая база — MongoDB Atlas, строка подключения только в `backend/.env` (в репозиторий и доку не переносить). Известные нестыковки (не закрыты): темы и тексты ошибок `/feedback` на бэке только по-русски — фронт шлёт `FEEDBACK_TOPIC_VALUES[key]`, а `fields` из `400` показывает под полями как есть (своя валидация срабатывает раньше); регэксп имени на бэке без кыргызских ң/ө/ү (фронт их пропускает — бэк ответит 400 с текстом под полем); форма на странице «Контакты» (экран 07) к API не подключена — в ней нет телефона и темы, обязательных для `/feedback`.
- **Компоненты по слоям**: `src/ui/` — примитивы (Button, Badge, FilterChip, Pagination, SegmentedControl, Modal, BottomSheet, Gallery, Skeleton, Download, Loader, CTABanner, SubscriptionStatus, form/), `src/components/` — составные блоки (ContentCard + ContentCardSkeleton, SectionWithCards, BreadCrumbs, StatsBlock, PersonCard, PartnerCardList, FeedbackModal, SuccessModal, ErrorBoundary…), секции конкретной страницы — в `pages/<Page>/components/`. Каждый компонент — папка `Component.tsx` + `Component.module.scss` + `index.ts`.
- **Модалки**: на десктопе `@ui/Modal` (Esc, блокировка скролла, анимация закрытия), на мобильном `@ui/BottomSheet` (обёртка над `vaul`). Переключение по `matchMedia('(max-width: 992px)')` — образец в `components/PersonCard`; данные и флаг открытия держать в разных стейтах, чтобы контент не исчезал до конца анимации. `FeedbackModal` (экран 12) валидирует форму сама и открывает `SuccessModal`.
- **`Button`** умеет рендериться ссылкой (`to`, опционально `replace`) и принимать `icon`; варианты: primary / secondary / ghost / outline / noborder.
- **Скелетоны**: `@ui/Skeleton` (`SkeletonText` / `SkeletonBlock` / `SkeletonCircle`), `ContentCard` с `isLoading` рендерит `ContentCardSkeleton`.
- **Стили**: SCSS-модули; все цвета/шрифты/сетка — CSS-переменные из `src/styles/variables.scss` (`var(--color-accent)` и т.д.), сырые значения в стилях не писать; для новых цветов из макета — добавлять токен с hex-комментарием. Шрифты: Lora (заголовки), Manrope (текст).

## Соглашения и грабли

- Импорты только через алиасы (`@/`, `@components/`, `@ui/`, `@pages/`, `@assets/`, `@styles/`) — правило `@limegrass/import-alias` переписывает относительные `../` автоматически через `yarn fix`.
- В tsconfig включён `verbatimModuleSyntax` — типы импортировать через `import type`.
- Тексты интерфейса — в словарях `src/i18n/locales` (русский — с буквой «ё», как в макетах), не хардкодом в JSX; это касается и витрины `/ui-kit` (секция `uiKit`). Новый текст — ключ сразу во все три словаря. Пропс бейджа у `ContentCard` — `badgeTitle`.
- Новый переиспользуемый компонент в `ui/` или `components/` — сразу добавлять секцией на страницу `/ui-kit` (демо-данные — с API через те же хуки с `throwOnError: false`; пока данных нет — скелетон или `Loader`), в том же PR.
- Windows; путь к репозиторию содержит кириллицу и пробел («Алтын Мурас») — в shell-командах пути брать в кавычки.

## Макеты (источник правды по дизайну)

Лежат вне репозитория: `C:\Users\User\Desktop\Алтын Мурас\Макеты\` — четыре файла «… (офлайн).html»: «UI Kit и токены», «Макеты сайта» (патч 1, экраны 01–07 — свёрстан), «Макеты патч 2» (экраны 08–14), «Технические экраны» (экраны 15–18). Каждый экран в трёх брейкпоинтах: 390 / 834 / 1440.

Формат — self-extracting HTML-бандлы из Claude Design (3–4 МБ, в основном base64-ассеты — целиком не читать). Полный HTML страницы лежит JSON-строкой в `<script type="__bundler/template">…</script>`: вырезать содержимое тега, `JSON.parse` — дальше обычный HTML; мок-данные экранов — в инлайн-`<script>` внутри этого шаблона.

Состояние по экранам:

- Патч 2, сделано: 08 деталка новости, 09 деталка проекта, 10 поиск-оверлей, 11 страница результатов (фильтры по типу и году, подсветка, пустые состояния, пагинация десктоп/«Показать ещё» на мобайле), 12 модалка «Написать нам» + экран успеха, 13 модалка/шторка члена команды, 14 подписка в футере и переключатель языка ky/ru/en с URL-префиксами (см. «Локализация»).
- Технические экраны, сделано: 15 (404, `pages/NotFound`; в том числе для `NOT_FOUND` от API), 17 (500, `pages/ServerError`; в том числе для ошибок API), 18 (скелетоны — подключены к реальной загрузке).
- API подключено ко всем страницам и формам (02.10.2026): ленты новостей и проектов с серверной пагинацией (9 и 12 на страницу), поиск, `/feedback`, `/subscriptions`.
- Осталось: модалка партнёра (13; хук `usePartner(id)` уже есть, `PartnerCardList` статичный), пустые состояния лент «Новости»/«Проекты» (16; сейчас одна строка текста), подключение `FeedbackModal` ко всем CTA (часть ведёт на `/contacts`), форма на странице «Контакты» (экран 07) не отправляется.
- Вне скоупа (следующие заходы): админка, политика конфиденциальности и cookie-баннер, превью PDF в «Отчётах».

## Git

Git flow: фичевые ветки (`feat/...`, `fix/...`) → PR в `main`; `dev` — текущая ветка разработки. Коммиты и названия PR — на английском (см. историю), UI-тексты в коде — на русском.
