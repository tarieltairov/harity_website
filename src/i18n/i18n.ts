import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANG, LANGS } from './config';
import type { Lang } from './config';
import { en } from './locales/en';
import { ky } from './locales/ky';
import { ru } from './locales/ru';

// Словари небольшие — грузим все сразу, без отдельных чанков и мигания текста
const resources = {
  ru: { translation: ru },
  ky: { translation: ky },
  en: { translation: en },
};

export function initI18n(lang: Lang) {
  return i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    fallbackLng: DEFAULT_LANG,
    supportedLngs: LANGS,
    // Ресурсы уже в памяти — инициализация синхронная, первый рендер сразу на нужном языке
    initAsync: false,
    // React сам экранирует строки
    interpolation: { escapeValue: false },
  });
}
