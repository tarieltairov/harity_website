import { Container } from '@components/Container';
import { AboutFund } from './components/AboutFund';
import { StatsBlock } from '@components/StatsBlock';
import { AboutDocFund } from './components/AboutDocFund';
import { AboutOurTeam } from './components/AboutOurTeam';
import { FUND_STATS } from '@/mocks';

export function About() {
  return (
    <Container className="page">
      <AboutFund />
      <StatsBlock items={FUND_STATS} />
      <AboutOurTeam />
      <AboutDocFund />
    </Container>
  );
}
