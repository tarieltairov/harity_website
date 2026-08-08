import { Container } from '@components/Container';
import { AboutFund } from './components/AboutFund';
import { StatsBlock } from '@components/StatsBlock';
import { AboutDocFund } from './components/AboutDocFund';
import { AboutOurTeam } from './components/AboutOurTeam';

export function About() {
  const stats = [
    { value: '12 лет', label: 'Работы фонда' },
    { value: '48', label: 'Проектов реализовано' },
    { value: '9', label: 'Регионов охвачено' },
  ];
  return (
    <Container className="page">
      <AboutFund />
      <StatsBlock items={stats} />
      <AboutOurTeam />
      <AboutDocFund />
    </Container>
  );
}
