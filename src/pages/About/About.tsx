import { Container } from '@components/Container';
import { AboutFund } from './components/AboutFund';
import { StatsBlock } from '@components/StatsBlock';
import { AboutDocFund } from './components/AboutDocFund';
import { AboutOurTeam } from './components/AboutOurTeam';
import { useLang } from '@/i18n';
import { getFundStats } from '@/mocks';

export function About() {
  const lang = useLang();

  return (
    <Container className="page">
      <AboutFund />
      <StatsBlock items={getFundStats(lang)} />
      <AboutOurTeam />
      <AboutDocFund />
    </Container>
  );
}
