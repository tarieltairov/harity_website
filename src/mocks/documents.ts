import type { FundDocument, ReportsByYear } from '@/types';
import { createLocalized } from './localize';
import type { LocalizedText } from './localize';

const MB = 1024 * 1024;

const financialReportTitle = (year: number): LocalizedText => ({
  ru: `Финансовый отчёт за ${year} год`,
  ky: `${year}-жыл үчүн каржылык отчет`,
  en: `Financial report for ${year}`,
});

const activityReportTitle = (year: number): LocalizedText => ({
  ru: `Отчёт о деятельности за ${year} год`,
  ky: `${year}-жылдагы ишмердүүлүк боюнча отчет`,
  en: `Activity report for ${year}`,
});

/** Блок «Документы фонда» на странице «О фонде» */
export const getFundDocuments = createLocalized<FundDocument[]>([
  {
    title: { ru: 'Отчёт за июль', ky: 'Июль айы үчүн отчет', en: 'July report' },
    type: 'PDF',
    sizeBytes: 1.2 * MB,
    file: '/files/july-report.pdf',
  },
  {
    title: { ru: 'Презентация', ky: 'Презентация', en: 'Presentation' },
    type: 'PPTX',
    sizeBytes: 5 * MB,
    file: '/files/presentation.pptx',
  },
  {
    title: { ru: 'Архив', ky: 'Архив', en: 'Archive' },
    type: 'ZIP',
    sizeBytes: 20 * MB,
    file: '/files/archive.zip',
  },
]);

/** Страница «Отчёты и документы» */
export const getReportsByYear = createLocalized<ReportsByYear[]>([
  {
    year: 2025,
    files: [
      {
        title: financialReportTitle(2025),
        type: 'PDF',
        sizeBytes: 2.4 * MB,
        file: '/files/july-report.pdf',
      },
      {
        title: activityReportTitle(2025),
        type: 'PDF',
        sizeBytes: 3.1 * MB,
        file: '/files/july-report.pdf',
      },
    ],
  },
  {
    year: 2024,
    files: [
      {
        title: financialReportTitle(2024),
        type: 'PDF',
        sizeBytes: 2.1 * MB,
        file: '/files/july-report.pdf',
      },
      {
        title: activityReportTitle(2024),
        type: 'PDF',
        sizeBytes: 2.8 * MB,
        file: '/files/july-report.pdf',
      },
    ],
  },
  {
    year: 2023,
    files: [
      {
        title: financialReportTitle(2023),
        type: 'PDF',
        sizeBytes: 1.9 * MB,
        file: '/files/july-report.pdf',
      },
    ],
  },
]);
