import { useTranslation } from 'react-i18next';
import { PersonCard } from '@components/PersonCard';
import { useLang } from '@/i18n';
import { getTeamMembers } from '@/mocks';
import style from './AboutOurTeam.module.scss';

export function AboutOurTeam() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <section className={style.about}>
      <h1>{t('about.team')}</h1>
      <PersonCard items={getTeamMembers(lang)} />
    </section>
  );
}
