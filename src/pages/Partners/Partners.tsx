import { useTranslation } from 'react-i18next';
import { PartnerCardList } from '@components/PartnerCardList';
import { CTABanner } from '@ui/CTABanner';
import { Container } from '@components/Container';
import clsx from 'clsx';
import { useLang } from '@/i18n';
import { getPartners } from '@/mocks';
import style from './Partners.module.scss';

export function Partners() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <Container className={clsx('page', style.partnerPage)}>
      <h1>{t('partners.title')}</h1>
      <p>{t('partners.subtitle')}</p>
      <PartnerCardList items={getPartners(lang)} />
      <CTABanner
        title={t('partners.cta.title')}
        description={t('partners.cta.description')}
        buttonText={t('common.writeUs')}
        onBtnClick={() => alert('CTA click')}
      />
    </Container>
  );
}
