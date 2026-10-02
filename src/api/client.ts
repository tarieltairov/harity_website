import type { ApiErrorBody, FieldErrors } from '@/types';

/**
 * Базовый адрес API. В dev — локальный бэк (`../backend`, `yarn start:dev`),
 * на проде задаётся переменной VITE_API_URL (см. .env.example).
 */
export const API_BASE_URL = (
  import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1'
).replace(/\/+$/, '');

type QueryValue = string | number | boolean | null | undefined;

export type QueryParams = Record<string, QueryValue>;

/**
 * Ошибка ответа API: HTTP-статус и конверт `{ code, message, fields? }` из контракта.
 * Сетевой сбой (сервер недоступен) — status 0, code NETWORK_ERROR.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  /** Ошибки по полям формы — только у 400 VALIDATION_ERROR */
  readonly fields?: FieldErrors;

  constructor(status: number, body: ApiErrorBody) {
    super(body.message);
    this.name = 'ApiError';
    this.status = status;
    this.code = body.code;
    this.fields = body.fields;
  }

  get isNotFound() {
    return this.status === 404;
  }

  get isValidation() {
    return this.status === 400;
  }
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;

export const isNotFoundError = (error: unknown) => isApiError(error) && error.isNotFound;

interface RequestOptions {
  method?: 'GET' | 'POST';
  query?: QueryParams;
  body?: unknown;
  /** Отмена запроса при смене страницы или фильтра — пробрасывает react-query */
  signal?: AbortSignal;
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as ApiErrorBody).code === 'string' &&
    typeof (value as ApiErrorBody).message === 'string'
  );
}

function extractErrorBody(payload: unknown): ApiErrorBody | undefined {
  if (typeof payload !== 'object' || payload === null) return undefined;

  const { error } = payload as { error?: unknown };
  return isApiErrorBody(error) ? error : undefined;
}

function buildUrl(path: string, query?: QueryParams): URL {
  // База может быть и относительной («/api/v1»), поэтому резолвим от origin страницы
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  return url;
}

/** Запрос к API: JSON туда и обратно, любая неудача — ApiError по конверту из контракта */
export async function request<T>(
  path: string,
  { method = 'GET', query, body, signal }: RequestOptions = {}
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(buildUrl(path, query), {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (error) {
    // Отменённый запрос — не ошибка API, react-query обрабатывает его сам
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    throw new ApiError(0, { code: 'NETWORK_ERROR', message: 'Сервер недоступен' });
  }

  if (!response.ok) {
    const payload: unknown = await response.json().catch(() => undefined);

    throw new ApiError(
      response.status,
      extractErrorBody(payload) ?? {
        code: `HTTP_${response.status}`,
        message: response.statusText || 'Ошибка запроса',
      }
    );
  }

  return (await response.json()) as T;
}
