import { useNavigate } from 'react-router-dom';
import { Button } from '@ui/Button';
import { Modal } from '@ui/Modal';

import styles from './SuccessModal.module.scss';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic?: string;
}

export function SuccessModal({ isOpen, onClose, topic = 'Партнёрство' }: SuccessModalProps) {
  const navigate = useNavigate();

  const handleGoToProjects = () => {
    onClose();
    navigate('/projects');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        {/* Зелёная иконка успеха */}
        <div className={styles.iconCircle}>
          <div className={styles.iconInner} />
        </div>

        {/* Заголовок и описание */}
        <h2 className={styles.title}>Сообщение отправлено</h2>
        <p className={styles.subtitle}>
          Спасибо! Мы получили обращение по теме «{topic}» и ответим на указанный e-mail в течение
          двух рабочих дней.
        </p>

        {/* Кнопки */}
        <div className={styles.actions}>
          <Button variant="primary" onClick={onClose}>
            Хорошо
          </Button>
          <Button variant="outline" onClick={handleGoToProjects}>
            К проектам фонда
          </Button>
        </div>
      </div>
    </Modal>
  );
}
