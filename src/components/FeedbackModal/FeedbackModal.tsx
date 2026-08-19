import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@ui/Button';
import { FilterChip } from '@ui/FilterChip';
import { Input, Textarea } from '@ui/form';
import { Modal } from '@ui/Modal';

import styles from './FeedbackModal.module.scss';

const TOPICS = ['Партнёрство', 'Хочу помочь', 'Вопрос от СМИ', 'Другое'] as const;

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string>('Партнёрство');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  // Функция форматирования номера под Кыргызстан (+996 (XXX) XX-XX-XX)
  const formatKGPhone = (value: string) => {
    let digits = value.replace(/\D/g, '');

    if (digits.startsWith('996')) {
      digits = digits.slice(3);
    }

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

  const validate = () => {
    const newErrors = { name: '', phone: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя и фамилию';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
      isValid = false;
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone || phoneDigits.length !== 12) {
      newErrors.phone = 'Введите полный номер (+996 XXX XX-XX-XX)';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Введите e-mail';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Введите корректный e-mail';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Напишите ваше сообщение';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({ name: '', phone: '', email: '', message: '' });
    setErrors({ name: '', phone: '', email: '', message: '' });
    setAgreed(false);
    setSelectedTopic('Партнёрство');
    onClose();
  };

  const handleGoToProjects = () => {
    handleResetAndClose();
    navigate('/projects');
  };

  return (
    <Modal isOpen={isOpen} onClose={handleResetAndClose}>
      {!isSubmitted ? (
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
                <FilterChip
                  key={topic}
                  isActive={selectedTopic === topic}
                  onClick={() => setSelectedTopic(topic)}
                  type="button"
                >
                  {topic}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Имя и фамилия</label>
              <Input
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Телефон</label>
              <Input
                placeholder="+996 (___) __-__-__"
                value={formData.phone}
                onChange={handlePhoneChange}
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>E-mail</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Сообщение</label>
            <Textarea
              placeholder="Напишите, чем можем помочь"
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: '' });
              }}
              rows={4}
            />
            {errors.message && <span className={styles.error}>{errors.message}</span>}
          </div>

          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <span>
              Согласен на обработку персональных данных и с{' '}
              <a href="#" target="_blank" rel="noreferrer">
                политикой конфиденциальности.
              </a>
            </span>
          </label>

          <div className={styles.footer}>
            <Button variant="primary" type="submit" disabled={!agreed}>
              Отправить
            </Button>
            <span className={styles.emailHint}>
              Или напишите на <a href="mailto:info@altyn-muras.kg">info@altyn-muras.kg</a>
            </span>
          </div>
        </form>
      ) : (
        <div className={styles.successState}>
          {/* Жашыл иконка style касиети менен */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#D1F4D9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#2E8B46',
              }}
            />
          </div>

          <h2 className={styles.title}>Сообщение отправлено</h2>
          <p className={styles.subtitle}>
            Спасибо! Мы получили обращение по теме «{selectedTopic}» и ответим на указанный e-mail в
            течение двух рабочих дней.
          </p>

          <div className={styles.successActions}>
            <Button variant="primary" onClick={handleResetAndClose}>
              Хорошо
            </Button>
            <Button variant="outline" onClick={handleGoToProjects}>
              К проектам фонда
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
