import type { Partner } from '@/types';

export const PARTNERS: Partner[] = [
  { id: 1, abbr: 'ДА', fullName: 'Фонд «Дети Азии»', kind: 'Партнёр', since: 2021 },
  { id: 2, abbr: 'АВ', fullName: 'Ассоциация врачей КР', kind: 'Партнёр', since: 2020 },
  { id: 3, abbr: 'МА', fullName: 'Международный альянс НКО', kind: 'Партнёр', since: 2022 },
  { id: 4, abbr: 'БТ', fullName: 'БишкекТелеком', kind: 'Донор', since: 2023 },
  { id: 5, abbr: 'СМ', fullName: 'Союз «Мурас»', kind: 'Партнёр', since: 2019 },
  { id: 6, abbr: 'АР', fullName: 'Агентство развития регионов', kind: 'Партнёр', since: 2020 },
  { id: 7, abbr: 'ЧВ', fullName: 'Фонд «Чистая вода»', kind: 'Партнёр', since: 2024 },
  { id: 8, abbr: 'СП', fullName: 'Союз предпринимателей КР', kind: 'Донор', since: 2022 },
  // Полный профиль для модалки партнёра (патч 2, экран 13)
  {
    id: 9,
    abbr: 'МФ',
    fullName: 'Международный фонд развития',
    kind: 'Донор',
    since: 2019,
    description:
      'Поддерживает программы фонда в сфере здравоохранения и образования. За время сотрудничества совместно реализованы четыре проекта в пяти областях страны.',
    projectIds: [2, 3],
    website: 'https://example.org',
  },
];
