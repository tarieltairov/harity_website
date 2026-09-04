import type { TeamMember } from '@/types';

import user1 from '@assets/jpeg/user1.jpg';
import user2 from '@assets/jpeg/user2.jpg';
import user3 from '@assets/jpeg/user3.jpg';
import user4 from '@assets/jpeg/user4.jpg';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    photo: user1,
    name: 'Айгуль Садыкова',
    role: 'Директор фонда',
    // Модалка (патч 2, экран 13)
    sinceYear: 2016,
    bio: 'Работает в некоммерческом секторе 18 лет. До фонда руководила программами поддержки семей в международной организации, отвечала за проекты в семи регионах страны.',
    responsibilities: 'Отвечает за стратегию фонда, отношения с донорами и публичную отчётность.',
    email: 'a.sadykova@altyn-muras.kg',
    languages: ['кыргызский', 'русский', 'английский'],
  },
  {
    id: 2,
    photo: user2,
    name: 'Бакыт Орозов',
    role: 'Финансовый директор',
    sinceYear: 2018,
    bio: 'Более 15 лет в корпоративных финансах и аудите, до фонда работал в международной аудиторской компании.',
    responsibilities: 'Отвечает за бюджет фонда, финансовую отчётность и работу с аудиторами.',
    email: 'b.orozov@altyn-muras.kg',
    languages: ['кыргызский', 'русский'],
  },
  {
    id: 3,
    photo: user3,
    name: 'Нургуль Асанова',
    role: 'Руководитель проектов',
    sinceYear: 2019,
    bio: 'Руководила социальными программами в регионах, специализируется на проектах в образовании и здравоохранении.',
    responsibilities: 'Отвечает за планирование, запуск и оценку проектов фонда.',
    email: 'n.asanova@altyn-muras.kg',
    languages: ['кыргызский', 'русский', 'английский'],
  },
  {
    id: 4,
    photo: user4,
    name: 'Эмиль Токтогулов',
    role: 'PR и коммуникации',
    sinceYear: 2021,
    bio: 'Журналист и коммуникационный специалист, до фонда работал в региональных и республиканских СМИ.',
    responsibilities: 'Отвечает за сайт фонда, социальные сети и работу со СМИ.',
    email: 'e.toktogulov@altyn-muras.kg',
    languages: ['кыргызский', 'русский', 'английский'],
  },
];
