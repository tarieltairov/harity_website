import { Download } from '@ui/Download';
import style from './DocumentDownload.module.scss';
const reportByYear = [
  {
    year: 2025,
    files: [
      {
        title: 'Финансовый отчёт за 2025 год',
        type: 'PDF',
        size: ' 2.4 МБ',
        file: '/files/july-report.pdf',
      },
      {
        title: 'Отчёт о деятельности за 2025 год',
        type: 'PDF',
        size: '3.1 MB',
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
        size: '2.1 MB',
        file: '/files/july-report.pdf',
      },
      {
        title: 'Отчёт о деятельности за 2024 год',
        type: 'PDF',
        size: '2.8 MB',
        file: 'files/july-report.pdf',
      },
    ],
  },
  {
    year: 2023,
    files: [
      {
        title: 'Финансовый отчёт за 2023 год',
        type: 'PDF',
        size: '1.9 MB',
        file: '/files/july-report.pdf',
      },
    ],
  },
];

export function DocumentDownload() {
  return (
    <div className={style.DocumentDownload}>
      {reportByYear.map((yearBlock) => (
        <div key={yearBlock.year} className={style.yearBlock}>
          <h2>{yearBlock.year}</h2>
          <div className={style.aboutDoc_items}>
            {yearBlock.files.map((item, index) => (
              <Download
                key={index}
                title={item.title}
                type={item.type}
                size={item.size}
                file={item.file}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
