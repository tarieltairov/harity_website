import { useMutation } from '@tanstack/react-query';
import { request } from './client';
import type { CreatedResponse } from './types';

/**
 * Значения `topic` из контракта: бэк принимает подписи как есть и проверяет по этому
 * списку (`backend/src/feedback/feedback.rules.ts`). Ключи — подписи в словаре `feedback.topics`,
 * поэтому на любом языке интерфейса на сервер уходит одно и то же значение.
 */
export const FEEDBACK_TOPIC_VALUES = {
  partnership: 'Партнёрство',
  help: 'Хочу помочь',
  media: 'Вопрос от СМИ',
  other: 'Другое',
} as const;

export type FeedbackTopic = keyof typeof FEEDBACK_TOPIC_VALUES;

export interface FeedbackPayload {
  topic: string;
  name: string;
  /** Нормализованный номер КР: `+996XXXXXXXXX` */
  phone: string;
  email: string;
  message: string;
}

/** POST /feedback — модалка «Написать нам» (экран 12). 400 с `fields` — ошибки под полями */
export function useSendFeedback() {
  return useMutation({
    mutationFn: (payload: FeedbackPayload) =>
      request<CreatedResponse>('/feedback', { method: 'POST', body: payload }),
  });
}

/** POST /subscriptions — подписка в футере (экран 14); повторный e-mail — тоже успех */
export function useSubscribe() {
  return useMutation({
    mutationFn: (email: string) =>
      request<CreatedResponse>('/subscriptions', { method: 'POST', body: { email } }),
  });
}
