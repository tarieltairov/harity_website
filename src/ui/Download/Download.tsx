import clsx from 'clsx';
import styles from './Download.module.scss';
import type { FC } from 'react';

interface DownloadProps {
  title: string;
  type: string;
  size: string;
  file: string;
  className?: string;
}

export const Download: FC<DownloadProps> = ({ title, type, size, file, className }) => {
  const typeLabel = type.toUpperCase();

  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.fileIcon}>{typeLabel}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subTitle}>
          {type} · {size}
        </p>
      </div>

      <a href={file} download className={styles.download}>
        Скачать
      </a>
    </div>
  );
};
