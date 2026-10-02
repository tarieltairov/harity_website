import aboutFundImg from '@assets/jpeg/aboutfund.jpg';
import style from './AboutFund.module.scss';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export function AboutFund() {
  const { t } = useTranslation();

  return (
    <section className={style.about}>
      <div className={style.aboutFund}>
        <div className={style.aboutFund_Info}>
          <h2>{t('about.title')}</h2>
          <p className={clsx(style.aboutFund_Info_Mobile, style.aboutFund_Info_Mobile_Text)}>
            {t('about.mobileText')}
          </p>
          <div
            className={clsx(style.aboutFund_Info_Mobile, style.aboutFund_Info_Mobile_ImgWrapper)}
          >
            <img src={aboutFundImg} alt="" />
          </div>
          <p className={style.aboutFund_Info_Text_All}>{t('about.mission')}</p>
        </div>
        <div className={style.aboutFund_ImgWrapper}>
          <img src={aboutFundImg} alt="" />
        </div>
      </div>
    </section>
  );
}
