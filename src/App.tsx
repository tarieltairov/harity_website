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
import { NewsCard } from './components/NewsCard';


function App() {
  return (
    <>
      <Badge className={'app-badge'}>проекты</Badge>
      <FilterChip className={'app-filterchip'} >кнопки</FilterChip>
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
        <section>
        <NewsCard 
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDuCHmpARbNuxT6jFZthZpkWepNjzd9v17kUVEYHbUkw&s=10'
        category={<Badge className={'app-badge'}>проекты</Badge>}
        date='3 июля 2026'
        title='В Оше открылся новый центр поддержки семей'
        description='Центр будет оказывать психологическую и юридическую помощь семьям региона.'
        button={<Button variant="noborder" >
        Читать далее → 
        </Button>}
        />
        </section>
        </main>
    </>
  );
}

export default App;
