import { PartnerCard } from '@components/PartnerCard';
import { CTABanner } from '@ui/CTABanner';
import { Container } from '@components/Container';
import clsx from 'clsx';
import style from './Partners.module.scss';

const stats = [
  { name: 'ДА', fullName: 'Фонд «Дети Азии»' },
  { name: 'АВ', fullName: 'Ассоциация врачей КР' },
  { name: 'МА', fullName: 'Международный альянс НКО' },
  { name: 'БТ', fullName: 'БишкекТелеком' },
  { name: 'СМ', fullName: 'Союз «Мурас»' },
  { name: 'АР', fullName: 'Агентство развития регионов' },
  { name: 'ЧВ', fullName: 'Фонд «Чистая вода»' },
  { name: 'СП', fullName: 'Союз предпринимателей КР' },
];

export function Partners() {
  return (
    <Container className={clsx('page', style.partnerPage)}>
      <p className={style.partnerPage_BreadCrump}>Главная / Партнёры</p>
      <h1>Наши партнёры</h1>
      <p>Организации, которые поддерживают работу фонда.</p>
      <PartnerCard items={stats} />
      <CTABanner
        title="Хотите стать партнёром?"
        description="Свяжитесь с нами — расскажем о формах сотрудничества и совместных проектах."
        buttonText="Написать нам"
        onBtnClick={() => alert('CTA click')}
      />
    </Container>
  );
}
