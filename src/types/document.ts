export type DocumentFileType = 'PDF' | 'DOCX' | 'PPTX' | 'ZIP';

export interface FundDocument {
  title: string;
  type: DocumentFileType;
  size: string;
  file: string;
}

export interface ReportsByYear {
  year: number;
  files: FundDocument[];
}
