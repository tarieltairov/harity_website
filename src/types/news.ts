import type { FundDocument } from './document';

/** Слаг категории — как в контракте; подпись берётся из словаря `news.categories` */
export type NewsCategory = 'projects' | 'reports' | 'events' | 'partnership' | 'press';

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

/** Кнопка «Поделиться» на деталке новости (патч 2, экран 08) */
export interface ShareTarget {
  label: string;
  name: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: NewsCategory;
  /** ISO-дата «2026-07-03»; подпись собирает useFormat().formatDate */
  publishedAt: string;
  image: string;
  /* Поля деталки (патч 2, экран 08) */
  imageCaption?: string;
  lead?: string;
  body?: string[];
  quote?: NewsQuote;
  gallery?: string[];
  documents?: FundDocument[];
  /** id материалов для блока «Читайте также» */
  relatedIds?: number[];
}
