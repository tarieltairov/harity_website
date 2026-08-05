# Алтын Мурас

Сайт благотворительного фонда «Алтын Мурас»: главная, страницы «О фонде», «Новости», «Проекты», «Отчёты», «Партнёры», «Контакты», а также служебная страница UI-кита.

## Технологии

- **React 19** + **TypeScript**
- **Vite 8** — сборка и dev-сервер
- **React Router 7** — маршрутизация
- **SCSS-модули** — стили компонентов, глобальные токены в `src/styles`
- **ESLint + Prettier** — линт и форматирование
- **Husky + lint-staged** — проверки перед коммитом
- **vite-plugin-checker** — ошибки ESLint оверлеем в браузере в dev-режиме

Пакетный менеджер — **Yarn** (в репозитории `yarn.lock`).

## Быстрый старт

```bash
# установка зависимостей
yarn

# запуск dev-сервера (по умолчанию http://localhost:5173)
yarn dev
```

## Скрипты

| Команда             | Что делает                                             |
| ------------------- | ------------------------------------------------------ |
| `yarn dev`          | Запуск dev-сервера с HMR                               |
| `yarn build`        | Проверка типов (`tsc -b`) и продакшен-сборка в `dist/` |
| `yarn preview`      | Локальный просмотр продакшен-сборки                    |
| `yarn lint`         | Проверка ESLint                                        |
| `yarn lint:fix`     | ESLint с автоисправлением                              |
| `yarn format`       | Форматирование Prettier                                |
| `yarn format:check` | Проверка форматирования без изменений                  |
| `yarn fix`          | `lint:fix` + `format` одной командой                   |

## Структура проекта

```
src/
├── assets/          # изображения и иконки (jpeg, svg)
├── components/      # общие компоненты страниц
│   ├── Layout/      # каркас: Header + <Outlet /> + Footer
│   ├── Header/      # шапка с навигацией
│   ├── Footer/      # подвал
│   ├── Container/   # обёртка с шириной и боковыми отступами из токенов
│   ├── NewsCard/    # карточка новости
│   └── StatsBlock/  # блок статистики
├── config/
│   └── routes.ts    # ROUTES (пути) и NAV_LINKS (пункты меню)
├── pages/           # страницы, по одной папке на маршрут
│   ├── Home/        # главная (+ свои секции в components/: HomeHero, AboutFund)
│   ├── About/ News/ Projects/ Reports/ Partners/ Contacts/
│   ├── UiKit/       # витрина UI-компонентов (без Layout)
│   └── NotFound/    # 404
├── ui/              # переиспользуемые UI-элементы
│   ├── Button/ Badge/ FilterChip/ Pagination/
│   ├── CTABanner/ Download/
│   └── form/        # Input, Textarea, SearchField
├── styles/
│   ├── variables.scss  # дизайн-токены (CSS custom properties)
│   └── global.scss     # глобальные стили
├── App.tsx          # дерево маршрутов
└── main.tsx         # точка входа
```

Каждый компонент лежит в своей папке: `Component.tsx` + `Component.module.scss` + `index.ts` (реэкспорт).

## Маршруты

Пути и пункты навигации заданы в [src/config/routes.ts](src/config/routes.ts) — при добавлении страницы обновляйте `ROUTES` (и при необходимости `NAV_LINKS`), а не строковые литералы.

| Путь        | Страница                   |
| ----------- | -------------------------- |
| `/`         | Главная                    |
| `/about`    | О фонде                    |
| `/news`     | Новости                    |
| `/projects` | Проекты                    |
| `/reports`  | Отчёты                     |
| `/partners` | Партнёры                   |
| `/contacts` | Контакты                   |
| `/ui-kit`   | UI-кит (вне общего Layout) |
| `*`         | 404                        |

Все страницы, кроме `/ui-kit`, рендерятся внутри общего `Layout` (Header + Footer).

## Алиасы импортов

Настроены в [vite.config.ts](vite.config.ts) и `tsconfig`, использование обязательно (проверяется правилом `@limegrass/eslint-plugin-import-alias`):

| Алиас           | Путь               |
| --------------- | ------------------ |
| `@/*`           | `src/*`            |
| `@pages/*`      | `src/pages/*`      |
| `@components/*` | `src/components/*` |
| `@ui/*`         | `src/ui/*`         |
| `@styles/*`     | `src/styles/*`     |
| `@assets/*`     | `src/assets/*`     |

## Дизайн-токены

Все цвета, типографика, радиусы и параметры сетки — CSS-переменные в [src/styles/variables.scss](src/styles/variables.scss). В стилях компонентов используйте токены (`var(--color-accent)`, `font: var(--font-h2)` и т.д.), а не «сырые» значения.

Ключевое:

- **Цвета** — в формате `oklch`, рядом в комментариях hex-эквиваленты из макетов.
- **Шрифты** — `Lora` (заголовки, serif) и `Manrope` (текст, sans); готовые шорткаты `--font-h1`, `--font-h2`, `--font-body` и др.
- **Сетка** — контейнер `--container-width: 1440px`, боковые отступы `--container-padding`: 56px (desktop) / 28px (≤992px) / 18px (≤768px). За обёртку отвечает компонент `Container`.

## Качество кода

- Pre-commit хук (husky + lint-staged) прогоняет ESLint (`--max-warnings=0`) и Prettier по staged-файлам — коммит с ошибками не пройдёт.
- В dev-режиме ошибки ESLint показываются оверлеем прямо в браузере (`vite-plugin-checker`); на сборку он не влияет.
- Перед пушем полезно запустить `yarn fix`, затем `yarn build`.

## Ветки

- `main` — основная ветка, PR направляются в неё.
- `dev` — текущая ветка разработки.
