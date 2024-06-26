import { UserVerifyStatus } from './../constants/enum'
import { User } from '~/models/schemas/User.schema'
import {
  IBodyLoginUser,
  IBodyRegisterUser,
  IBodyResetPassword,
  IGoogleProfile,
  IResOauthGoogleToken
} from './../constants/interfaces'
import databaseService from './database.service'
import { comparePassword, hashPassword } from '~/utils/password'
import { signToken } from '~/utils/jwt'
import { ErrorWithStatus } from '~/models/Error'
import { USERS_MESSAGES } from '~/constants/message'
import { HttpStatus } from '~/constants/httpStatus'
import { ObjectId } from 'mongodb'
import userServices from './user.services'
import axios from 'axios'

export class AuthServices {
  private signAccessToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: { user_id, verify },
      secretOrPrivateKey: process.env.ACCESS_TOKEN_SECRET,
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    })
  }

  private signRefreshToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: { user_id },
      secretOrPrivateKey: process.env.REFRESH_TOKEN_SECRET,
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    })
  }

  private signEmailVerificationToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: { user_id },
      secretOrPrivateKey: process.env.EMAIL_VERIFICATION_SECRET,
      options: { expiresIn: process.env.EMAIL_VERIFICATION_EXPIRES_IN }
    })
  }

  private signForgotPasswordToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: { user_id },
      secretOrPrivateKey: process.env.FORGOT_PASSWORD_SECRET,
      options: { expiresIn: process.env.FORGOT_PASSWORD_EXPIRES_IN }
    })
  }

  public async signTokens({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken({ user_id, verify }),
      this.signRefreshToken({ user_id, verify })
    ])

    // save refresh token to database
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: { refresh_token },
        $currentDate: { updated_at: true }
      }
    )

    return { access_token, refresh_token }
  }

  public async register(body: IBodyRegisterUser) {
    const user_id = new ObjectId()

    const email_verify_token = await this.signEmailVerificationToken({
      user_id: user_id.toString(),
      verify: UserVerifyStatus.Unverified
    })

    await databaseService.users.insertOne(
      new User({
        ...body,
        _id: user_id,
        email_verify_token,
        date_of_birth: new Date(body.date_of_birth),
        password: await hashPassword(body.password)
      })
    )

    // create tokens
    const { access_token, refresh_token } = await this.signTokens({
      user_id: user_id.toString(),
      verify: UserVerifyStatus.Unverified
    })

    return { access_token, refresh_token }
  }

  public async login(body: IBodyLoginUser) {
    const user = await userServices.findByEmail(body.email)
    if (!user) {
      throw new ErrorWithStatus({ message: USERS_MESSAGES.EMAIL_NOT_REGISTER, status: HttpStatus.UNAUTHORIZED })
    }

    // compare password
    const isValidPassword = await comparePassword(body.password, user.password)
    if (!isValidPassword) {
      throw new ErrorWithStatus({ message: USERS_MESSAGES.PASSWORD_IS_INCORRECT, status: HttpStatus.UNAUTHORIZED })
    }

    // create tokens
    const { access_token, refresh_token } = await this.signTokens({
      user_id: user._id.toString(),
      verify: user.verify
    })

    return { access_token, refresh_token }
  }

  async logout(user_id: string) {
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: { refresh_token: '' },
        $currentDate: { updated_at: true }
      }
    )
  }

  async verifyEmail(user_id: string) {
    const user = await userServices.findById(user_id)

    // check if email is already verified
    if (!user.email_verify_token) {
      throw new ErrorWithStatus({ message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED, status: HttpStatus.BAD_REQUEST })
    }

    // update user
    await databaseService.users.updateOne(
      {
        _id: user._id
      },
      {
        $set: { email_verify_token: '', verify: UserVerifyStatus.Verified },
        $currentDate: { updated_at: true }
      }
    )

    const { access_token, refresh_token } = await this.signTokens({
      user_id: user._id.toString(),
      verify: UserVerifyStatus.Verified
    })

    return { access_token, refresh_token }
  }

  async resendVerifyEmail(user_id: string) {
    const user = await userServices.findById(user_id)

    // check if email is already verified
    if (user.verify === UserVerifyStatus.Verified) {
      throw new ErrorWithStatus({ message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED, status: HttpStatus.BAD_REQUEST })
    }

    // create new email verification token
    const email_verify_token = await this.signEmailVerificationToken({
      user_id: user._id.toString(),
      verify: user.verify
    })

    // update user
    await databaseService.users.updateOne(
      {
        _id: user._id
      },
      {
        $set: { email_verify_token },
        $currentDate: { updated_at: true }
      }
    )
  }

  async forgotPassword(user_id: string) {
    const user = await userServices.findById(user_id)

    // create forgot password token
    const forgot_password_token = await this.signForgotPasswordToken({
      user_id: user_id.toString(),
      verify: user.verify
    })

    // update user
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: { forgot_password_token },
        $currentDate: { updated_at: true }
      }
    )
  }

  async resetPassword({ user_id, password }: IBodyResetPassword) {
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: { password: await hashPassword(password), forgot_password_token: '' },
        $currentDate: { updated_at: true }
      }
    )
  }

  private async getOauthGoogleToken(code: string) {
    const body = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code'
    }

    const data = await axios.post<IResOauthGoogleToken>('https://oauth2.googleapis.com/token', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    return data?.data
  }

  private async getGoogleUserInfo(access_token: string, id_token: string) {
    const { data } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      params: {
        access_token,
        alt: 'json'
      },
      headers: {
        Authorization: `Bearer ${id_token}`
      }
    })

    return data as IGoogleProfile
  }

  async loginGoogle(code: string) {
    const { access_token, refresh_token, id_token } = await this.getOauthGoogleToken(code)
    const userInfor = await this.getGoogleUserInfo(access_token, id_token)

    if (!userInfor.email) {
      throw new ErrorWithStatus({ message: USERS_MESSAGES.GMAIL_NOT_VERIFIED, status: HttpStatus.BAD_REQUEST })
    }

    // check if user already exists
    const user = await userServices.findByEmail(userInfor.email)

    // if user exists, create tokens
    if (user) {
      const { access_token, refresh_token } = await this.signTokens({
        user_id: user._id.toString(),
        verify: user.verify
      })

      return { access_token, refresh_token, verify: user.verify }
    }
    // create new user if not exists
    else {
      const password = await hashPassword(Math.random().toString(36).slice(-8))

      const { access_token, refresh_token } = await this.register({
        name: userInfor.name,
        email: userInfor.email,
        password: password,
        confirm_password: password,
        date_of_birth: new Date().toISOString()
      })

      return { access_token, refresh_token, verify: UserVerifyStatus.Unverified }
    }
  }

  async refreshToken(user_id: string, verify: UserVerifyStatus) {
    const { access_token, refresh_token } = await this.signTokens({ user_id, verify })

    return { access_token, refresh_token }
  }
}

const authServices = new AuthServices()

export default authServices
