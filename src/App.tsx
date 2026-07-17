import { Routes, Route } from 'react-router-dom';
import { Header } from '@components/Header';
import { Home } from '@pages/Home';
import { About } from '@pages/About';
import { News } from '@pages/News';
import { Projects } from '@pages/Projects';
import { Responses } from '@pages/Responses';
import { Partners } from '@pages/Partners';
import { Contacts } from '@pages/Contacts';

import './styles/global.scss';
import { Button } from './ui/Button/';

function App() {
  return (
    <>
      <Header />
      <main>
        <Button variant="primary" >
        Наши проекты
        </Button>
        <Button variant="secondary">
          Помочь фонду
        </Button>
        <Button variant="ghost" >
          Написать нам
        </Button>
        <Button variant="outline" >
          Показать еще
        </Button>
        <Button variant="noborder" >
          Читать далее → 
        </Button>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/news' element={<News />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/responses' element={<Responses />} />
          <Route path='/partners' element={<Partners />} />
          <Route path='/contacts' element={<Contacts />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
