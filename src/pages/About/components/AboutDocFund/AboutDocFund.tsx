import { useTranslation } from 'react-i18next';
import { Download } from '@ui/Download';
import { Loader } from '@ui/Loader';
import { useFundDocuments } from '@/api';
import style from './AboutDocFund.module.scss';

export function AboutDocFund() {
  const { t } = useTranslation();
  const { data: documents } = useFundDocuments();

  return (
    <div className={style.aboutDoc}>
      <h2>{t('about.documents')}</h2>
      {documents ? (
        <div className={style.aboutDoc_Items}>
          {documents.map((item) => (
            <Download
              key={item.id}
              title={item.title}
              format={item.format}
              sizeBytes={item.sizeBytes}
              url={item.url}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
