import { TokenPayload } from './constants/interfaces'
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
      EMAIL_VERIFICATION_SECRET: string
      EMAIL_VERIFICATION_EXPIRES_IN: string
      ENV: 'test' | 'dev' | 'prod'
    }
  }
}

declare module 'express' {
  interface Request {
    decoded_authorization?: TokenPayload
    decoded_email_verification?: TokenPayload
  }
}
