import { Container } from '@components/Container';
import { AboutFund } from './components/AboutFund';
import { StatsBlock } from '@components/StatsBlock';
import { AboutDocFund } from './components/AboutDocFund';
import { AboutOurTeam } from './components/AboutOurTeam';
import { useStats } from '@/api';

export function About() {
  const { data: stats } = useStats();

  return (
    <Container className="page">
      <AboutFund />
      <StatsBlock items={stats} />
      <AboutOurTeam />
      <AboutDocFund />
    </Container>
  );
}
