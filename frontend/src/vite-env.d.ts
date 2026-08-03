/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/vue" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_R2_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
