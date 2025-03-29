// / <reference types="vite/client" />
interface ImportMetaEnv {
  // vite built-in variables
  readonly MODE: string
  readonly PROD: boolean
  readonly DEV: boolean

  // user defined enviroment variables
  readonly VITE_APP_API_URL: string
  readonly VITE_APP_GOOGLE_MAP_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
