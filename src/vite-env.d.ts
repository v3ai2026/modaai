/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_ENABLE_AUTH: string
  readonly VITE_ENABLE_VOICE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
