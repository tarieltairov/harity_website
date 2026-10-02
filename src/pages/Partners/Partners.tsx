import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PartnerCardList } from '@components/PartnerCardList';
import { CTABanner } from '@ui/CTABanner';
import { Container } from '@components/Container';
import { Loader } from '@ui/Loader';
import clsx from 'clsx';
import { ROUTES } from '@/config/routes';
import { usePartners } from '@/api';
import style from './Partners.module.scss';

export function Partners() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: partners } = usePartners();

  return (
    <Container className={clsx('page', style.partnerPage)}>
      <h1>{t('partners.title')}</h1>
      <p>{t('partners.subtitle')}</p>
      {partners ? <PartnerCardList items={partners} /> : <Loader />}
      <CTABanner
        title={t('partners.cta.title')}
        description={t('partners.cta.description')}
        buttonText={t('common.writeUs')}
        onBtnClick={() => navigate(ROUTES.contacts)}
      />
    </Container>
  );
}
