import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '@components/Header';
import { Home } from '@pages/Home';
import { About } from '@pages/About';
import { News } from '@pages/News';
import { Projects } from '@pages/Projects';
import { Responses } from '@pages/Responses';
import { Partners } from '@pages/Partners';
import { Contacts } from '@pages/Contacts';
import { UiKit } from '@pages/UiKit';
import { NotFound } from '@pages/NotFound';
import { Footer } from './components/Footer';

import './styles/global.scss';

function App() {
  const { pathname } = useLocation();
  const isUiKit = pathname === '/ui-kit';

  return (
    <>
      {!isUiKit && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/responses" element={<Responses />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/ui-kit" element={<UiKit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isUiKit && <Footer />}
    </>
  );
}
export default App;
