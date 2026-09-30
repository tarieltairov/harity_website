import type { FundContacts, SocialLink } from '@/types';
import { createLocalized } from './localize';

const MAP_QUERY = 'Абдрахманова%20145,%20Бишкек';

export const getFundContacts = createLocalized<FundContacts>({
  address: {
    ru: 'г. Бишкек, ул. Абдрахманова, 145',
    ky: 'Бишкек ш., Абдрахманов көч., 145',
    en: '145 Abdrakhmanov St., Bishkek',
  },
  phone: '+996 312 90 00 00',
  email: 'info@altyn-muras.kg',
  workingHours: {
    ru: 'Пн-Пт: 9:00 - 18:00',
    ky: 'Дш-Жм: 9:00 - 18:00',
    en: 'Mon-Fri: 9:00 - 18:00',
  },
  // hl — язык подписей на карте
  mapEmbedSrc: {
    ru: `https://www.google.com/maps?q=${MAP_QUERY}&hl=ru&output=embed`,
    ky: `https://www.google.com/maps?q=${MAP_QUERY}&hl=ky&output=embed`,
    en: `https://www.google.com/maps?q=${MAP_QUERY}&hl=en&output=embed`,
  },
});

export const SOCIAL_LINKS: SocialLink[] = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://facebook.com', label: 'Facebook' },
  { href: 'https://t.me', label: 'Telegram' },
];
