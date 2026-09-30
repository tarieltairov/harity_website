export type DocumentFileType = 'PDF' | 'DOCX' | 'PPTX' | 'ZIP';

export interface FundDocument {
  title: string;
  type: DocumentFileType;
  /** Размер в байтах; подпись «2.4 МБ» собирает useFormat().formatFileSize */
  sizeBytes: number;
  file: string;
}

export interface ReportsByYear {
  year: number;
  files: FundDocument[];
}
