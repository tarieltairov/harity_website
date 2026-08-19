import { Download } from '@ui/Download';
import { REPORTS_BY_YEAR } from '@/mocks';
import style from './DocumentDownload.module.scss';

export function DocumentDownload() {
  return (
    <div className={style.DocumentDownload}>
      {REPORTS_BY_YEAR.map((yearBlock) => (
        <div key={yearBlock.year} className={style.yearBlock}>
          <h2>{yearBlock.year}</h2>
          <div className={style.aboutDoc_items}>
            {yearBlock.files.map((item) => (
              <Download
                key={item.title}
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
