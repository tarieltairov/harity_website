import type { ChangeEvent, SubmitEvent } from 'react';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { Button } from '@ui/Button';
import { FilterChip } from '@ui/FilterChip';
import { Input, Textarea } from '@ui/form';
import { Modal } from '@ui/Modal';
import { SuccessModal } from '@components/SuccessModal';
import { FEEDBACK_TOPIC_VALUES, isApiError, useContacts, useSendFeedback } from '@/api';
import type { FeedbackTopic } from '@/api';
import type { FeedbackErrorKey } from '@/i18n';

import styles from './FeedbackModal.module.scss';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Ключи тем — подписи в словаре `feedback.topics`, значения для API — FEEDBACK_TOPIC_VALUES
const TOPICS = Object.keys(FEEDBACK_TOPIC_VALUES) as FeedbackTopic[];

const NAME_MIN_LENGTH = 2;
const MESSAGE_MIN_LENGTH = 10;
const PHONE_LOCAL_DIGITS = 9; // цифр после кода страны: (XXX) XX-XX-XX

// Буквы (кириллица с кыргызскими ң/ө/ү и латиница); внутри слова допустимы дефис
// и апостроф (Айсулуу-Кыз, О'Брайен), между словами — одиночные пробелы
const LETTERS = 'A-Za-zА-Яа-яЁёҢңӨөҮү';
const NAME_WORD = `[${LETTERS}]+(?:['ʼ-][${LETTERS}]+)*`;
const NAME_REGEX = new RegExp(`^${NAME_WORD}(?: ${NAME_WORD})*$`);

// Полноценная структура имя@домен.зона, а не просто наличие «@»
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface FormValues {
  topic: FeedbackTopic | '';
  name: string;
  phone: string;
  email: string;
  message: string;
}

type FormField = keyof FormValues;
// Ключ из `feedback.errors` или '' — текст ошибки берётся из словаря при рендере,
// поэтому уже показанная ошибка перерисуется при смене языка
type FormErrors = Partial<Record<FormField, FeedbackErrorKey | ''>>;
// Ошибки полей от бэка (400 VALIDATION_ERROR) — готовый текст, показываем как есть
type ServerErrors = Partial<Record<FormField, string>>;

const FORM_FIELDS: FormField[] = ['topic', 'name', 'phone', 'email', 'message'];

const EMPTY_FORM: FormValues = { topic: '', name: '', phone: '', email: '', message: '' };

// Убирает пробелы по краям и схлопывает повторные пробелы внутри строки
const cleanText = (value: string) => value.trim().replace(/\s{2,}/g, ' ');

// Цифры номера без кода страны: «+996 (555) 12-34-56» → «555123456»
const localPhoneDigits = (value: string) => value.replace(/\D/g, '').replace(/^996/, '');

// «555123456» → «+996 (555) 12-34-56»; частичный ввод форматируется по мере набора
const formatKgPhone = (localDigits: string) => {
  const digits = localDigits.slice(0, PHONE_LOCAL_DIGITS);
  let result = `+996 (${digits.slice(0, 3)}`;
  if (digits.length > 3) result += `) ${digits.slice(3, 5)}`;
  if (digits.length > 5) result += `-${digits.slice(5, 7)}`;
  if (digits.length > 7) result += `-${digits.slice(7, 9)}`;
  return result;
};

// Валидаторы сами чистят значение, а не полагаются на onBlur —
// иначе сабмит «в обход» blur пропустил бы мусор
const validators: Record<FormField, (value: string) => FeedbackErrorKey | ''> = {
  topic: (value) => (value ? '' : 'topic'),
  name: (value) => {
    const name = cleanText(value);
    if (name.length < NAME_MIN_LENGTH) return 'nameRequired';
    if (!NAME_REGEX.test(name)) return 'nameInvalid';
    return '';
  },
  phone: (value) => {
    if (!value) return 'phoneRequired';
    return localPhoneDigits(value).length === PHONE_LOCAL_DIGITS ? '' : 'phoneIncomplete';
  },
  email: (value) => {
    const email = value.trim();
    if (!email) return 'emailRequired';
    if (!EMAIL_REGEX.test(email)) return 'emailInvalid';
    return '';
  },
  message: (value) => (cleanText(value).length >= MESSAGE_MIN_LENGTH ? '' : 'message'),
};

const validateForm = (values: FormValues): FormErrors => ({
  topic: validators.topic(values.topic),
  name: validators.name(values.name),
  phone: validators.phone(values.phone),
  email: validators.email(values.email),
  message: validators.message(values.message),
});

// Из `fields` ответа бэка оставляем только поля формы — в том порядке, что в контракте
const pickServerErrors = (fields: Record<string, string>): ServerErrors =>
  Object.fromEntries(
    FORM_FIELDS.filter((field) => typeof fields[field] === 'string').map((field) => [
      field,
      fields[field],
    ])
  );

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const { t } = useTranslation();
  // Почта фонда — из общего запроса контактов, как в футере и на странице 500.
  // Модалка может быть открыта вне ErrorBoundary — ошибку не пробрасываем, подсказку прячем
  const { data: contacts } = useContacts({ throwOnError: false });
  const fundEmail = contacts?.email;
  const sendFeedback = useSendFeedback();

  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverErrors, setServerErrors] = useState<ServerErrors>({});
  const [submitFailed, setSubmitFailed] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [sentTopic, setSentTopic] = useState<FeedbackTopic>(TOPICS[0]);

  const hasErrors =
    agreeError || Object.values(errors).some(Boolean) || Object.values(serverErrors).some(Boolean);

  // Под полем — своя ошибка (из словаря) или ошибка бэка, если своя валидация пропустила
  const fieldError = (field: FormField) => {
    const key = errors[field];
    if (key) return t(`feedback.errors.${key}`);
    return serverErrors[field];
  };

  // Пока пользователь правит поле, его ошибку не показываем —
  // она вернётся на blur или при следующей попытке отправки
  const setValue = <Field extends FormField>(field: Field, value: FormValues[Field]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: '' } : prev));
    setServerErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const validateField = (field: FormField) => {
    setErrors((prev) => ({ ...prev, [field]: validators[field](values[field]) }));
  };

  const handleTextBlur = (field: 'name' | 'email' | 'message') => {
    const cleaned = cleanText(values[field]);
    setValues((prev) => ({ ...prev, [field]: cleaned }));
    setErrors((prev) => ({ ...prev, [field]: validators[field](cleaned) }));
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    let digits = event.target.value.replace(/\D/g, '');
    // Код страны и ведущий ноль не набираются — маска подставляет +996 сама
    if (digits.startsWith('996')) digits = digits.slice(3);
    else if (digits.startsWith('0')) digits = digits.slice(1);
    setValue('phone', digits ? formatKgPhone(digits) : '');
  };

  const resetForm = () => {
    setValues(EMPTY_FORM);
    setErrors({});
    setServerErrors({});
    setSubmitFailed(false);
    setAgreed(false);
    setAgreeError(false);
    sendFeedback.reset();
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendFeedback.isPending) return;

    // Чистим текстовые поля, даже если сабмит случился без blur
    const cleaned: FormValues = {
      ...values,
      name: cleanText(values.name),
      email: values.email.trim(),
      message: cleanText(values.message),
    };
    const nextErrors = validateForm(cleaned);

    setValues(cleaned);
    setErrors(nextErrors);
    setServerErrors({});
    setSubmitFailed(false);
    setAgreeError(!agreed);

    if (!agreed || !cleaned.topic || Object.values(nextErrors).some(Boolean)) return;

    // После валидации тема точно выбрана: на сервер уходит её значение из контракта,
    // телефон — нормализованным «+996XXXXXXXXX»
    const topic = cleaned.topic;

    sendFeedback.mutate(
      {
        topic: FEEDBACK_TOPIC_VALUES[topic],
        name: cleaned.name,
        phone: `+996${localPhoneDigits(cleaned.phone)}`,
        email: cleaned.email,
        message: cleaned.message,
      },
      {
        onSuccess: () => {
          setSentTopic(topic);
          resetForm();
          onClose();
          setIsSuccessOpen(true);
        },
        onError: (error) => {
          // 400 — бэк вернул ошибки по полям, показываем их под полями;
          // остальное (сеть, 5xx) — общая подпись в футере формы
          if (isApiError(error) && error.isValidation && error.fields) {
            setServerErrors(pickServerErrors(error.fields));
            return;
          }
          setSubmitFailed(true);
        },
      }
    );
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const topicError = fieldError('topic');
  const nameError = fieldError('name');
  const phoneError = fieldError('phone');
  const emailError = fieldError('email');
  const messageError = fieldError('message');

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} className={styles.modal}>
        <form onSubmit={handleSubmit} noValidate>
          <h2 className={styles.title}>{t('feedback.title')}</h2>
          <p className={styles.subtitle}>{t('feedback.subtitle')}</p>

          <div className={styles.topics}>
            <span className={styles.topicsLabel}>{t('feedback.topicLabel')}</span>
            <div className={styles.chips}>
              {TOPICS.map((topic) => (
                <FilterChip
                  key={topic}
                  type="button"
                  isActive={values.topic === topic}
                  onClick={() => setValue('topic', topic)}
                >
                  {t(`feedback.topics.${topic}`)}
                </FilterChip>
              ))}
            </div>
            {topicError && <span className={styles.errorText}>{topicError}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="feedback-name">
                {t('feedback.nameLabel')}
              </label>
              <Input
                id="feedback-name"
                type="text"
                placeholder={t('feedback.namePlaceholder')}
                maxLength={80}
                value={values.name}
                className={clsx(nameError && styles.inputError)}
                onChange={(e) => setValue('name', e.target.value)}
                onBlur={() => handleTextBlur('name')}
              />
              {nameError && <span className={styles.errorText}>{nameError}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="feedback-phone">
                {t('feedback.phoneLabel')}
              </label>
              <Input
                id="feedback-phone"
                type="tel"
                inputMode="numeric"
                placeholder="+996 (___) __-__-__"
                value={values.phone}
                className={clsx(phoneError && styles.inputError)}
                onChange={handlePhoneChange}
                onBlur={() => validateField('phone')}
              />
              {phoneError && <span className={styles.errorText}>{phoneError}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="feedback-email">
              {t('feedback.emailLabel')}
            </label>
            <Input
              id="feedback-email"
              type="email"
              placeholder="you@example.com"
              maxLength={80}
              value={values.email}
              className={clsx(emailError && styles.inputError)}
              onChange={(e) => setValue('email', e.target.value)}
              onBlur={() => handleTextBlur('email')}
            />
            {emailError && <span className={styles.errorText}>{emailError}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="feedback-message">
              {t('feedback.messageLabel')}
            </label>
            <Textarea
              id="feedback-message"
              rows={4}
              maxLength={2000}
              placeholder={t('feedback.messagePlaceholder')}
              value={values.message}
              className={clsx(messageError && styles.inputError)}
              onChange={(e) => setValue('message', e.target.value)}
              onBlur={() => handleTextBlur('message')}
            />
            {messageError && <span className={styles.errorText}>{messageError}</span>}
          </div>

          <label className={styles.agreement}>
            <input
              type="checkbox"
              className={clsx(styles.checkbox, agreeError && styles.checkboxError)}
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (e.target.checked) setAgreeError(false);
              }}
            />
            <span>
              <Trans
                i18nKey="feedback.agreement"
                components={{ link: <a href="#" target="_blank" rel="noreferrer" /> }}
              />
            </span>
          </label>

          <div className={styles.footer}>
            <Button variant="primary" type="submit" disabled={sendFeedback.isPending}>
              {sendFeedback.isPending ? t('feedback.submitting') : t('feedback.submit')}
            </Button>
            {hasErrors ? (
              <span className={styles.footerError}>{t('feedback.requiredError')}</span>
            ) : submitFailed ? (
              <span className={styles.footerError} role="alert">
                {t('feedback.submitError')}
              </span>
            ) : (
              fundEmail && (
                <span className={styles.emailHint}>
                  <Trans
                    i18nKey="feedback.emailHint"
                    values={{ email: fundEmail }}
                    components={{ link: <a href={`mailto:${fundEmail}`} /> }}
                  />
                </span>
              )
            )}
          </div>
        </form>
      </Modal>

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        topic={t(`feedback.topics.${sentTopic}`)}
      />
    </>
  );
}
