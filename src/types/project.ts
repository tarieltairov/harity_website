import type { StatItem } from './stats';

export type ProjectStatus = 'active' | 'completed';

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  active: 'Активный',
  completed: 'Завершён',
};

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
