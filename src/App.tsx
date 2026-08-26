import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@components/Layout';
import { ScrollToTop } from '@components/ScrollToTop';
import { Loader } from '@ui/Loader';
import { ROUTES } from '@/config/routes';

import './styles/global.scss';

// Ленивая загрузка страниц: каждая собирается в отдельный чанк
// и грузится только при первом переходе на её роут.
const Home = lazy(() => import('@pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('@pages/About').then((m) => ({ default: m.About })));
const News = lazy(() => import('@pages/News').then((m) => ({ default: m.News })));
const NewsDetails = lazy(() =>
  import('@/pages/NewsDetails').then((m) => ({ default: m.NewsDetails }))
);
const Projects = lazy(() => import('@pages/Projects').then((m) => ({ default: m.Projects })));
const Project = lazy(() => import('@pages/Project').then((m) => ({ default: m.Project })));
const Reports = lazy(() => import('@pages/Reports').then((m) => ({ default: m.Reports })));
const Partners = lazy(() => import('@pages/Partners').then((m) => ({ default: m.Partners })));
const Contacts = lazy(() => import('@pages/Contacts').then((m) => ({ default: m.Contacts })));
const UiKit = lazy(() => import('@pages/UiKit').then((m) => ({ default: m.UiKit })));
const NotFound = lazy(() => import('@pages/NotFound').then((m) => ({ default: m.NotFound })));

function App() {
  return (
    <>
      <ScrollToTop />
      {/* Внешний Suspense — для роутов вне Layout (/ui-kit); страницы внутри
          Layout ловит его собственный Suspense вокруг Outlet */}
      <Suspense fallback={<Loader fullScreen />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.about} element={<About />} />
            <Route path={ROUTES.news} element={<News />} />
            <Route path={ROUTES.newsDetail} element={<NewsDetails />} />
            <Route path={ROUTES.projects} element={<Projects />} />
            <Route path={ROUTES.project} element={<Project />} />
            <Route path={ROUTES.reports} element={<Reports />} />
            <Route path={ROUTES.partners} element={<Partners />} />
            <Route path={ROUTES.contacts} element={<Contacts />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path={ROUTES.uiKit} element={<UiKit />} />
        </Routes>
      </Suspense>
    </>
  );
}
export default App;
