import clsx from 'clsx';
import styles from './CTABanner.module.scss';

interface CTABannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onBtnClick?: () => void;
  className?: string; // на случай, если нужно будет задать внешние отступы
}

export const CTABanner = ({
  title = 'Хотите помочь?',
  description = 'Любая поддержка меняет чью-то жизнь.',
  buttonText = 'Стать партнёром',
  onBtnClick,
  className,
}: CTABannerProps) => {
  return (
    <div className={clsx(styles.ctaBannerContainer, className)}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <button type="button" onClick={onBtnClick} className={styles.button}>
        {buttonText}
      </button>
    </div>
  );
};

CTABanner.displayName = 'CTABanner';
