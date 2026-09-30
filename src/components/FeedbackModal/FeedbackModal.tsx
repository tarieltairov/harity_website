import type { ChangeEvent, SubmitEvent } from 'react';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { Button } from '@ui/Button';
import { FilterChip } from '@ui/FilterChip';
import { Input, Textarea } from '@ui/form';
import { Modal } from '@ui/Modal';
import { SuccessModal } from '@components/SuccessModal';
import type { ru } from '@/i18n/locales/ru';

import styles from './FeedbackModal.module.scss';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Ключи тем — подписи в словаре `feedback.topics`
const TOPICS = ['partnership', 'help', 'media', 'other'] as const;

type Topic = (typeof TOPICS)[number];

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
  topic: Topic | '';
  name: string;
  phone: string;
  email: string;
  message: string;
}

type FormField = keyof FormValues;
// Ключ из `feedback.errors` или '' — текст ошибки берётся из словаря при рендере,
// поэтому уже показанная ошибка перерисуется при смене языка
type ErrorKey = keyof typeof ru.feedback.errors;
type FormErrors = Partial<Record<FormField, ErrorKey | ''>>;

const EMPTY_FORM: FormValues = { topic: '', name: '', phone: '', email: '', message: '' };

// Убирает пробелы по краям и схлопывает повторные пробелы внутри строки
const cleanText = (value: string) => value.trim().replace(/\s{2,}/g, ' ');

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
const validators: Record<FormField, (value: string) => ErrorKey | ''> = {
  topic: (value) => (value ? '' : 'topic'),
  name: (value) => {
    const name = cleanText(value);
    if (name.length < NAME_MIN_LENGTH) return 'nameRequired';
    if (!NAME_REGEX.test(name)) return 'nameInvalid';
    return '';
  },
  phone: (value) => {
    if (!value) return 'phoneRequired';
    const localDigits = value.replace(/\D/g, '').replace(/^996/, '');
    return localDigits.length === PHONE_LOCAL_DIGITS ? '' : 'phoneIncomplete';
  },
  email: (value) => {
    const email = value.trim();
    if (!email) return 'emailRequired';
    if (!EMAIL_REGEX.test(email)) return 'emailInvalid';
    return '';
  },
  message: (value) => (cleanText(value).length >= MESSAGE_MIN_LENGTH ? '' : 'message'),
};

const FEEDBACK_EMAIL = 'info@altyn-muras.kg';

const validateForm = (values: FormValues): FormErrors => ({
  topic: validators.topic(values.topic),
  name: validators.name(values.name),
  phone: validators.phone(values.phone),
  email: validators.email(values.email),
  message: validators.message(values.message),
});

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const { t } = useTranslation();
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [agreed, setAgreed] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [sentTopic, setSentTopic] = useState<Topic>(TOPICS[0]);

  const hasErrors = agreeError || Object.values(errors).some(Boolean);

  // Пока пользователь правит поле, его ошибку не показываем —
  // она вернётся на blur или при следующей попытке отправки
  const setValue = <Field extends FormField>(field: Field, value: FormValues[Field]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: '' } : prev));
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
    setAgreed(false);
    setAgreeError(false);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

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
    setAgreeError(!agreed);

    if (!agreed || Object.values(nextErrors).some(Boolean)) return;

    // После валидации тема точно выбрана
    if (cleaned.topic) setSentTopic(cleaned.topic);
    resetForm();
    onClose();
    setIsSuccessOpen(true);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

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
            {errors.topic && (
              <span className={styles.errorText}>{t(`feedback.errors.${errors.topic}`)}</span>
            )}
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
                className={clsx(errors.name && styles.inputError)}
                onChange={(e) => setValue('name', e.target.value)}
                onBlur={() => handleTextBlur('name')}
              />
              {errors.name && (
                <span className={styles.errorText}>{t(`feedback.errors.${errors.name}`)}</span>
              )}
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
                className={clsx(errors.phone && styles.inputError)}
                onChange={handlePhoneChange}
                onBlur={() => validateField('phone')}
              />
              {errors.phone && (
                <span className={styles.errorText}>{t(`feedback.errors.${errors.phone}`)}</span>
              )}
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
              className={clsx(errors.email && styles.inputError)}
              onChange={(e) => setValue('email', e.target.value)}
              onBlur={() => handleTextBlur('email')}
            />
            {errors.email && (
              <span className={styles.errorText}>{t(`feedback.errors.${errors.email}`)}</span>
            )}
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
              className={clsx(errors.message && styles.inputError)}
              onChange={(e) => setValue('message', e.target.value)}
              onBlur={() => handleTextBlur('message')}
            />
            {errors.message && (
              <span className={styles.errorText}>{t(`feedback.errors.${errors.message}`)}</span>
            )}
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
            <Button variant="primary" type="submit">
              {t('feedback.submit')}
            </Button>
            {hasErrors ? (
              <span className={styles.footerError}>{t('feedback.requiredError')}</span>
            ) : (
              <span className={styles.emailHint}>
                <Trans
                  i18nKey="feedback.emailHint"
                  values={{ email: FEEDBACK_EMAIL }}
                  components={{ link: <a href={`mailto:${FEEDBACK_EMAIL}`} /> }}
                />
              </span>
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
