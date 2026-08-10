import clsx from 'clsx';
import styles from './CTABanner.module.scss';

interface CTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  onBtnClick: () => void;
  className?: string;
}
export const CTABanner = ({
  title,
  description,
  buttonText,
  onBtnClick,
  className,
}: CTABannerProps) => {
  return (
    <div className={clsx(styles.ctaBannerContainer, className)}>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <button type="button" onClick={onBtnClick} className={styles.button}>
        {buttonText}
      </button>
    </div>
  );
};
