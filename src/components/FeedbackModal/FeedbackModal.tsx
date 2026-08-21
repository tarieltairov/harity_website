import { useMemo, useState } from 'react';

import { Button } from '@ui/Button';
import { Modal } from '@ui/Modal';
import { SuccessModal } from '@components/SuccessModal';

import styles from './FeedbackModal.module.scss';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOPICS = ['Партнёрство', 'Хочу помочь', 'Вопрос от СМИ', 'Другое'] as const;

const NAME_MIN_WORD_LENGTH = 2; // минимальная длина КАЖДОГО слова в ФИО
const MESSAGE_MIN_LENGTH = 10;
const PHONE_DIGITS_LENGTH = 12; // 996 + 9 цифр номера

// Одно "слово" ФИО: буквы (кириллица/латиница), внутри может быть один
// дефис или апостроф между буквами (Айсулуу-Кыз, О'Брайен), но не в начале/конце
const WORD_REGEX = /^[A-Za-zА-Яа-яЁё]+(['ʼ-][A-Za-zА-Яа-яЁё]+)*$/;

// Полноценная структура имя@домен.зона, а не просто наличие "@"
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Убирает пробелы по краям и схлопывает двойные пробелы внутри строки
const cleanText = (value: string) => value.trim().replace(/\s{2,}/g, ' ');

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [agreeError, setAgreeError] = useState(false);

  const [formData, setFormData] = useState({
    topic: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    topic: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  // Показываем ошибку поля только после того, как пользователь его покинул
  // или была попытка отправки — чтобы не пугать красным сразу при открытии формы
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    message: false,
  });

  const formatKGPhone = (value: string) => {
    let digits = value.replace(/\D/g, '');

    if (digits.startsWith('996')) {
      digits = digits.slice(3);
    }

    // Символы сверх лимита просто не вводятся
    digits = digits.slice(0, 9);

    let result = '+996';
    if (digits.length > 0) {
      result += ` (${digits.slice(0, 3)}`;
    }
    if (digits.length >= 4) {
      result += `) ${digits.slice(3, 5)}`;
    }
    if (digits.length >= 6) {
      result += `-${digits.slice(5, 7)}`;
    }
    if (digits.length >= 8) {
      result += `-${digits.slice(7, 9)}`;
    }

    return result;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val || val === '+') {
      setFormData((prev) => ({ ...prev, phone: '' }));
      return;
    }
    setFormData((prev) => ({ ...prev, phone: formatKGPhone(val) }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const handleTopicSelect = (topic: string) => {
    setFormData((prev) => ({ ...prev, topic }));
    if (errors.topic) setErrors((prev) => ({ ...prev, topic: '' }));
  };

  const handleBlurClean = (field: 'name' | 'message') => {
    setFormData((prev) => ({ ...prev, [field]: cleanText(prev[field]) }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // ── Проверки отдельных полей — переиспользуются и в validate(), и в isFormValid ──
  // Важно: каждая функция сама чистит (cleanText) входное значение, а не полагается
  // на то, что onBlur уже отработал — иначе сабмит "в обход" blur может пропустить мусор.
  const nameError = (rawValue: string) => {
    const trimmed = cleanText(rawValue);
    if (!trimmed) return 'Введите имя и фамилию';

    const words = trimmed.split(' ');

    if (words.length < 2) return 'Укажите имя и фамилию (минимум два слова)';

    if (words.some((w) => w.length < NAME_MIN_WORD_LENGTH)) {
      return `Каждое слово должно содержать минимум ${NAME_MIN_WORD_LENGTH} буквы`;
    }

    if (!words.every((w) => WORD_REGEX.test(w))) {
      return 'Имя может содержать только буквы, дефис и апостроф';
    }

    return '';
  };

  const phoneError = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (!value || digits.length !== PHONE_DIGITS_LENGTH) {
      return 'Введите полный номер (+996 XXX XX-XX-XX)';
    }
    return '';
  };

  const emailError = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Введите e-mail';
    if (!EMAIL_REGEX.test(trimmed)) return 'Введите корректный e-mail (например, you@example.com)';
    return '';
  };

  const messageError = (rawValue: string) => {
    const trimmed = cleanText(rawValue);
    if (!trimmed) return 'Напишите ваше сообщение';
    if (trimmed.length < MESSAGE_MIN_LENGTH)
      return `Сообщение должно содержать минимум ${MESSAGE_MIN_LENGTH} символов`;
    return '';
  };

  const topicError = (value: string) => (!value ? 'Выберите тему обращения' : '');

  // ── Общая валидность формы для disabled-состояния кнопки ──
  const isFormValid = useMemo(() => {
    return (
      !topicError(formData.topic) &&
      !nameError(formData.name) &&
      !phoneError(formData.phone) &&
      !emailError(formData.email) &&
      !messageError(formData.message) &&
      agreed
    );
  }, [formData, agreed]);

  const validate = () => {
    const cleanedName = cleanText(formData.name);
    const cleanedMessage = cleanText(formData.message);

    const newErrors = {
      topic: topicError(formData.topic),
      name: nameError(cleanedName),
      phone: phoneError(formData.phone),
      email: emailError(formData.email),
      message: messageError(cleanedMessage),
    };

    setErrors(newErrors);
    setTouched({ name: true, phone: true, email: true, message: true });

    // Синхронизируем очищенные значения обратно в форму,
    // даже если пользователь не проходил через onBlur перед сабмитом
    setFormData((prev) => ({ ...prev, name: cleanedName, message: cleanedMessage }));

    if (!agreed) {
      setAgreeError(true);
    } else {
      setAgreeError(false);
    }

    return Object.values(newErrors).every((err) => !err) && agreed;
  };

  const resetForm = () => {
    setFormData({ topic: '', name: '', phone: '', email: '', message: '' });
    setErrors({ topic: '', name: '', phone: '', email: '', message: '' });
    setTouched({ name: false, phone: false, email: false, message: false });
    setAgreed(false);
    setAgreeError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onClose();
      setIsSuccessOpen(true);
      resetForm();
    }
  };

  const handleCloseAll = () => {
    resetForm();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleCloseAll}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.header}>
            <h2 className={styles.title}>Напишите нам</h2>
            <p className={styles.subtitle}>
              Расскажите, чем хотите помочь или о чём спросить. Отвечаем в течение двух рабочих
              дней.
            </p>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>ТЕМА ОБРАЩЕНИЯ</label>
            <div className={styles.chips}>
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  className={`${styles.chip} ${formData.topic === topic ? styles.chipActive : ''}`}
                  onClick={() => handleTopicSelect(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
            {errors.topic && <span className={styles.errorText}>{errors.topic}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>ИМЯ И ФАМИЛИЯ</label>
              <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                maxLength={80}
                className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ''}`}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                onBlur={() => {
                  handleBlurClean('name');
                  setErrors((prev) => ({ ...prev, name: nameError(formData.name) }));
                }}
              />
              {touched.name && errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>ТЕЛЕФОН</label>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="+996 (___) __-__-__"
                value={formData.phone}
                className={`${styles.input} ${touched.phone && errors.phone ? styles.inputError : ''}`}
                onChange={handlePhoneChange}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, phone: true }));
                  setErrors((prev) => ({ ...prev, phone: phoneError(formData.phone) }));
                }}
              />
              {touched.phone && errors.phone && (
                <span className={styles.errorText}>{errors.phone}</span>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>E-MAIL</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ''}`}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              onBlur={() => {
                setTouched((prev) => ({ ...prev, email: true }));
                setErrors((prev) => ({ ...prev, email: emailError(formData.email) }));
              }}
            />
            {touched.email && errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>СООБЩЕНИЕ</label>
            <textarea
              placeholder="Напишите, чем можем помочь"
              value={formData.message}
              maxLength={2000}
              className={`${styles.textarea} ${touched.message && errors.message ? styles.inputError : ''}`}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
              }}
              onBlur={() => {
                handleBlurClean('message');
                setErrors((prev) => ({
                  ...prev,
                  message: messageError(formData.message),
                }));
              }}
              rows={4}
            />
            {touched.message && errors.message && (
              <span className={styles.errorText}>{errors.message}</span>
            )}
          </div>

          <div className={styles.checkboxContainer}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (e.target.checked) setAgreeError(false);
                }}
              />
              <span>
                Согласен на обработку персональных данных и с{' '}
                <a href="#" target="_blank" rel="noreferrer">
                  политикой конфиденциальности.
                </a>
              </span>
            </label>
            {agreeError && (
              <span className={styles.errorText}>Необходимо согласие с политикой</span>
            )}
          </div>

          <div className={styles.footer}>
            <Button variant="primary" type="submit" disabled={!isFormValid}>
              Отправить
            </Button>
            <span className={styles.emailHint}>
              Или напишите на <a href="mailto:info@altyn-muras.kg">info@altyn-muras.kg</a>
            </span>
          </div>
        </form>
      </Modal>

      <SuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
    </>
  );
}
