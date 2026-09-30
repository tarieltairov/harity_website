import type { TeamMember } from '@/types';
import { createLocalized } from './localize';
import type { LocalizedText } from './localize';

import user1 from '@assets/jpeg/user1.jpg';
import user2 from '@assets/jpeg/user2.jpg';
import user3 from '@assets/jpeg/user3.jpg';
import user4 from '@assets/jpeg/user4.jpg';

const KYRGYZ: LocalizedText = { ru: 'кыргызский', ky: 'кыргыз тили', en: 'Kyrgyz' };
const RUSSIAN: LocalizedText = { ru: 'русский', ky: 'орус тили', en: 'Russian' };
const ENGLISH: LocalizedText = { ru: 'английский', ky: 'англис тили', en: 'English' };

export const getTeamMembers = createLocalized<TeamMember[]>([
  {
    id: 1,
    photo: user1,
    name: { ru: 'Айгуль Садыкова', ky: 'Айгүл Садыкова', en: 'Aigul Sadykova' },
    role: { ru: 'Директор фонда', ky: 'Фонддун директору', en: 'Director of the Fund' },
    // Модалка (патч 2, экран 13)
    sinceYear: 2016,
    bio: {
      ru: 'Работает в некоммерческом секторе 18 лет. До фонда руководила программами поддержки семей в международной организации, отвечала за проекты в семи регионах страны.',
      ky: 'Коммерциялык эмес секторда 18 жылдан бери иштейт. Фондго чейин эл аралык уюмда үй-бүлөлөрдү колдоо программаларын жетектеп, өлкөнүн жети аймагындагы долбоорлорго жооп берген.',
      en: 'Has worked in the non-profit sector for 18 years. Before joining the fund, led family support programs at an international organization and oversaw projects in seven regions of the country.',
    },
    responsibilities: {
      ru: 'Отвечает за стратегию фонда, отношения с донорами и публичную отчётность.',
      ky: 'Фонддун стратегиясына, донорлор менен мамилеге жана коомдук отчеттуулукка жооп берет.',
      en: 'Responsible for the fund’s strategy, donor relations and public reporting.',
    },
    email: 'a.sadykova@altyn-muras.kg',
    languages: [KYRGYZ, RUSSIAN, ENGLISH],
  },
  {
    id: 2,
    photo: user2,
    name: { ru: 'Бакыт Орозов', ky: 'Бакыт Орозов', en: 'Bakyt Orozov' },
    role: { ru: 'Финансовый директор', ky: 'Каржы директору', en: 'Chief Financial Officer' },
    sinceYear: 2018,
    bio: {
      ru: 'Более 15 лет в корпоративных финансах и аудите, до фонда работал в международной аудиторской компании.',
      ky: 'Корпоративдик финансы жана аудит тармагында 15 жылдан ашык иштеген, фондго чейин эл аралык аудитордук компанияда эмгектенген.',
      en: 'More than 15 years in corporate finance and audit; previously worked at an international audit firm.',
    },
    responsibilities: {
      ru: 'Отвечает за бюджет фонда, финансовую отчётность и работу с аудиторами.',
      ky: 'Фонддун бюджетине, каржылык отчеттуулукка жана аудиторлор менен иштөөгө жооп берет.',
      en: 'Responsible for the fund’s budget, financial reporting and work with auditors.',
    },
    email: 'b.orozov@altyn-muras.kg',
    languages: [KYRGYZ, RUSSIAN],
  },
  {
    id: 3,
    photo: user3,
    name: { ru: 'Нургуль Асанова', ky: 'Нургүл Асанова', en: 'Nurgul Asanova' },
    role: { ru: 'Руководитель проектов', ky: 'Долбоорлордун жетекчиси', en: 'Head of Projects' },
    sinceYear: 2019,
    bio: {
      ru: 'Руководила социальными программами в регионах, специализируется на проектах в образовании и здравоохранении.',
      ky: 'Аймактарда социалдык программаларды жетектеген, билим берүү жана саламаттыкты сактоо долбоорлоруна адистешкен.',
      en: 'Has led social programs in the regions; specializes in education and healthcare projects.',
    },
    responsibilities: {
      ru: 'Отвечает за планирование, запуск и оценку проектов фонда.',
      ky: 'Фонддун долбоорлорун пландоого, ишке киргизүүгө жана баалоого жооп берет.',
      en: 'Responsible for planning, launching and evaluating the fund’s projects.',
    },
    email: 'n.asanova@altyn-muras.kg',
    languages: [KYRGYZ, RUSSIAN, ENGLISH],
  },
  {
    id: 4,
    photo: user4,
    name: { ru: 'Эмиль Токтогулов', ky: 'Эмиль Токтогулов', en: 'Emil Toktogulov' },
    role: { ru: 'PR и коммуникации', ky: 'PR жана коммуникациялар', en: 'PR and Communications' },
    sinceYear: 2021,
    bio: {
      ru: 'Журналист и коммуникационный специалист, до фонда работал в региональных и республиканских СМИ.',
      ky: 'Журналист жана коммуникация боюнча адис, фондго чейин аймактык жана республикалык ЖМКларда иштеген.',
      en: 'Journalist and communications specialist; previously worked for regional and national media.',
    },
    responsibilities: {
      ru: 'Отвечает за сайт фонда, социальные сети и работу со СМИ.',
      ky: 'Фонддун сайтына, социалдык тармактарга жана ЖМК менен иштөөгө жооп берет.',
      en: 'Responsible for the fund’s website, social media and media relations.',
    },
    email: 'e.toktogulov@altyn-muras.kg',
    languages: [KYRGYZ, RUSSIAN, ENGLISH],
  },
]);
