import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useFormat } from '@/i18n';
import styles from './Download.module.scss';
import type { FC } from 'react';

interface DownloadProps {
  title: string;
  type: string;
  /** Размер в байтах — подпись «2.4 МБ» собирается на текущем языке */
  sizeBytes: number;
  file: string;
  className?: string;
}

export const Download: FC<DownloadProps> = ({ title, type, sizeBytes, file, className }) => {
  const { t } = useTranslation();
  const { formatFileSize } = useFormat();
  const typeLabel = type.toUpperCase();

  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.fileIcon}>{typeLabel}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subTitle}>
          {type} · {formatFileSize(sizeBytes)}
        </p>
      </div>

      <a href={file} download className={styles.download}>
        {t('common.download')}
      </a>
    </div>
  );
};
