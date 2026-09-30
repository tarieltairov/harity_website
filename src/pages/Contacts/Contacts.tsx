import { useTranslation } from 'react-i18next';
import { Textarea } from '@ui/form/Textarea';
import { Input } from '@ui/form/Input';
import { Container } from '@components/Container';
import styles from '@pages/Contacts/Contacts.module.scss';
import { Button } from '@ui/Button';
import { useLang } from '@/i18n';
import { getFundContacts } from '@/mocks';

export function Contacts() {
  const { t } = useTranslation();
  const contacts = getFundContacts(useLang());

  return (
    <Container className="page">
      <div className={styles.contacts}>
        <h1 className={styles.contacts__title}>{t('contacts.title')}</h1>
        <p className={styles.contacts__subtitle}>{t('contacts.subtitle')}</p>

        <div className={styles.contacts__content}>
          <div className={styles.contacts__form}>
            <div className={styles.contacts__row}>
              <Input
                className={styles.contacts__field}
                placeholder={t('contacts.namePlaceholder')}
              />
              <Input
                className={styles.contacts__field}
                placeholder={t('contacts.emailPlaceholder')}
              />
            </div>

            <Input
              className={styles.contacts__field}
              placeholder={t('contacts.topicPlaceholder')}
            />
            <Textarea
              className={styles.contacts__field}
              placeholder={t('contacts.messagePlaceholder')}
            />

            <Button className={styles.button_send} variant="primary">
              {t('contacts.submit')}
            </Button>
          </div>

          <div className={styles.contacts__side}>
            <aside className={styles.contacts__info}>
              <div className={styles.contacts__infoText}>
                <p>{contacts.address}</p>
                <p>{contacts.phone}</p>
                <p>{contacts.email}</p>
                <p>{contacts.workingHours}</p>
              </div>
            </aside>

            <div className={styles.map}>
              <iframe
                src={contacts.mapEmbedSrc}
                title={t('contacts.mapTitle')}
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
