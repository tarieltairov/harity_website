import aboutFundImg from '@assets/jpeg/aboutfund.jpg';
import style from './AboutFund.module.scss';
import clsx from 'clsx';
export function AboutFund() {
  return (
    <section className={style.About}>
      <div className={style.AboutFund}>
        <div className={style.AboutFund_Info}>
          <div>Главная / О фонде</div>
          <h2>О фонде «Алтын Мурас»</h2>
          <p className={clsx(style.AboutFund_Info_Mobile, style.AboutFund_Info_Mobile_Text)}>
            Работаем открыто и честно уже 12 лет — ради семей, которым нужна помощь.
          </p>
          <div
            className={clsx(style.AboutFund_Info_Mobile, style.AboutFund_Info_Mobile_ImgWrapper)}
          >
            <img src={aboutFundImg} alt="" />
          </div>
          <p className={style.AboutFund_Info_Text_All}>
            Наша миссия — системная помощь нуждающимся семьям и развитие сообществ через
            образование, медицину и социальную поддержку в самых отдалённых регионах страны. Мы
            верим в прозрачность и открытую отчётность перед донорами и обществом.
          </p>
        </div>
        <div className={style.AboutFund_ImgWrapper}>
          <img src={aboutFundImg} alt="" />
        </div>
      </div>
    </section>
  );
}
