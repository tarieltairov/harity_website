import type { Project } from '@/types';

import project1 from '@assets/jpeg/project1.jpg';
import project2 from '@assets/jpeg/project2.jpg';
import project3 from '@assets/jpeg/project3.jpg';
import project4 from '@assets/jpeg/project4.jpeg';
import project5 from '@assets/jpeg/project5.jpeg';
import project6 from '@assets/jpeg/project6.jpeg';
import gallery1 from '@assets/jpeg/keyprojects.jpg';
import gallery2 from '@assets/jpeg/keyprojects1.jpg';
import gallery3 from '@assets/jpeg/keyprojects2.jpg';
import gallery4 from '@assets/jpeg/keyprojects3.jpg';
import gallery5 from '@assets/jpeg/keyprojects4.jpg';
import gallery6 from '@assets/jpeg/keyprojects5.jpg';

import gallery7 from '@assets/jpeg/image1.jpeg';
import gallery8 from '@assets/jpeg/image2.jpeg';
import gallery9 from '@assets/jpeg/image3.jpeg';
import gallery10 from '@assets/jpeg/image4.jpeg';
import gallery11 from '@assets/jpeg/image5.jpeg';
import gallery12 from '@assets/jpeg/image6.jpeg';
import gallery13 from '@assets/jpeg/image7.jpeg';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Центры поддержки семей',
    excerpt: 'Психологическая и юридическая помощь многодетным семьям в 5 городах.',
    status: 'active',
    image: project1,
  },
  {
    id: 2,
    title: 'Мобильные медицинские бригады',
    excerpt: 'Регулярные выезды врачей в отдалённые сёла и приграничные районы.',
    status: 'active',
    image: project2,
    // Деталка (патч 2, экран 09)
    period: 'март 2024 — сейчас',
    region: 'Нарынская и Ошская области',
    lead: 'Раз в месяц врачи приезжают в села, где нет постоянного медпункта. Проект работает в Нарынской и Ошской областях с марта 2024 года.',
    stats: [
      { value: '4 800', label: 'приёмов врачей с начала проекта' },
      { value: '37', label: 'сёл в маршруте бригад' },
      { value: '12', label: 'врачей и медсестёр в команде' },
      { value: '3', label: 'оснащённых автомобиля' },
    ],
    body: [
      'Бригады выезжают в отдалённые села по фиксированному графику: терапевт, педиатр, гинеколог и медсестра принимают в помещении фельдшерского пункта или школы. С собой везут портативный УЗИ-аппарат, кардиограф и набор для базовых анализов.',
      'После приёма фонд ведёт маршрутизацию: если нужна операция или дообследование, координатор помогает записаться в областную больницу и оплачивает дорогу семье.',
      'Проект работает с марта 2024 года при поддержке партнёров и областных управлений здравоохранения. Отчёты о расходах публикуются в разделе «Отчёты» ежеквартально.',
    ],
    gallery: [
      gallery1,
      gallery2,
      gallery3,
      gallery4,
      gallery5,
      gallery6,
      gallery7,
      gallery8,
      gallery9,
      gallery10,
      gallery11,
      gallery12,
      gallery13,
    ],
    newsIds: [9, 10, 8],
    supportNote: 'Один выезд бригады в село — это около 40 приёмов и 28 000 сомов расходов.',
  },
  {
    id: 3,
    title: 'Стипендии для студентов',
    excerpt: '40 студентов из малообеспеченных семей получили поддержку в 2025 году.',
    status: 'completed',
    image: project3,
  },
  {
    id: 4,
    title: 'Библиотеки для сельских школ',
    excerpt: 'Оснащены книгами и мебелью 12 школьных библиотек в отдалённых районах.',
    status: 'completed',
    image: project4,
  },
  {
    id: 5,
    title: 'Программа психологической поддержки',
    excerpt: 'Бесплатные консультации психологов для семей, переживших кризисные ситуации.',
    status: 'active',
    image: project5,
  },
  {
    id: 6,
    title: 'Экологическая инициатива «Чистые реки»',
    excerpt: 'Очистка русел рек и просветительские программы для школьников.',
    status: 'active',
    image: project6,
  },
];

export function getProjectById(id: number): Project | undefined {
  return PROJECTS.find((project) => project.id === id);
}
