/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Базовый адрес API, например `http://localhost:3000/api/v1` (см. .env.example) */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
