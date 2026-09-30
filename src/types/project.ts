import type { StatItem } from './stats';

/** Подпись берётся из словаря `projects.status` */
export type ProjectStatus = 'active' | 'completed';

export interface Project {
  id: number;
  title: string;
  excerpt: string;
  status: ProjectStatus;
  image: string;
  /* Поля деталки (патч 2, экран 09) */
  period?: string;
  region?: string;
  lead?: string;
  body?: string[];
  stats?: StatItem[];
  gallery?: string[];
  /** id материалов для блока «Новости проекта» */
  newsIds?: number[];
  /** Текст блока «Поддержать проект» */
  supportNote?: string;
}
