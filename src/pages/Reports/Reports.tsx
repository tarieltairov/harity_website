import { useTranslation } from 'react-i18next';
import { Container } from '@components/Container';
import { DocumentDownload } from './components';
import style from './Report.module.scss';

export function Reports() {
  const { t } = useTranslation();

  return (
    <Container className="page">
      <h1 className={style.name}>{t('reports.title')}</h1>
      <p className={style.desc}>{t('reports.subtitle')}</p>
      <DocumentDownload />
    </Container>
  );
}
