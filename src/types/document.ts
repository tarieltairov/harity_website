export type DocumentFormat = 'PDF' | 'DOCX' | 'PPTX' | 'ZIP';

export interface DocumentFile {
  id: number;
  title: string;
  format: DocumentFormat;
  /** Размер в байтах; подпись «2.4 МБ» собирает useFormat().formatFileSize */
  sizeBytes: number;
  /** Прямая ссылка на скачивание (абсолютный URL) */
  url: string;
}

export interface ReportsByYear {
  year: number;
  files: DocumentFile[];
}
