import { Textarea } from '@ui/form/Textarea';
import { Input } from '@ui/form/Input';
import { Container } from '@components/Container';
import styles from '@pages/Contacts/Contacts.module.scss';
import { Button } from '@ui/Button';

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
                <p>г. Бишкек, ул. Абдрахманова, 145</p>
                <p>+996 312 90 00 00</p>
                <p>info@altyn-muras.kg</p>
                <p>Пн-Пт: 9:00 - 18:00</p>
              </div>
            </aside>

            <div className={styles.map}>
              <iframe
                src="https://www.google.com/maps?q=Абдрахманова%20145,%20Бишкек&output=embed"
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
