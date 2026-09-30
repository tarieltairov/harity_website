import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LocaleRouter } from '@components/LocaleRouter';
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
    <LocaleRouter>
      <App />
    </LocaleRouter>
  </StrictMode>
);
