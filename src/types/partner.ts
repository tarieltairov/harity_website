import type { ProjectStatus } from './project';

/** Подпись берётся из словаря `partners.kind` */
export type PartnerKind = 'partner' | 'donor';

/** Карточка в списке (/partners) */
export interface Partner {
  id: number;
  /** Аббревиатура на плашке-логотипе, пока нет логотипов */
  abbr: string;
  /** URL логотипа, когда появятся */
  logo?: string;
  fullName: string;
  kind: PartnerKind;
  /** Год начала сотрудничества */
  since?: number;
}

export interface PartnerProject {
  id: number;
  title: string;
  status: ProjectStatus;
}

/** Полный профиль (/partners/{id}) для модалки партнёра (экран 13) */
export interface PartnerDetails extends Partner {
  description?: string;
  website?: string;
  projects: PartnerProject[];
}
