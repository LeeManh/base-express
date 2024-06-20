import { ParamsDictionary } from 'express-serve-static-core'
import { Request } from 'express'

export interface TokenPayload {
  user_id: string
}

/* --------------------------------- Express -------------------------------- */
export type RequestBody<T> = Request<ParamsDictionary, any, T>

/* ---------------------------------- Auth ---------------------------------- */
export interface IBodyRegisterUser {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface IBodyLoginUser {
  email: string
  password: string
}
