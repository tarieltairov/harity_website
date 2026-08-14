import clsx from 'clsx';
import styles from './Loader.module.scss';

interface LoaderProps {
  /** Растянуть на весь экран (для загрузки вне Layout) */
  fullScreen?: boolean;
  className?: string;
}

export function Loader({ fullScreen = false, className }: LoaderProps) {
  return (
    <div
      className={clsx(styles.loader, fullScreen && styles.fullScreen, className)}
      role="status"
      aria-label="Загрузка"
    >
      <span className={styles.spinner} />
    </div>
  );
}
