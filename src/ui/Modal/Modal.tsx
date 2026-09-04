import type { AnimationEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

// Страховка на случай, если animationend не придёт (например, вкладка в фоне):
// иначе невидимый бэкдроп останется в DOM и заблокирует страницу
const CLOSE_FALLBACK_MS = 400;

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  // Пока проигрывается анимация закрытия, окно остаётся в DOM;
  // размонтируем его по окончании анимации бэкдропа
  const [isMounted, setIsMounted] = useState(isOpen);
  if (isOpen && !isMounted) setIsMounted(true);
  const isClosing = isMounted && !isOpen;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isClosing) return;
    const timer = window.setTimeout(() => setIsMounted(false), CLOSE_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [isClosing]);

  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    // Реагируем только на анимацию самого бэкдропа, не на всплывшие от содержимого
    if (isClosing && e.target === e.currentTarget) setIsMounted(false);
  };

  if (!isMounted) return null;

  return (
    <div
      className={clsx(styles.backdrop, isClosing && styles.closing)}
      onClick={onClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={clsx(styles.modal, className)} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Закрыть">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
