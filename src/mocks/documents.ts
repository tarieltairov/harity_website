import type { FundDocument, ReportsByYear } from '@/types';

/** Блок «Документы фонда» на странице «О фонде» */
export const FUND_DOCUMENTS: FundDocument[] = [
  { title: 'Отчёт за июль', type: 'PDF', size: '1.2 МБ', file: '/files/july-report.pdf' },
  { title: 'Презентация', type: 'PPTX', size: '5 МБ', file: '/files/presentation.pptx' },
  { title: 'Архив', type: 'ZIP', size: '20 МБ', file: '/files/archive.zip' },
];

/** Страница «Отчёты и документы» */
export const REPORTS_BY_YEAR: ReportsByYear[] = [
  {
    year: 2025,
    files: [
      {
        title: 'Финансовый отчёт за 2025 год',
        type: 'PDF',
        size: '2.4 МБ',
        file: '/files/july-report.pdf',
      },
      {
        title: 'Отчёт о деятельности за 2025 год',
        type: 'PDF',
        size: '3.1 МБ',
        file: '/files/july-report.pdf',
      },
    ],
  },
  {
    year: 2024,
    files: [
      {
        title: 'Финансовый отчёт за 2024 год',
        type: 'PDF',
        size: '2.1 МБ',
        file: '/files/july-report.pdf',
      },
      {
        title: 'Отчёт о деятельности за 2024 год',
        type: 'PDF',
        size: '2.8 МБ',
        file: '/files/july-report.pdf',
      },
    ],
  },
  {
    year: 2023,
    files: [
      {
        title: 'Финансовый отчёт за 2023 год',
        type: 'PDF',
        size: '1.9 МБ',
        file: '/files/july-report.pdf',
      },
    ],
  },
];
