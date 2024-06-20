import { User } from './models/schemas/User.schema'
import { Request } from 'express'

export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      DB_USERNAME: number
      DB_PASSWORD: string
      DB_NAME: string
      ACCESS_TOKEN_SECRET: string
      ACCESS_TOKEN_EXPIRES_IN: string
      REFRESH_TOKEN_SECRET: string
      REFRESH_TOKEN_EXPIRES_IN: string
      ENV: 'test' | 'dev' | 'prod'
    }
  }
}

declare module 'express' {
  interface Request {
    user?: User
  }
}
