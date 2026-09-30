import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/config/routes';
import { Button } from '@ui/Button';
import { Modal } from '@ui/Modal';

import styles from './SuccessModal.module.scss';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Подпись темы на текущем языке; по умолчанию — «Партнёрство» */
  topic?: string;
}

export function SuccessModal({ isOpen, onClose, topic }: SuccessModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoToProjects = () => {
    onClose();
    navigate(ROUTES.projects);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        {/* Зелёная иконка успеха */}
        <div className={styles.iconCircle}>
          <div className={styles.iconInner} />
        </div>

        {/* Заголовок и описание */}
        <h2 className={styles.title}>{t('success.title')}</h2>
        <p className={styles.subtitle}>
          {t('success.text', { topic: topic ?? t('feedback.topics.partnership') })}
        </p>

        {/* Кнопки */}
        <div className={styles.actions}>
          <Button variant="primary" onClick={onClose}>
            {t('success.ok')}
          </Button>
          <Button variant="outline" onClick={handleGoToProjects}>
            {t('success.toProjects')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
