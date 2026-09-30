import type { Lang } from '@/i18n';
import type { Project } from '@/types';
import { createLocalized } from './localize';

import project1 from '@assets/jpeg/project1.jpg';
import project2 from '@assets/jpeg/project2.jpg';
import project3 from '@assets/jpeg/project3.jpg';
import project4 from '@assets/jpeg/project4.jpeg';
import project5 from '@assets/jpeg/project5.jpeg';
import project6 from '@assets/jpeg/project6.jpeg';
import project7 from '@assets/jpeg/project7.jpeg';
import project8 from '@assets/jpeg/project8.jpeg';
import project9 from '@assets/jpeg/project9.jpeg';
import project10 from '@assets/jpeg/project10.jpeg';
import image3 from '@assets/jpeg/image3.jpeg';
import image8 from '@assets/jpeg/image8.jpeg';

export const getProjects = createLocalized<Project[]>([
  {
    id: 1,
    title: {
      ru: 'Центры поддержки семей',
      ky: 'Үй-бүлөлөрдү колдоо борборлору',
      en: 'Family support centers',
    },
    excerpt: {
      ru: 'Психологическая и юридическая помощь многодетным семьям в 5 городах.',
      ky: '5 шаардагы көп балалуу үй-бүлөлөргө психологиялык жана юридикалык жардам.',
      en: 'Psychological and legal help for large families in 5 cities.',
    },
    status: 'active',
    image: project1,
  },
  {
    id: 2,
    title: {
      ru: 'Мобильные медицинские бригады',
      ky: 'Мобилдик медициналык бригадалар',
      en: 'Mobile medical teams',
    },
    excerpt: {
      ru: 'Регулярные выезды врачей в отдалённые сёла и приграничные районы.',
      ky: 'Дарыгерлердин алыскы айылдарга жана чек ара аймактарына үзгүлтүксүз чыгуулары.',
      en: 'Regular doctor visits to remote villages and border areas.',
    },
    status: 'active',
    image: project2,
    // Деталка (патч 2, экран 09)
    // Месяцы «YYYY-MM», подпись «март 2024 — сейчас» собирает useFormat().formatPeriod
    period: { from: '2024-03', to: null },
    region: {
      ru: 'Нарынская и Ошская области',
      ky: 'Нарын жана Ош облустары',
      en: 'Naryn and Osh regions',
    },
    lead: {
      ru: 'Раз в месяц врачи приезжают в села, где нет постоянного медпункта. Проект работает в Нарынской и Ошской областях с марта 2024 года.',
      ky: 'Айына бир жолу дарыгерлер туруктуу медпункту жок айылдарга барышат. Долбоор 2024-жылдын мартынан бери Нарын жана Ош облустарында иштеп келет.',
      en: 'Once a month, doctors visit villages that have no permanent medical post. The project has been running in the Naryn and Osh regions since March 2024.',
    },
    stats: [
      {
        value: { ru: '4 800', ky: '4 800', en: '4,800' },
        label: {
          ru: 'приёмов врачей с начала проекта',
          ky: 'долбоор башталгандан бери дарыгерлердин кабыл алуусу',
          en: 'doctor consultations since the project began',
        },
      },
      {
        value: '37',
        label: {
          ru: 'сёл в маршруте бригад',
          ky: 'айыл бригадалардын каттамында',
          en: 'villages on the teams’ route',
        },
      },
      {
        value: '12',
        label: {
          ru: 'врачей и медсестёр в команде',
          ky: 'дарыгер жана медайым командада',
          en: 'doctors and nurses on the team',
        },
      },
      {
        value: '3',
        label: {
          ru: 'оснащённых автомобиля',
          ky: 'жабдылган унаа',
          en: 'equipped vehicles',
        },
      },
    ],
    body: [
      {
        ru: 'Бригады выезжают в отдалённые села по фиксированному графику: терапевт, педиатр, гинеколог и медсестра принимают в помещении фельдшерского пункта или школы. С собой везут портативный УЗИ-аппарат, кардиограф и набор для базовых анализов.',
        ky: 'Бригадалар алыскы айылдарга белгиленген график боюнча барышат: терапевт, педиатр, гинеколог жана медайым фельдшердик пункттун же мектептин имаратында кабыл алышат. Өздөрү менен көчмө УЗИ аппаратын, кардиографты жана негизги анализдер үчүн топтомду алып барышат.',
        en: 'The teams travel to remote villages on a fixed schedule: a general practitioner, a pediatrician, a gynecologist and a nurse see patients at the local medical post or school. They bring a portable ultrasound machine, an ECG device and a kit for basic tests.',
      },
      {
        ru: 'После приёма фонд ведёт маршрутизацию: если нужна операция или дообследование, координатор помогает записаться в областную больницу и оплачивает дорогу семье.',
        ky: 'Кабыл алуудан кийин фонд бейтапты андан ары коштоп жүрөт: эгер операция же кошумча текшерүү керек болсо, координатор облустук ооруканага жазылууга жардам берет жана үй-бүлөнүн жол чыгымын төлөйт.',
        en: 'After the consultation, the fund arranges follow-up care: if surgery or further tests are needed, a coordinator helps book an appointment at the regional hospital and pays for the family’s travel.',
      },
      {
        ru: 'Проект работает с марта 2024 года при поддержке партнёров и областных управлений здравоохранения. Отчёты о расходах публикуются в разделе «Отчёты» ежеквартально.',
        ky: 'Долбоор 2024-жылдын мартынан бери өнөктөштөрдүн жана облустук саламаттыкты сактоо башкармалыктарынын колдоосу менен иштейт. Чыгымдар боюнча отчеттор «Отчеттор» бөлүмүндө ар бир чейрек сайын жарыяланат.',
        en: 'The project has been running since March 2024 with the support of partners and regional health departments. Expense reports are published quarterly in the “Reports” section.',
      },
    ],
    gallery: [
      project2,
      project3,
      project6,
      project7,
      project4,
      project5,
      project8,
      project9,
      project10,
      project1,
      image3,
      image8,
      project6,
    ],

    newsIds: [9, 10, 8],
    supportNote: {
      ru: 'Один выезд бригады в село — это около 40 приёмов и 28 000 сомов расходов.',
      ky: 'Бригаданын айылга бир чыгуусу — болжол менен 40 кабыл алуу жана 28 000 сом чыгым.',
      en: 'One team visit to a village means about 40 consultations and 28,000 som in expenses.',
    },
  },
  {
    id: 3,
    title: {
      ru: 'Стипендии для студентов',
      ky: 'Студенттер үчүн стипендиялар',
      en: 'Student scholarships',
    },
    excerpt: {
      ru: '40 студентов из малообеспеченных семей получили поддержку в 2025 году.',
      ky: '2025-жылы аз камсыз болгон үй-бүлөлөрдөн 40 студент колдоо алды.',
      en: '40 students from low-income families received support in 2025.',
    },
    status: 'completed',
    image: project3,
  },
  {
    id: 4,
    title: {
      ru: 'Библиотеки для сельских школ',
      ky: 'Айыл мектептери үчүн китепканалар',
      en: 'Libraries for rural schools',
    },
    excerpt: {
      ru: 'Оснащены книгами и мебелью 12 школьных библиотек в отдалённых районах.',
      ky: 'Алыскы райондордогу 12 мектеп китепканасы китептер жана эмерек менен жабдылды.',
      en: '12 school libraries in remote districts have been equipped with books and furniture.',
    },
    status: 'completed',
    image: project4,
  },
  {
    id: 5,
    title: {
      ru: 'Программа психологической поддержки',
      ky: 'Психологиялык колдоо программасы',
      en: 'Psychological support program',
    },
    excerpt: {
      ru: 'Бесплатные консультации психологов для семей, переживших кризисные ситуации.',
      ky: 'Кризистик кырдаалды баштан өткөргөн үй-бүлөлөр үчүн психологдордун акысыз кеңештери.',
      en: 'Free counseling for families who have gone through crisis situations.',
    },
    status: 'active',
    image: project5,
  },
  {
    id: 6,
    title: {
      ru: 'Экологическая инициатива «Чистые реки»',
      ky: '«Таза дарыялар» экологиялык демилгеси',
      en: '“Clean Rivers” environmental initiative',
    },
    excerpt: {
      ru: 'Очистка русел рек и просветительские программы для школьников.',
      ky: 'Дарыялардын нугун тазалоо жана мектеп окуучулары үчүн агартуу программалары.',
      en: 'River bed clean-ups and educational programs for schoolchildren.',
    },
    status: 'active',
    image: project6,
  },
]);

export function getProjectById(id: number, lang: Lang): Project | undefined {
  return getProjects(lang).find((project) => project.id === id);
}
