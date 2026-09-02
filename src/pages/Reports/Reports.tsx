import { Container } from '@components/Container';
import { DocumentDownload } from './components';
import style from './Report.module.scss';
export function Reports() {
  return (
    <Container className="page">
      <h5 className={style.breadChump}>Главная / Отчёты</h5>
      <h1 className={style.name}>Отчёты и документы</h1>
      <p className={style.desc}>Финансовая и деятельностная отчётность фонда по годам.</p>
      <DocumentDownload />
    </Container>
  );
}
