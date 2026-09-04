import type { FundDocument } from './document';

export type NewsCategory = 'Проекты' | 'Отчёты' | 'Мероприятия' | 'Партнёрство' | 'Пресс-релизы';

export interface NewsQuote {
  text: string;
  author: string;
}

/** Краткая карточка материала: «Популярное», «Читайте также», «Новости проекта» */
export interface NewsPreview {
  title: string;
  date: string;
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
  date: string;
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
