import 'i18next';
import type { ru } from './locales/ru';

// Ключи t() проверяются по русскому словарю: опечатка в ключе — ошибка типов
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof ru;
    };
  }
}
