import type { StatItem } from './stats';

/** Подпись берётся из словаря `projects.status` */
export type ProjectStatus = 'active' | 'completed';

/**
 * Период проекта: месяцы в формате «YYYY-MM», `to: null` — проект продолжается.
 * Подпись «март 2024 — сейчас» собирает useFormat().formatPeriod
 */
export interface ProjectPeriod {
  from: string;
  to: string | null;
}

export interface Project {
  id: number;
  title: string;
  excerpt: string;
  status: ProjectStatus;
  image: string;
  /* Поля деталки (патч 2, экран 09) */
  period?: ProjectPeriod;
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
