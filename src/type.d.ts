export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      DB_USERNAME: number
      DB_PASSWORD: string
      ENV: 'test' | 'dev' | 'prod'
    }
  }
}
