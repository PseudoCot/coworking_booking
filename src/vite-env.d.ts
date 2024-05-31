/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_API_PORT: string;
  readonly VITE_API_PATH: string;
  readonly VITE_DEV_PROXY_URL: string;
  readonly VITE_DEV_ALLOW_PRIVATE_PAGES: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
