import type { StatItem } from '@/types';
import { createLocalized } from './localize';

/** Ключевые цифры фонда: hero на главной и страница «О фонде» */
export const getFundStats = createLocalized<StatItem[]>([
  {
    value: { ru: '12 лет', ky: '12 жыл', en: '12 years' },
    label: { ru: 'Работы фонда', ky: 'Фонддун ишмердүүлүгү', en: 'In operation' },
  },
  {
    value: '48',
    label: { ru: 'Проектов реализовано', ky: 'Ишке ашырылган долбоор', en: 'Projects completed' },
  },
  {
    value: '9',
    label: { ru: 'Регионов охвачено', ky: 'Камтылган аймак', en: 'Regions covered' },
  },
]);
