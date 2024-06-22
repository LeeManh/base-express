import { ParamsDictionary } from 'express-serve-static-core'
import { Request } from 'express'

export interface TokenPayload {
  user_id: string
}

export type RequestBody<T> = Request<ParamsDictionary, any, T>

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

export interface IBodyResetPassword {
  password: string
  user_id: string
}
