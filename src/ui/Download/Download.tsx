import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useFormat } from '@/i18n';
import styles from './Download.module.scss';
import type { FC } from 'react';

interface DownloadProps {
  title: string;
  /** Формат файла из контракта: PDF, DOCX, PPTX, ZIP */
  format: string;
  /** Размер в байтах — подпись «2.4 МБ» собирается на текущем языке */
  sizeBytes: number;
  /** Прямая ссылка на скачивание */
  url: string;
  className?: string;
}

export const Download: FC<DownloadProps> = ({ title, format, sizeBytes, url, className }) => {
  const { t } = useTranslation();
  const { formatFileSize } = useFormat();
  const formatLabel = format.toUpperCase();

  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.fileIcon}>{formatLabel}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subTitle}>
          {formatLabel} · {formatFileSize(sizeBytes)}
        </p>
      </div>

      <a href={url} download className={styles.download}>
        {t('common.download')}
      </a>
    </div>
  );
};
