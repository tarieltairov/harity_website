import { useTranslation } from 'react-i18next';
import { PersonCard } from '@components/PersonCard';
import { Loader } from '@ui/Loader';
import { useTeam } from '@/api';
import style from './AboutOurTeam.module.scss';

export function AboutOurTeam() {
  const { t } = useTranslation();
  const { data: team } = useTeam();

  return (
    <section className={style.about}>
      <h1>{t('about.team')}</h1>
      {team ? <PersonCard items={team} /> : <Loader />}
    </section>
  );
}
