import { Download } from '@ui/Download';
import { FUND_DOCUMENTS } from '@/mocks';
import style from './AboutDocFund.module.scss';

export function AboutDocFund() {
  return (
    <div className={style.aboutDoc}>
      <h2>Документы фонда</h2>
      <div className={style.aboutDoc_Items}>
        {FUND_DOCUMENTS.map((item) => (
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
  );
}
