import user1 from '@assets/jpeg/user1.jpg';
import user2 from '@assets/jpeg/user2.jpg';
import user3 from '@assets/jpeg/user3.jpg';
import user4 from '@assets/jpeg/user4.jpg';
import { StatsProfile } from '@components/PersonCard';
import style from './AboutOurTeam.module.scss';

export function AboutTeam() {
  const profile = [
    { photo: user1, name: 'Айгуль Садыкова', role: 'Директор фонда' },
    { photo: user2, name: 'Бакыт Орозов', role: 'Финансовый директор' },
    { photo: user3, name: 'Нургуль Асанова', role: 'Руководитель проектов' },
    { photo: user4, name: 'Эмиль Токтогулов', role: 'PR и коммуникации' },
  ];

  return (
    <section className={style.About}>
      <h1>Наша команда</h1>
      <StatsProfile items={profile} />
    </section>
  );
}
