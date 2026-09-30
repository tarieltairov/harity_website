import { useTranslation } from 'react-i18next';
import { Download } from '@ui/Download';
import { useLang } from '@/i18n';
import { getFundDocuments } from '@/mocks';
import style from './AboutDocFund.module.scss';

export function AboutDocFund() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <div className={style.aboutDoc}>
      <h2>{t('about.documents')}</h2>
      <div className={style.aboutDoc_Items}>
        {getFundDocuments(lang).map((item) => (
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
  );
}
