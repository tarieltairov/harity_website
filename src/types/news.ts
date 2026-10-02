import type { DocumentFile } from './document';

/** Слаг категории — параметр `category` в /news; подпись приходит в `category.title` */
export type NewsCategory = 'projects' | 'reports' | 'events' | 'partnership' | 'press';

export interface NewsCategoryInfo {
  slug: NewsCategory;
  title: string;
}

/** Элемент /news/categories — счётчик для фильтров и сайдбара «Категории» */
export interface NewsCategoryCount extends NewsCategoryInfo {
  count: number;
}

export interface NewsQuote {
  text: string;
  author: string;
}

/** Краткая карточка материала: «Популярное», «Читайте также», «Новости проекта» */
export interface NewsPreview {
  id: number;
  title: string;
  /** ISO-дата «2026-07-03»; подпись собирает useFormat().formatDate */
  publishedAt: string;
  image: string;
}

/** Карточка в ленте (/news) */
export interface NewsListItem extends NewsPreview {
  excerpt: string;
  category: NewsCategoryInfo;
}

/** Деталка (/news/{id}, экран 08) */
export interface NewsArticle extends NewsListItem {
  imageCaption?: string;
  lead: string;
  body: string[];
  quote?: NewsQuote;
  gallery: string[];
  documents: DocumentFile[];
  /** «Читайте также» — бэк отдаёт готовыми карточками */
  related: NewsPreview[];
}
