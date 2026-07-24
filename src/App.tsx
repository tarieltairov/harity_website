import { Routes, Route } from 'react-router-dom';
import { Header } from '@components/Header';
import { Home } from '@pages/Home';
import { About } from '@pages/About';
import { News } from '@pages/News';
import { Projects } from '@pages/Projects';
import { Responses } from '@pages/Responses';
import { Partners } from '@pages/Partners';
import { Contacts } from '@pages/Contacts';
import { Footer } from './components/Footer';

import './styles/global.scss';
import { Button } from './ui/Button/';
import { Badge } from './ui/Badge';
import { FilterChip } from './ui/FilterChip/FilterChip';
import { NewsCard } from './components/NewsCard';

import { Input, Textarea, SearchField } from './ui/form';
import { Pagination } from './ui/Pagination';
import { StatsBlock } from './components/StatBlock';
import { CTABanner } from './ui/CTABanner';

function App() {
  return (
    <>
      <Badge className={'app-badge'}>проекты</Badge>
      <FilterChip className={'app-filterchip'}>кнопки</FilterChip>
      {/* 2. Временный тестовый контейнер для проверки инпутов из макета */}

      <Header />
      <main>
        <Button variant="primary">Наши проекты</Button>
        <Button variant="secondary">Помочь фонду</Button>
        <Button variant="ghost">Написать нам</Button>
        <Button variant="outline">Показать еще</Button>
        <Button variant="noborder">Читать далее →</Button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/responses" element={<Responses />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
        <StatsBlock />
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
        {/* 2. Временный тестовый контейнер для проверки инпутов из макета */}
        <div
          style={{
            padding: '20px',
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            margin: '20px auto',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            <Input placeholder="Ваше имя" />
            <Input type="email" placeholder="Email" />
          </div>
          <SearchField placeholder="Поиск по новостям" />
          <Textarea placeholder="Сообщение" />
        </div>
        <div>
          <Pagination
            totalPages={3}
            currentPage={1}
            onPageChange={(page: number) => console.log(page)}
          />
        </div>
        <section>
          <NewsCard
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDuCHmpARbNuxT6jFZthZpkWepNjzd9v17kUVEYHbUkw&s=10"
            badgetitle="проекты"
            date="3 июля 2026"
            title="В Оше открылся новый центр поддержки семей"
            description="Центр будет оказывать психологическую и юридическую помощь семьям региона."
          />
        </section>

        <div
          style={{
            padding: '32px',
            maxWidth: '500px',
            margin: '20px auto',
            background: '#fff',
            borderRadius: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 'bold' }}>CTABanner</h3>
          <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '14px' }}>
            Тёплая плашка-призыв с кнопкой
          </p>

          {/* Вызываем компонент с правильным именем пропа: onBtnClick */}
          <CTABanner
            title="Хотите помочь?"
            description="Любая поддержка меняет чью-то жизнь."
            buttonText="Стать партнёром"
            onBtnClick={() => console.log('Клик по кнопке баннера')}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
export default App;
