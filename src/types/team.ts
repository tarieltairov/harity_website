export interface TeamMember {
  id: number;
  photo: string;
  name: string;
  role: string;
  /* Поля модалки (патч 2, экран 13) */
  sinceYear?: number;
  bio?: string;
  responsibilities?: string;
  email?: string;
  languages?: string[];
}
