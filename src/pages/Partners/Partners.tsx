import { PartnerCardList } from '@components/PartnerCardList';
import { CTABanner } from '@ui/CTABanner';
import { Container } from '@components/Container';
import clsx from 'clsx';
import { PARTNERS } from '@/mocks';
import style from './Partners.module.scss';

export function Partners() {
  return (
    <Container className={clsx('page', style.partnerPage)}>
      <p className={style.partnerPage_BreadCrump}>Главная / Партнёры</p>
      <h1>Наши партнёры</h1>
      <p>Организации, которые поддерживают работу фонда.</p>
      <PartnerCardList items={PARTNERS} />
      <CTABanner
        title="Хотите стать партнёром?"
        description="Свяжитесь с нами — расскажем о формах сотрудничества и совместных проектах."
        buttonText="Написать нам"
        onBtnClick={() => alert('CTA click')}
      />
    </Container>
  );
}
