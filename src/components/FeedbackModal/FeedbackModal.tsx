import type { ChangeEvent, SubmitEvent } from 'react';
import { useState } from 'react';
import clsx from 'clsx';

import { Button } from '@ui/Button';
import { FilterChip } from '@ui/FilterChip';
import { Input, Textarea } from '@ui/form';
import { Modal } from '@ui/Modal';
import { SuccessModal } from '@components/SuccessModal';

import styles from './FeedbackModal.module.scss';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOPICS = ['Партнёрство', 'Хочу помочь', 'Вопрос от СМИ', 'Другое'] as const;

const NAME_MIN_LENGTH = 2;
const MESSAGE_MIN_LENGTH = 10;
const PHONE_LOCAL_DIGITS = 9; // цифр после кода страны: (XXX) XX-XX-XX

// Буквы (кириллица/латиница); внутри слова допустимы дефис и апостроф
// (Айсулуу-Кыз, О'Брайен), между словами — одиночные пробелы
const NAME_REGEX =
  /^[A-Za-zА-Яа-яЁё]+(?:['ʼ-][A-Za-zА-Яа-яЁё]+)*(?: [A-Za-zА-Яа-яЁё]+(?:['ʼ-][A-Za-zА-Яа-яЁё]+)*)*$/;

// Полноценная структура имя@домен.зона, а не просто наличие «@»
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface FormValues {
  topic: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

type FormField = keyof FormValues;
type FormErrors = Partial<Record<FormField, string>>;

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
const validators: Record<FormField, (value: string) => string> = {
  topic: (value) => (value ? '' : 'Выберите тему обращения'),
  name: (value) => {
    const name = cleanText(value);
    if (name.length < NAME_MIN_LENGTH) return 'Укажите имя и фамилию';
    if (!NAME_REGEX.test(name)) return 'Имя может содержать только буквы, дефис и апостроф';
    return '';
  },
  phone: (value) => {
    if (!value) return 'Укажите номер телефона';
    const localDigits = value.replace(/\D/g, '').replace(/^996/, '');
    return localDigits.length === PHONE_LOCAL_DIGITS ? '' : 'Введите номер полностью';
  },
  email: (value) => {
    const email = value.trim();
    if (!email) return 'Укажите e-mail';
    if (!EMAIL_REGEX.test(email)) return 'Проверьте адрес — кажется, в нём опечатка';
    return '';
  },
  message: (value) =>
    cleanText(value).length >= MESSAGE_MIN_LENGTH
      ? ''
      : 'Заполните сообщение — хотя бы пару предложений',
};

const validateForm = (values: FormValues): FormErrors => ({
  topic: validators.topic(values.topic),
  name: validators.name(values.name),
  phone: validators.phone(values.phone),
  email: validators.email(values.email),
  message: validators.message(values.message),
});

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [agreed, setAgreed] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [sentTopic, setSentTopic] = useState<string>(TOPICS[0]);

  const hasErrors = agreeError || Object.values(errors).some(Boolean);

  // Пока пользователь правит поле, его ошибку не показываем —
  // она вернётся на blur или при следующей попытке отправки
  const setValue = (field: FormField, value: string) => {
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

    setSentTopic(cleaned.topic);
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
          <h2 className={styles.title}>Напишите нам</h2>
          <p className={styles.subtitle}>
            Расскажите, чем хотите помочь или о чём спросить. Отвечаем в течение двух рабочих дней.
          </p>

          <div className={styles.topics}>
            <span className={styles.topicsLabel}>Тема обращения</span>
            <div className={styles.chips}>
              {TOPICS.map((topic) => (
                <FilterChip
                  key={topic}
                  type="button"
                  isActive={values.topic === topic}
                  onClick={() => setValue('topic', topic)}
                >
                  {topic}
                </FilterChip>
              ))}
            </div>
            {errors.topic && <span className={styles.errorText}>{errors.topic}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="feedback-name">
                Имя и фамилия
              </label>
              <Input
                id="feedback-name"
                type="text"
                placeholder="Ваше имя"
                maxLength={80}
                value={values.name}
                className={clsx(errors.name && styles.inputError)}
                onChange={(e) => setValue('name', e.target.value)}
                onBlur={() => handleTextBlur('name')}
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="feedback-phone">
                Телефон
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
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="feedback-email">
              E-mail
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
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="feedback-message">
              Сообщение
            </label>
            <Textarea
              id="feedback-message"
              rows={4}
              maxLength={2000}
              placeholder="Напишите, чем можем помочь"
              value={values.message}
              className={clsx(errors.message && styles.inputError)}
              onChange={(e) => setValue('message', e.target.value)}
              onBlur={() => handleTextBlur('message')}
            />
            {errors.message && <span className={styles.errorText}>{errors.message}</span>}
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
              Согласен на обработку персональных данных и с{' '}
              <a href="#" target="_blank" rel="noreferrer">
                политикой конфиденциальности
              </a>
              .
            </span>
          </label>

          <div className={styles.footer}>
            <Button variant="primary" type="submit">
              Отправить
            </Button>
            {hasErrors ? (
              <span className={styles.footerError}>Заполните обязательные поля</span>
            ) : (
              <span className={styles.emailHint}>
                Или напишите на <a href="mailto:info@altyn-muras.kg">info@altyn-muras.kg</a>
              </span>
            )}
          </div>
        </form>
      </Modal>

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        topic={sentTopic}
      />
    </>
  );
}
