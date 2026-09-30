import { Download } from '@ui/Download';
import { useLang } from '@/i18n';
import { getReportsByYear } from '@/mocks';
import style from './DocumentDownload.module.scss';

export function DocumentDownload() {
  const lang = useLang();

  return (
    <div className={style.DocumentDownload}>
      {getReportsByYear(lang).map((yearBlock) => (
        <div key={yearBlock.year} className={style.yearBlock}>
          <h2>{yearBlock.year}</h2>
          <div className={style.aboutDoc_items}>
            {yearBlock.files.map((item) => (
              <Download
                key={item.title}
                title={item.title}
                type={item.type}
                sizeBytes={item.sizeBytes}
                file={item.file}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
