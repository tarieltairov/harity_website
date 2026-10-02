import type { NewsPreview } from './news';
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

/** Карточка в списке (/projects) */
export interface ProjectListItem {
  id: number;
  title: string;
  excerpt: string;
  status: ProjectStatus;
  image: string;
}

/** Деталка (/projects/{id}, экран 09) */
export interface Project extends ProjectListItem {
  period?: ProjectPeriod;
  region?: string;
  lead: string;
  body: string[];
  stats: StatItem[];
  gallery: string[];
  /** «Новости проекта» — бэк отдаёт готовыми карточками */
  news: NewsPreview[];
  /** Текст блока «Поддержать проект» */
  supportNote?: string;
}
