import { Download } from '@ui/Download';
import { Loader } from '@ui/Loader';
import { useReports } from '@/api';
import style from './DocumentDownload.module.scss';

export function DocumentDownload() {
  const { data: reports } = useReports();

  if (!reports) {
    return <Loader />;
  }

  return (
    <div className={style.DocumentDownload}>
      {reports.map((yearBlock) => (
        <div key={yearBlock.year} className={style.yearBlock}>
          <h2>{yearBlock.year}</h2>
          <div className={style.aboutDoc_items}>
            {yearBlock.files.map((item) => (
              <Download
                key={item.id}
                title={item.title}
                format={item.format}
                sizeBytes={item.sizeBytes}
                url={item.url}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
