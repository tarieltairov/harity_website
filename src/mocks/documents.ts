import type { FundDocument, ReportsByYear } from '@/types';
import { mb } from '@/utils/bytes';
import { createLocalized } from './localize';
import type { LocalizedText } from './localize';

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
    sizeBytes: mb(1.2),
    file: '/files/july-report.pdf',
  },
  {
    title: { ru: 'Презентация', ky: 'Презентация', en: 'Presentation' },
    type: 'PPTX',
    sizeBytes: mb(5),
    file: '/files/presentation.pptx',
  },
  {
    title: { ru: 'Архив', ky: 'Архив', en: 'Archive' },
    type: 'ZIP',
    sizeBytes: mb(20),
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
        sizeBytes: mb(2.4),
        file: '/files/july-report.pdf',
      },
      {
        title: activityReportTitle(2025),
        type: 'PDF',
        sizeBytes: mb(3.1),
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
        sizeBytes: mb(2.1),
        file: '/files/july-report.pdf',
      },
      {
        title: activityReportTitle(2024),
        type: 'PDF',
        sizeBytes: mb(2.8),
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
        sizeBytes: mb(1.9),
        file: '/files/july-report.pdf',
      },
    ],
  },
]);
