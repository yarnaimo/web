/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: string | undefined
    readonly hostingOrigin: string
    readonly X_API_KEY: string
  }
}
