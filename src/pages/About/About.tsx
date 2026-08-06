import { Container } from '@components/Container';
import { AboutFund } from './components/AboutFund';
import { StatsBlock } from '@components/StatsBlock';
import { AboutTeam } from './components/AboutOurTeam';
import { AboutDoc } from './components/AboutDocFund';

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
      <AboutTeam />
      <AboutDoc />
    </Container>
  );
}
