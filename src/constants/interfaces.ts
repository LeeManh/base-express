import { ParamsDictionary } from 'express-serve-static-core'
import { Request } from 'express'
import { UserVerifyStatus } from './enum'

export interface TokenPayload {
  user_id: string
  verify: UserVerifyStatus
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

export interface IBodyUpdateUser {
  name?: string
  date_of_birth?: string
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}
