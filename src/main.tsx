import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { LocaleRouter } from '@components/LocaleRouter';
import { queryClient } from '@/api';
import { initI18n, resolveLangFromUrl } from '@/i18n';
import App from './App.tsx';

// До первого рендера: добавляем языковой префикс в URL (если его нет),
// поднимаем i18next сразу на этом языке и объявляем язык документа —
// иначе первый кадр (и скринридер) видят lang из index.html
const initialLang = resolveLangFromUrl();
void initI18n(initialLang);
document.documentElement.lang = initialLang;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Кеш запросов к API общий на всё приложение, см. src/api/queryClient.ts */}
    <QueryClientProvider client={queryClient}>
      <LocaleRouter>
        <App />
      </LocaleRouter>
    </QueryClientProvider>
  </StrictMode>
);
