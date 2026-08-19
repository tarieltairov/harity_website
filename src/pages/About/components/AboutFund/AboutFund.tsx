import aboutFundImg from '@assets/jpeg/aboutfund.jpg';
import style from './AboutFund.module.scss';
import clsx from 'clsx';
export function AboutFund() {
  return (
    <section className={style.about}>
      <div className={style.aboutFund}>
        <div className={style.aboutFund_Info}>
          <h2>О фонде «Алтын Мурас»</h2>
          <p className={clsx(style.aboutFund_Info_Mobile, style.aboutFund_Info_Mobile_Text)}>
            Работаем открыто и честно уже 12 лет — ради семей, которым нужна помощь.
          </p>
          <div
            className={clsx(style.aboutFund_Info_Mobile, style.aboutFund_Info_Mobile_ImgWrapper)}
          >
            <img src={aboutFundImg} alt="" />
          </div>
          <p className={style.aboutFund_Info_Text_All}>
            Наша миссия — системная помощь нуждающимся семьям и развитие сообществ через
            образование, медицину и социальную поддержку в самых отдалённых регионах страны. Мы
            верим в прозрачность и открытую отчётность перед донорами и обществом.
          </p>
        </div>
        <div className={style.aboutFund_ImgWrapper}>
          <img src={aboutFundImg} alt="" />
        </div>
      </div>
    </section>
  );
}
