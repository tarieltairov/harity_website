/** Единый конверт списков (контракт, §1 «Пагинация») */
export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/** Ошибки по полям формы: имя поля → сообщение (контракт, §1 «Ошибки») */
export type FieldErrors = Record<string, string>;

/** Тело ошибки API — `{ error: { code, message, fields? } }` */
export interface ApiErrorBody {
  code: string;
  message: string;
  fields?: FieldErrors;
}
