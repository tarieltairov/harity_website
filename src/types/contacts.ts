export interface SocialLink {
  label: string;
  href: string;
}

/** Контакты фонда: страница «Контакты», футер, модалка «Написать нам», страница 500 */
export interface Contacts {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  /** Ссылка для iframe с картой; язык подписей (`hl`) добавляет фронт — см. localizeMapSrc */
  mapEmbedSrc?: string;
  socials: SocialLink[];
}
