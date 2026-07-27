import styles from './DownloadFile.module.scss';
import type { FC } from 'react';

interface DownloadProps {
  title: string;
  size: string;
  file: string;
  className?: string;
}

export const Download: FC<DownloadProps> = ({ title, size, file }) => {
  return (
    <div className={styles.card}>
      <div>
        <h3>{title}</h3>
        <p>PDF · {size}</p>
      </div>
      <a href={file} download className={styles.download}>
        Cкачать
      </a>
    </div>
  );
};
