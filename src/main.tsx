import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LocaleRouter } from '@components/LocaleRouter';
import { initI18n, resolveLangFromUrl } from '@/i18n';
import App from './App.tsx';

// До первого рендера: добавляем языковой префикс в URL (если его нет)
// и поднимаем i18next сразу на этом языке
const initialLang = resolveLangFromUrl();
void initI18n(initialLang);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleRouter initialLang={initialLang}>
      <App />
    </LocaleRouter>
  </StrictMode>
);
