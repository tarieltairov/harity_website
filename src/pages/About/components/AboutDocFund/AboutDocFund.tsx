import { Download } from '@ui/Download';
import style from './AboutDoc.module.scss';

export function AboutDoc() {
  return (
    <div className={style.AboutDoc}>
      <h2>Документы фонда</h2>
      <div className={style.AboutDoc_Items}>
        <Download title="Устав фонда" type="PDF" size="12 KB" file="/files/sample.pdf" />
        <Download
          title="Свидетельство о регистрации"
          type="PDF"
          size="13 KB"
          file="/files/sample.pdf"
        />
        <Download title="Политика прозрачности" type="PDF" size="16 KB" file="/files/sample.pdf" />
      </div>
    </div>
  );
}
