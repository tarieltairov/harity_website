import { Textarea } from '@ui/form/Textarea';
import { Input } from '@ui/form/Input';
import { Container } from '@components/Container';
import styles from '@pages/Contacts/Contacts.module.scss';
import { Button } from '@ui/Button';
import { FUND_CONTACTS } from '@/mocks';

export function Contacts() {
  return (
    <Container className="page">
      <div className={styles.contacts}>
        <h1 className={styles.contacts__title}>Контакты</h1>
        <p className={styles.contacts__subtitle}>Ответим на любые вопросы о деятельности фонда.</p>

        <div className={styles.contacts__content}>
          <div className={styles.contacts__form}>
            <div className={styles.contacts__row}>
              <Input className={styles.contacts__field} placeholder="Ваше имя" />
              <Input className={styles.contacts__field} placeholder="Email" />
            </div>

            <Input className={styles.contacts__field} placeholder="Тема обращения" />
            <Textarea className={styles.contacts__field} placeholder="Сообщение" />

            <Button className={styles.button_send} variant="primary">
              Отправить сообщение
            </Button>
          </div>

          <div className={styles.contacts__side}>
            <aside className={styles.contacts__info}>
              <div className={styles.contacts__infoText}>
                <p>{FUND_CONTACTS.address}</p>
                <p>{FUND_CONTACTS.phone}</p>
                <p>{FUND_CONTACTS.email}</p>
                <p>{FUND_CONTACTS.workingHours}</p>
              </div>
            </aside>

            <div className={styles.map}>
              <iframe
                src={FUND_CONTACTS.mapEmbedSrc}
                title="Карта проезда"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
