import { ParamsDictionary } from 'express-serve-static-core'
import { Request } from 'express'
import { MediaType, TweetAudience, TweetType, UserVerifyStatus } from './enum'

export interface TokenPayload {
  user_id: string
  verify: UserVerifyStatus
}

export interface Media {
  url: string
  type: MediaType // video, image
}

export type RequestData<P = ParamsDictionary, T = any> = Request<P, any, T>

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

export interface IBodyFollowUser {
  followed_user_id: string
}

export interface IBodyChangePassword {
  old_password: string
  password: string
  confirm_password: string
}

export interface IResOauthGoogleToken {
  access_token: string
  refresh_token: string
  id_token: string
}

export interface IGoogleProfile {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}

export interface TweetRequestBody {
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | string //  chỉ null khi tweet gốc, không thì là tweet_id cha dạng string
  hashtags: string[] // tên của hashtag dạng ['javascript', 'reactjs']
  mentions: string[] // user_id[]
  medias: Media[]
}

export interface BookmarkTweetReqBody {
  tweet_id: string
}

export interface LikeTweetReqBody {
  tweet_id: string
}
