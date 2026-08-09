import { Routes, Route } from 'react-router-dom';
import { Layout } from '@components/Layout';
import { Home } from '@pages/Home';
import { About } from '@pages/About';
import { News } from '@pages/News';
import { Projects } from '@pages/Projects';
import { Reports } from '@pages/Reports';
import { Partners } from '@pages/Partners';
import { Contacts } from '@pages/Contacts';
import { UiKit } from '@pages/UiKit';
import { NotFound } from '@pages/NotFound';
import { ROUTES } from '@/config/routes';

import './styles/global.scss';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.about} element={<About />} />
        <Route path={ROUTES.news} element={<News />} />
        <Route path={ROUTES.projects} element={<Projects />} />
        <Route path={ROUTES.reports} element={<Reports />} />
        <Route path={ROUTES.partners} element={<Partners />} />
        <Route path={ROUTES.contacts} element={<Contacts />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path={ROUTES.uiKit} element={<UiKit />} />
    </Routes>
  );
}
export default App;
