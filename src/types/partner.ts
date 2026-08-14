export type PartnerKind = 'Партнёр' | 'Донор';

export interface Partner {
  id: number;
  /** Аббревиатура на плашке-логотипе */
  abbr: string;
  fullName: string;
  /* Поля модалки (патч 2, экран 13) */
  kind?: PartnerKind;
  /** Год начала сотрудничества */
  since?: number;
  description?: string;
  /** id совместных проектов из PROJECTS */
  projectIds?: number[];
  website?: string;
}
