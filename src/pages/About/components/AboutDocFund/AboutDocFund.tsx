import { Download } from '@ui/Download';
import style from './AboutDocFund.module.scss';

const files = [
  {
    title: 'Отчёт за июль',
    type: 'PDF',
    size: '1.2 MB',
    file: '/files/july-report.pdf',
  },
  {
    title: 'Презентация',
    type: 'PPTX',
    size: '5 MB',
    file: '/files/presentation.pptx',
  },
  {
    title: 'Архив',
    type: 'ZIP',
    size: '20 MB',
    file: '/files/archive.zip',
  },
];
export function AboutDocFund() {
  return (
    <div className={style.aboutDoc}>
      <h2>Документы фонда</h2>
      <div className={style.aboutDoc_Items}>
        {files.map((item, index) => (
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
  );
}
