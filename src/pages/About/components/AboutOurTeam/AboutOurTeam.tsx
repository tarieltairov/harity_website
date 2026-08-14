import { PersonCard } from '@components/PersonCard';
import { TEAM_MEMBERS } from '@/mocks';
import style from './AboutOurTeam.module.scss';

export function AboutOurTeam() {
  return (
    <section className={style.about}>
      <h1>Наша команда</h1>
      <PersonCard items={TEAM_MEMBERS} />
    </section>
  );
}
