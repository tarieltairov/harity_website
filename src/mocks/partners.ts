import type { Partner } from '@/types';
import { createLocalized } from './localize';

// Аббревиатура на плашке-логотипе тоже своя для каждого языка — от переведённого названия
export const getPartners = createLocalized<Partner[]>([
  {
    id: 1,
    abbr: { ru: 'ДА', ky: 'АБ', en: 'CA' },
    fullName: {
      ru: 'Фонд «Дети Азии»',
      ky: '«Азия балдары» фонду',
      en: 'Children of Asia Foundation',
    },
    kind: 'partner',
    since: 2021,
  },
  {
    id: 2,
    abbr: { ru: 'АВ', ky: 'ДА', en: 'AP' },
    fullName: {
      ru: 'Ассоциация врачей КР',
      ky: 'КР Дарыгерлер ассоциациясы',
      en: 'Association of Physicians of Kyrgyzstan',
    },
    kind: 'partner',
    since: 2020,
  },
  {
    id: 3,
    abbr: { ru: 'МА', ky: 'ЭА', en: 'IA' },
    fullName: {
      ru: 'Международный альянс НКО',
      ky: 'КЭУлардын эл аралык альянсы',
      en: 'International NGO Alliance',
    },
    kind: 'partner',
    since: 2022,
  },
  {
    id: 4,
    abbr: { ru: 'БТ', ky: 'БТ', en: 'BT' },
    fullName: { ru: 'БишкекТелеком', ky: 'БишкекТелеком', en: 'BishkekTelecom' },
    kind: 'donor',
    since: 2023,
  },
  {
    id: 5,
    abbr: { ru: 'СМ', ky: 'МС', en: 'MU' },
    fullName: { ru: 'Союз «Мурас»', ky: '«Мурас» союзу', en: 'Muras Union' },
    kind: 'partner',
    since: 2019,
  },
  {
    id: 6,
    abbr: { ru: 'АР', ky: 'АӨ', en: 'RD' },
    fullName: {
      ru: 'Агентство развития регионов',
      ky: 'Аймактарды өнүктүрүү агенттиги',
      en: 'Regional Development Agency',
    },
    kind: 'partner',
    since: 2020,
  },
  {
    id: 7,
    abbr: { ru: 'ЧВ', ky: 'ТС', en: 'CW' },
    fullName: { ru: 'Фонд «Чистая вода»', ky: '«Таза суу» фонду', en: 'Clean Water Foundation' },
    kind: 'partner',
    since: 2024,
  },
  {
    id: 8,
    abbr: { ru: 'СП', ky: 'ИС', en: 'UE' },
    fullName: {
      ru: 'Союз предпринимателей КР',
      ky: 'КР Ишкерлер союзу',
      en: 'Union of Entrepreneurs of Kyrgyzstan',
    },
    kind: 'donor',
    since: 2022,
  },
  // Полный профиль для модалки партнёра (патч 2, экран 13)
  {
    id: 9,
    abbr: { ru: 'МФ', ky: 'ЭӨ', en: 'ID' },
    fullName: {
      ru: 'Международный фонд развития',
      ky: 'Эл аралык өнүктүрүү фонду',
      en: 'International Development Fund',
    },
    kind: 'donor',
    since: 2019,
    description: {
      ru: 'Поддерживает программы фонда в сфере здравоохранения и образования. За время сотрудничества совместно реализованы четыре проекта в пяти областях страны.',
      ky: 'Фонддун саламаттыкты сактоо жана билим берүү тармагындагы программаларын колдойт. Кызматташтыктын ичинде өлкөнүн беш облусунда биргелешип төрт долбоор ишке ашырылды.',
      en: 'Supports the fund’s healthcare and education programs. Over the years of cooperation, four joint projects have been carried out in five regions of the country.',
    },
    projectIds: [2, 3],
    website: 'https://example.org',
  },
]);
