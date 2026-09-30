import type { ru } from './ru';

// Формы `_few` / `_many` есть только в русском — в ky/en их можно не заводить
type RuOnlyPluralKey = `${string}_few` | `${string}_many`;

type DictionaryShape<T> = {
  [K in keyof T as K extends RuOnlyPluralKey ? never : K]: T[K] extends string
    ? string
    : T[K] extends string[]
      ? string[]
      : DictionaryShape<T[K]>;
} & {
  [K in keyof T as K extends RuOnlyPluralKey ? K : never]?: string;
};

/** Структура словаря по образцу русского: пропущенный ключ в ky/en — ошибка типов */
export type Dictionary = DictionaryShape<typeof ru>;

/** Ключ ошибки валидации формы «Написать нам» — подпись в `feedback.errors` */
export type FeedbackErrorKey = keyof Dictionary['feedback']['errors'];
