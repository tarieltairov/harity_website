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
import { Badge } from './ui/Badge';
import { FilterChip } from './ui/FilterChip/FilterChip';
import { Input, Textarea, SearchField } from './ui/form';
import { Pagination } from './ui/Pagination';

function App() {
  return (
    <>
      <Badge className={'app-badge'}>проекты</Badge>
      <FilterChip className={'app-filterchip'} >кнопки</FilterChip>
      {/* 2. Временный тестовый контейнер для проверки инпутов из макета */}
    
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
 {/* 2. Временный тестовый контейнер для проверки инпутов из макета */}
      <div style={{ padding: '20px', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px', margin: '20px auto', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Input placeholder="Ваше имя" />
          <Input type="email" placeholder="Email" />
        </div>
        <SearchField placeholder="Поиск по новостям" />
        <Textarea placeholder="Сообщение" />
           </div>
           <div>
        <Pagination totalPages={3} currentPage={1} onPageChange={(page: number) => console.log(page)} />
      </div>

      </main>
    </>
  );
}
export default App;
