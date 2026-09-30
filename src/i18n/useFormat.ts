import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { SearchIndexItem } from '@/types';

const KB = 1024;
const MB = KB * 1024;

// 2.4 → «2.4», 5.0 → «5»
const toOneDecimal = (value: number) => String(Number(value.toFixed(1)));

/**
 * Форматтеры на текущем языке. Данные (моки, а потом API) отдают сырые значения —
 * ISO-даты, размер в байтах, статусы, — подписи собираются здесь.
 */
export function useFormat() {
  const { t } = useTranslation();

  return useMemo(() => {
    /** «2026-07-03» → «3 июля 2026» / «July 3, 2026». Разбираем руками — без сдвига часового пояса */
    const formatDate = (isoDate: string) => {
      const [year, month, day] = isoDate.split('-').map(Number);
      const months = t('date.months', { returnObjects: true });

      return t('date.format', { day, month: months[month - 1], year });
    };

    /** 2516582 → «2.4 МБ», 430080 → «420 КБ» */
    const formatFileSize = (bytes: number) =>
      bytes >= MB
        ? t('fileSize.mb', { value: toOneDecimal(bytes / MB) })
        : t('fileSize.kb', { value: Math.max(1, Math.round(bytes / KB)) });

    /** Мета результата поиска: дата новости, статус проекта или «PDF · 2.4 МБ» */
    const formatSearchMeta = (item: SearchIndexItem) => {
      switch (item.type) {
        case 'news':
          return formatDate(item.publishedAt);
        case 'project':
          return t(`search.projectMeta.${item.status}`);
        case 'document':
          return `${item.format} · ${formatFileSize(item.sizeBytes)}`;
      }
    };

    return { formatDate, formatFileSize, formatSearchMeta };
  }, [t]);
}
